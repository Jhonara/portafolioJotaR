import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { DepthOfField, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Color, InstancedMesh, Object3D, Shape } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";

type Folio = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  phase: number;
  color: Color;
};

const pearl = new Color("#d6dee0");
const graphite = new Color("#081015");
const proxy = new Object3D();
const folioShape = new Shape()
  .moveTo(-0.5, -0.5)
  .lineTo(0.5, -0.5)
  .lineTo(0.44, 0.16)
  .lineTo(0.18, 0.5)
  .lineTo(-0.38, 0.43)
  .lineTo(-0.5, -0.12)
  .closePath();

const createFolios = (count: number): Folio[] => Array.from({ length: count }, (_, index) => {
  const progress = index / Math.max(count - 1, 1);
  const sweep = progress * Math.PI * 1.62 - 0.78;
  const lane = (index % 3) - 1;
  const x = Math.sin(sweep) * 4.15 + lane * 0.42;
  const y = -1.72 + progress * 5.5 + Math.cos(sweep * 2.3) * 0.58;
  const z = -2.8 + Math.cos(sweep) * 1.5 - Math.abs(lane) * 0.8;
  const width = 0.42 + ((index * 17) % 7) * 0.055;
  const height = 1.4 + ((index * 11) % 9) * 0.15;
  return {
    position: [x, y, z],
    rotation: [0.18 * Math.sin(sweep * 2), -0.62 + Math.sin(sweep) * 0.7, -0.2 + lane * 0.18],
    scale: [width, height, 0.1 + (index % 4) * 0.022],
    phase: index * 0.43,
    color: new Color().lerpColors(new Color("#7b8d93"), pearl, 0.38 + (index % 5) * 0.12),
  };
});

const KineticFolios = ({ quality }: BackgroundSceneProps) => {
  const mesh = useRef<InstancedMesh>(null);
  const folios = useMemo(() => createFolios(quality === "high" ? 45 : 27), [quality]);

  useLayoutEffect(() => {
    if (!mesh.current) return;
    folios.forEach((folio, index) => {
      proxy.position.fromArray(folio.position);
      proxy.rotation.set(...folio.rotation);
      proxy.scale.fromArray(folio.scale);
      proxy.updateMatrix();
      mesh.current!.setMatrixAt(index, proxy.matrix);
      mesh.current!.setColorAt(index, folio.color);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
  }, [folios]);

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.elapsedTime;
    folios.forEach((folio, index) => {
      const breathing = Math.sin(time * 0.34 + folio.phase) * 0.08;
      proxy.position.set(folio.position[0] + Math.sin(time * 0.23 + folio.phase) * 0.035, folio.position[1] + breathing, folio.position[2]);
      proxy.rotation.set(folio.rotation[0] + breathing * 0.14, folio.rotation[1] + Math.sin(time * 0.18 + folio.phase) * 0.035, folio.rotation[2]);
      proxy.scale.fromArray(folio.scale);
      proxy.updateMatrix();
      mesh.current!.setMatrixAt(index, proxy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={mesh} args={[undefined, undefined, folios.length]} castShadow receiveShadow>
    <extrudeGeometry args={[folioShape, { depth: 0.16, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.018, bevelThickness: 0.018 }]} />
    <meshPhysicalMaterial color={pearl} metalness={0.08} roughness={0.2} clearcoat={0.72} clearcoatRoughness={0.16} />
  </instancedMesh>;
};

const VaultCamera = () => {
  useParallaxCamera({ position: [0.1, 1.1, 12.6], target: [0, 0.95, -2.2], positionParallax: [0.13, 0.05], targetParallax: [0.06, 0.025], damping: 0.8 });
  return null;
};

const PalimpsestVault = ({ quality }: BackgroundSceneProps) => <>
  <color attach="background" args={[new Color("#020506")]} />
  <fog attach="fog" args={["#020506", 11, 28]} />
  <VaultCamera />
  <ambientLight intensity={0.32} color="#8fa3aa" />
  <spotLight position={[-5.5, 8, 5]} angle={0.54} penumbra={1} intensity={720} distance={22} decay={2} color="#e9f9ff" castShadow />
  <spotLight position={[5.5, 4, -2]} angle={0.48} penumbra={1} intensity={420} distance={18} decay={2} color="#d0e6ff" />
  <pointLight position={[0, 1.6, 1]} intensity={11} distance={8} color="#f2e4ff" />
  <KineticFolios quality={quality} />
  <mesh position={[0, -2.35, -1.9]} rotation-x={-Math.PI / 2} receiveShadow>
    <planeGeometry args={[24, 20]} />
    <MeshReflectorMaterial blur={[300, 70]} resolution={512} mixBlur={1} mixStrength={1.6} roughness={0.72} metalness={0.82} color={graphite} mirror={0.22} />
  </mesh>
  {quality === "high" && <EffectComposer multisampling={0} resolutionScale={0.72}>
    <DepthOfField focusDistance={0.028} focalLength={0.022} bokehScale={1.45} height={480} />
    <Vignette offset={0.16} darkness={0.52} />
  </EffectComposer>}
</>;

export default PalimpsestVault;
