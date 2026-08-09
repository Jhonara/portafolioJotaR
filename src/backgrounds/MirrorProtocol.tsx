import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import {
  Box3,
  Group,
  Mesh,
  MeshStandardMaterial,
  ShaderMaterial,
  Vector3,
} from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";

const avatarUrl = "/images/avatar/Jhonatan_Avatar3D.glb";

// Altura "objetivo" en unidades de escena para el avatar de pies a cabeza.
const TARGET_HEIGHT = 3.1;

// Única fuente de verdad para "dónde está el piso". Piso, anillos y avatar
// se posicionan TODOS relativos a este número.
const FLOOR_Y = -1.58;

const AvatarPerformance = () => {
  const performer = useRef<Group>(null);
  const { scene } = useGLTF(avatarUrl);
  const avatar = useMemo(() => scene.clone(true), [scene]);

  const scale = useMemo(() => {
    avatar.traverse((node) => {
      if (!(node instanceof Mesh)) return;

      node.castShadow = true;
      node.receiveShadow = true;

      const materials = Array.isArray(node.material)
        ? node.material
        : [node.material];

      materials.forEach((material) => {
        if (material instanceof MeshStandardMaterial) {
          material.envMapIntensity = 1.05;
          material.roughness = Math.min(1, material.roughness * 1.1);

          const isBlack =
            material.emissive &&
            material.emissive.r === 0 &&
            material.emissive.g === 0 &&
            material.emissive.b === 0;

          if (material.emissive && !isBlack) {
            material.emissiveIntensity = Math.min(
              0.9,
              Math.max(material.emissiveIntensity, 0.7)
            );
          }

          material.needsUpdate = true;
        }
      });
    });

    const box = new Box3().setFromObject(avatar);
    const size = new Vector3();
    box.getSize(size);
    const center = new Vector3();
    box.getCenter(center);

    const rawHeight = size.y || 1;
    const computedScale = TARGET_HEIGHT / rawHeight;

    avatar.position.x -= center.x;
    avatar.position.z -= center.z;
    avatar.position.y -= box.min.y;

    return computedScale;
  }, [avatar]);

  useFrame((state) => {
    if (!performer.current) return;

    const time = state.clock.elapsedTime;
    const breathe = Math.sin(time * 1.15);
    const sway = Math.sin(time * 0.35) + Math.sin(time * 0.9) * 0.35;

    performer.current.position.y = FLOOR_Y + Math.abs(breathe) * 0.05;
    performer.current.position.x = sway * 0.07;
    performer.current.rotation.y = 0.08 + sway * 0.1;
    performer.current.rotation.z = breathe * 0.015;
  });

  return (
    <group ref={performer} scale={scale}>
      <primitive object={avatar} />
    </group>
  );
};

const MirrorCamera = () => {
  useParallaxCamera({
    position: [0, 1.35, 6.6],
    target: [0, 0.55, 0],
    positionParallax: [0.08, 0.04],
    targetParallax: [0.03, 0.015],
    damping: 1.2,
  });

  return null;
};

// Anillos holográficos bajo los pies del avatar.
const ScanRings = () => {
  const inner = useRef<Group>(null);
  const outer = useRef<Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (inner.current) inner.current.rotation.z = t * 0.25;
    if (outer.current) outer.current.rotation.z = -t * 0.12;
  });

  return (
    <>
      <group ref={inner} position={[0, FLOOR_Y + 0.01, 0]} rotation-x={-Math.PI / 2}>
        <mesh>
          <ringGeometry args={[0.95, 1.03, 64]} />
          <meshBasicMaterial color="#13d8d3" transparent opacity={0.35} />
        </mesh>
        <mesh>
          <ringGeometry args={[1.14, 1.17, 64]} />
          <meshBasicMaterial color="#6efcff" transparent opacity={0.18} />
        </mesh>
      </group>

      <group ref={outer} position={[0, FLOOR_Y + 0.008, 0]} rotation-x={-Math.PI / 2}>
        <mesh>
          <ringGeometry args={[2.6, 2.66, 80]} />
          <meshBasicMaterial color="#13d8d3" transparent opacity={0.1} />
        </mesh>
      </group>
    </>
  );
};

// ---------------------------------------------------------------------------
// STARFIELD — campo de partículas con shader propio (Three.js puro).
// Cada estrella titila con su propia fase (aRandom), no todas al tiempo.
// ---------------------------------------------------------------------------
const STAR_COUNT = 500;

const starVertexShader = /* glsl */ `
  attribute float aRandom;
  uniform float uTime;
  varying float vTwinkle;

  void main() {
    vTwinkle = 0.35 + 0.65 * sin(uTime * (0.4 + aRandom) + aRandom * 30.0);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = (1.1 + aRandom * 1.6) * (260.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const starFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vTwinkle;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, d) * vTwinkle;
    gl_FragColor = vec4(uColor, alpha * 0.6);
  }
`;

const StarField = () => {
  const material = useRef<ShaderMaterial>(null);

  const { positions, randoms } = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3);
    const rnd = new Float32Array(STAR_COUNT);

    for (let i = 0; i < STAR_COUNT; i += 1) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = Math.random() * 16 - 1;
      pos[i * 3 + 2] = -Math.random() * 26 - 2;
      rnd[i] = Math.random();
    }

    return { positions: pos, randoms: rnd };
  }, []);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={2 /* AdditiveBlending */}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: [0.42, 0.9, 0.92] },
        }}
        vertexShader={starVertexShader}
        fragmentShader={starFragmentShader}
      />
    </points>
  );
};

// ---------------------------------------------------------------------------
// ENERGY WALL — rejilla dibujada por shader (solo líneas, no un panel sólido)
// con un barrido de escaneo que sube y se desvanece hacia los bordes.
// ---------------------------------------------------------------------------
const wallVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const wallFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    float scale = 18.0;
    vec2 g = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
    float lineMask = 1.0 - min(min(g.x, g.y), 1.0);

    float distFromBase = distance(uv, vec2(0.5, 0.05));
    float edgeFade = smoothstep(0.78, 0.1, distFromBase);
    float vFade = smoothstep(0.0, 0.12, uv.y) * smoothstep(1.0, 0.6, uv.y);

    float sweepPos = fract(uTime * 0.06);
    float sweep = smoothstep(0.03, 0.0, abs(uv.y - sweepPos) - 0.02);

    float alpha = lineMask * edgeFade * vFade * 0.22 + sweep * edgeFade * 0.35;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const EnergyWall = () => {
  const material = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={[0, FLOOR_Y + 5.2, -3.4]}>
      <planeGeometry args={[13, 10.4, 1, 1]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        blending={2 /* AdditiveBlending */}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: [0.07, 0.85, 0.83] },
        }}
        vertexShader={wallVertexShader}
        fragmentShader={wallFragmentShader}
      />
    </mesh>
  );
};

const MirrorProtocol = ({ quality }: BackgroundSceneProps) => (
  <>
    <color attach="background" args={["#03070b"]} />
    <fog attach="fog" args={["#03070b", 10, 26]} />

    <MirrorCamera />

    <hemisphereLight args={["#1c3d40", "#02040a", 0.5]} />
    <ambientLight intensity={0.5} color="#ffffff" />

    <spotLight
      position={[2.5, 6, 6]}
      intensity={620}
      angle={0.42}
      penumbra={1}
      distance={25}
      decay={2}
      color="#ffffff"
      castShadow
      shadow-mapSize={[2048, 2048]}
    />

    <pointLight position={[0, 1.6, 4.5]} intensity={32} distance={10} color="#e8fbff" />
    <pointLight position={[3.8, 1.8, 2]} intensity={40} distance={10} color="#13d8d3" />
    <pointLight position={[-3.5, 2.4, 1]} intensity={18} distance={8} color="#13d8d3" />

    <spotLight
      position={[0, 3, -5]}
      intensity={85}
      angle={0.8}
      penumbra={1}
      color="#6efcff"
    />

    {quality === "high" && <EnergyWall />}
    <StarField />

    <AvatarPerformance />
    <ScanRings />

    <mesh position={[0, FLOOR_Y, 0]} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterial
        blur={[300, 80]}
        resolution={quality === "high" ? 1024 : 512}
        mixBlur={0.85}
        mixStrength={1.35}
        roughness={0.15}
        metalness={0.7}
        mirror={0.55}
        color="#071216"
      />
    </mesh>

    <ContactShadows
      position={[0, FLOOR_Y + 0.02, 0]}
      opacity={0.6}
      scale={8}
      blur={2.2}
      far={3}
      color="#000000"
    />

    {quality === "high" && (
      <EffectComposer multisampling={0}>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.88}
          luminanceSmoothing={0.35}
          intensity={0.32}
        />
        <Vignette offset={0.16} darkness={0.78} />
      </EffectComposer>
    )}
  </>
);

useGLTF.preload(avatarUrl);

export default MirrorProtocol;
