import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Line, LineBasicMaterial, Vector3, type Group } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";

type Cluster = { center: [number, number, number]; count: number; spread: [number, number, number] };
const clusters: Cluster[] = [
  { center: [-3.55, 0.92, -1.2], count: 20, spread: [0.75, 1.18, 0.55] },
  { center: [-0.72, 1.05, 0.15], count: 15, spread: [0.95, 0.58, 0.72] },
  { center: [2.98, -0.72, -1.05], count: 24, spread: [0.92, 1.08, 0.62] },
  { center: [-1.25, -1.62, 0.75], count: 13, spread: [0.72, 0.5, 0.8] },
];
const route = [[-3.55, 0.92, -1.2], [-2.22, 0.35, -0.45], [-0.72, 1.05, 0.15], [1.08, 0.28, -0.18], [2.98, -0.72, -1.05]] as const;

const random = (seed: number) => {
  const value = Math.sin(seed * 91.173) * 43758.5453;
  return value - Math.floor(value);
};

const createMap = () => {
  const points: number[] = [];
  const colors: number[] = [];
  const nodes: Vector3[] = [];
  clusters.forEach((cluster, clusterIndex) => {
    for (let index = 0; index < cluster.count; index += 1) {
      const seed = clusterIndex * 100 + index * 7;
      const node = new Vector3(
        cluster.center[0] + (random(seed) - .5) * cluster.spread[0],
        cluster.center[1] + (random(seed + 1) - .5) * cluster.spread[1],
        cluster.center[2] + (random(seed + 2) - .5) * cluster.spread[2],
      );
      nodes.push(node);
      points.push(node.x, node.y, node.z);
      const accent = index % 11 === 0;
      colors.push(accent ? .82 : .12, accent ? .2 : .9, accent ? .65 : 1);
    }
  });

  const links: number[] = [];
  let offset = 0;
  clusters.forEach((cluster) => {
    for (let index = 0; index < cluster.count; index += 1) {
      const from = nodes[offset + index];
      let closest = -1;
      let closestDistance = Infinity;
      for (let candidate = 0; candidate < cluster.count; candidate += 1) {
        if (candidate === index) continue;
        const distance = from.distanceToSquared(nodes[offset + candidate]);
        if (distance < closestDistance) { closestDistance = distance; closest = candidate; }
      }
      if (closest >= 0) links.push(from.x, from.y, from.z, nodes[offset + closest].x, nodes[offset + closest].y, nodes[offset + closest].z);
    }
    offset += cluster.count;
  });
  route.slice(0, -1).forEach((point, index) => links.push(...point, ...route[index + 1]));

  const pointGeometry = new BufferGeometry();
  pointGeometry.setAttribute("position", new BufferAttribute(new Float32Array(points), 3));
  pointGeometry.setAttribute("color", new BufferAttribute(new Float32Array(colors), 3));
  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute("position", new BufferAttribute(new Float32Array(links), 3));
  const routeGeometry = new BufferGeometry().setFromPoints(route.map((point) => new Vector3(...point)));
  const routeLine = new Line(routeGeometry, new LineBasicMaterial({ color: "#d25aa0", transparent: true, opacity: .55, blending: AdditiveBlending, depthWrite: false }));
  return { pointGeometry, lineGeometry, routeLine };
};

const MapRig = ({ quality }: BackgroundSceneProps) => {
  const group = useRef<Group>(null);
  const map = useMemo(() => createMap(), []);
  useParallaxCamera({ position: [0, 0, 9], target: [0, 0, 0], positionParallax: [.22, .1], targetParallax: [.08, .04], damping: 1.05 });
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * .08) * .08;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * .06) * .025;
  });

  return <group ref={group}>
    <lineSegments geometry={map.lineGeometry}><lineBasicMaterial color="#39dff2" transparent opacity={quality === "high" ? .33 : .2} blending={AdditiveBlending} depthWrite={false} /></lineSegments>
    <points geometry={map.pointGeometry}><pointsMaterial size={quality === "high" ? .07 : .05} vertexColors transparent opacity={.95} sizeAttenuation blending={AdditiveBlending} depthWrite={false} /></points>
    <primitive object={map.routeLine} />
  </group>;
};

const ConstellationField = ({ quality }: BackgroundSceneProps) => <>
  <color attach="background" args={[new Color("#010514")]} />
  <MapRig quality={quality} />
  <HolographicPostprocessing quality={quality} bloom={.24} vignette={.48} />
</>;

export default ConstellationField;
