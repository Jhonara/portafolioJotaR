import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, RoundedBox } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Color, Group } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";

const cyan = new Color("#0fd6cf");
const hoodie = new Color("#10171b");
const skin = new Color("#bd7b55");

const Capsule = ({ position, scale, color = hoodie }: { position: [number, number, number]; scale: [number, number, number]; color?: Color }) => <mesh position={position} scale={scale} castShadow>
  <capsuleGeometry args={[0.5, 1, 8, 16]} /><meshStandardMaterial color={color} roughness={0.56} metalness={0.05} />
</mesh>;

const Glasses = () => <group position={[0, 2.92, 0.52]}>
  <mesh position={[-0.28, 0, 0]}><torusGeometry args={[0.18, 0.026, 8, 20]} /><meshStandardMaterial color="#121316" metalness={0.72} roughness={0.14} /></mesh>
  <mesh position={[0.28, 0, 0]}><torusGeometry args={[0.18, 0.026, 8, 20]} /><meshStandardMaterial color="#121316" metalness={0.72} roughness={0.14} /></mesh>
  <mesh position={[0, 0, 0]}><boxGeometry args={[0.22, 0.035, 0.035]} /><meshStandardMaterial color="#121316" metalness={0.72} roughness={0.14} /></mesh>
</group>;

const JotaAvatar = () => {
  const dancer = useRef<Group>(null);
  const leftArm = useRef<Group>(null);
  const rightArm = useRef<Group>(null);
  const head = useRef<Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (dancer.current) {
      dancer.current.position.y = Math.sin(time * 2.1) * 0.085;
      dancer.current.rotation.y = Math.sin(time * 0.52) * 0.2;
      dancer.current.rotation.z = Math.sin(time * 1.05) * 0.075;
    }
    if (leftArm.current) leftArm.current.rotation.z = -0.52 + Math.sin(time * 2.1) * 0.38;
    if (rightArm.current) rightArm.current.rotation.z = 0.52 - Math.sin(time * 2.1 + 0.7) * 0.34;
    if (head.current) head.current.rotation.y = Math.sin(time * 0.72) * 0.13;
  });

  return <group ref={dancer} position={[0, -0.83, -1.25]}>
    <group ref={leftArm} position={[-0.72, 1.85, 0]} rotation-z={-0.52}>
      <Capsule position={[0, -0.56, 0]} scale={[0.23, 0.72, 0.23]} />
      <mesh position={[0, -1.15, 0]} castShadow><sphereGeometry args={[0.22, 20, 16]} /><meshStandardMaterial color={skin} roughness={0.6} /></mesh>
    </group>
    <group ref={rightArm} position={[0.72, 1.85, 0]} rotation-z={0.52}>
      <Capsule position={[0, -0.56, 0]} scale={[0.23, 0.72, 0.23]} />
      <mesh position={[0, -1.15, 0]} castShadow><sphereGeometry args={[0.22, 20, 16]} /><meshStandardMaterial color={skin} roughness={0.6} /></mesh>
    </group>
    <RoundedBox args={[1.5, 1.75, 0.62]} radius={0.18} smoothness={4} position={[0, 1.5, 0]} castShadow><meshStandardMaterial color={hoodie} roughness={0.48} metalness={0.08} /></RoundedBox>
    <mesh position={[0, 1.78, 0.34]}><boxGeometry args={[0.035, 1.16, 0.04]} /><meshBasicMaterial color={cyan} toneMapped={false} /></mesh>
    <mesh position={[-0.37, 1.78, 0.34]}><boxGeometry args={[0.035, 1.16, 0.04]} /><meshBasicMaterial color={cyan} toneMapped={false} /></mesh>
    <mesh position={[0, 2.28, 0]} castShadow><sphereGeometry args={[0.72, 28, 20]} /><meshStandardMaterial color={skin} roughness={0.55} /></mesh>
    <group ref={head}>
      <mesh position={[0, 2.76, 0]} rotation-x={-0.2} scale={[0.78, 0.36, 0.8]} castShadow><sphereGeometry args={[0.8, 28, 18]} /><meshStandardMaterial color="#111417" roughness={0.42} /></mesh>
      <mesh position={[0, 2.88, -0.5]} rotation-x={-0.15} scale={[0.46, 0.09, 0.38]} castShadow><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="#111417" roughness={0.42} /></mesh>
      <Glasses />
    </group>
    <Capsule position={[-0.42, -0.12, 0]} scale={[0.32, 0.85, 0.32]} color={new Color("#171d20")} />
    <Capsule position={[0.42, -0.12, 0]} scale={[0.32, 0.85, 0.32]} color={new Color("#171d20")} />
    <RoundedBox args={[0.62, 0.22, 1.08]} radius={0.07} smoothness={3} position={[-0.42, -1.16, 0.12]} castShadow><meshStandardMaterial color="#e9e8e1" roughness={0.35} /></RoundedBox>
    <RoundedBox args={[0.62, 0.22, 1.08]} radius={0.07} smoothness={3} position={[0.42, -1.16, 0.12]} castShadow><meshStandardMaterial color="#e9e8e1" roughness={0.35} /></RoundedBox>
  </group>;
};

const MirrorCamera = () => { useParallaxCamera({ position: [0, 1.55, 9.2], target: [0, 0.55, -1.3], positionParallax: [0.12, 0.05], targetParallax: [0.045, 0.02], damping: 1.15 }); return null; };

const MirrorProtocol = ({ quality }: BackgroundSceneProps) => <>
  <color attach="background" args={[new Color("#010708")]} />
  <fog attach="fog" args={["#010708", 9, 23]} />
  <MirrorCamera />
  <ambientLight intensity={0.52} color="#56777c" />
  <spotLight position={[-3.5, 7.5, 4.5]} intensity={420} angle={0.5} penumbra={1} distance={18} color="#e8ffff" castShadow />
  <spotLight position={[4, 3.5, 1]} intensity={190} angle={0.55} penumbra={1} distance={16} color="#0dd0cd" />
  <JotaAvatar />
  <mesh position={[0, -2.02, -1.15]} rotation-x={-Math.PI / 2} receiveShadow>
    <planeGeometry args={[22, 18]} />
    <MeshReflectorMaterial blur={[420, 90]} resolution={quality === "high" ? 1024 : 512} mixBlur={1} mixStrength={3.2} roughness={0.36} metalness={0.9} mirror={0.95} color="#071114" />
  </mesh>
  {quality === "high" && <EffectComposer multisampling={0} resolutionScale={0.74}>
    <Bloom mipmapBlur luminanceThreshold={1.4} luminanceSmoothing={0.3} intensity={0.22} />
    <Vignette offset={0.2} darkness={0.48} />
  </EffectComposer>}
</>;

export default MirrorProtocol;
