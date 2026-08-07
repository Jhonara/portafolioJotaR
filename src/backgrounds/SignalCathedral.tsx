import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { AdditiveBlending, Color, DoubleSide, Group } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";

const cyan = new Color("#57f8ff");
const titanium = new Color("#07131f");

const Pillar = ({ position, height, width = 0.42, lean = 0 }: { position: [number, number, number]; height: number; width?: number; lean?: number }) => <group position={position} rotation-z={lean}>
  <mesh><boxGeometry args={[width, height, width * 1.25]} /><meshStandardMaterial color={titanium} metalness={0.92} roughness={0.22} /></mesh>
  <mesh position={[0, 0, width * 0.68]}><boxGeometry args={[width * 0.13, height * 0.82, 0.025]} /><meshBasicMaterial color={cyan} toneMapped={false} transparent opacity={0.72} /></mesh>
  <mesh position={[0, height * 0.48, 0]}><boxGeometry args={[width * 1.7, 0.12, width * 1.7]} /><meshStandardMaterial color="#193749" metalness={0.85} roughness={0.18} /></mesh>
</group>;

const EnergyVeil = ({ position, scale }: { position: [number, number, number]; scale: [number, number, number] }) => <mesh position={position} rotation={[Math.PI / 2, 0, 0]} scale={scale}>
  <coneGeometry args={[1, 1, 48, 1, true]} /><meshBasicMaterial color="#137d94" transparent opacity={0.065} side={DoubleSide} depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
</mesh>;

const OrbitAssembly = () => {
  const assembly = useRef<Group>(null);
  const rings = useMemo(() => [
    { radius: 2.32, tube: 0.038, arc: Math.PI * 1.58, rotation: [0.28, 0.12, 0.18] as [number, number, number] },
    { radius: 1.76, tube: 0.025, arc: Math.PI * 1.32, rotation: [-0.52, 0.34, -0.18] as [number, number, number] },
    { radius: 1.24, tube: 0.05, arc: Math.PI * 1.75, rotation: [0.96, -0.22, 0.42] as [number, number, number] },
  ], []);
  useFrame((state, delta) => { if (assembly.current) { assembly.current.rotation.y += delta * 0.055; assembly.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.16) * 0.045; } });
  return <group ref={assembly} position={[0.25, 0.72, -2.1]}>
    <mesh><icosahedronGeometry args={[0.38, 3]} /><meshStandardMaterial color="#78f7ff" emissive="#0ecde2" emissiveIntensity={2.7} metalness={0.25} roughness={0.12} toneMapped={false} /></mesh>
    {rings.map((ring, index) => <mesh key={ring.radius} rotation={ring.rotation}><torusGeometry args={[ring.radius, ring.tube, 16, 160, ring.arc]} /><meshStandardMaterial color={index === 1 ? "#c3feff" : cyan} emissive={cyan} emissiveIntensity={index === 1 ? 1.5 : 2.8} metalness={0.68} roughness={0.14} toneMapped={false} /></mesh>)}
    <pointLight color="#48f8ff" intensity={16} distance={7} decay={2} />
  </group>;
};

const CathedralCamera = () => { useParallaxCamera({ position: [0.15, 0.28, 11.7], target: [0.15, 0.65, -2.2], positionParallax: [0.2, 0.08], targetParallax: [0.09, 0.035], damping: 1.1 }); return null; };

const SignalCathedral = ({ quality }: BackgroundSceneProps) => <>
  <color attach="background" args={[new Color("#01060c")]} /><fog attach="fog" args={["#01060c", 8, 24]} /><CathedralCamera />
  <ambientLight intensity={0.18} color="#4bbbc7" /><directionalLight position={[-5, 8, 4]} intensity={2.1} color="#b8f8ff" /><pointLight position={[0, 2.2, 1]} intensity={7} distance={9} color="#0bbcd6" />
  <group position={[0, -0.55, -2.7]}>
    <Pillar position={[-4.7, 1.25, 0]} height={7.5} width={0.62} lean={-0.13} /><Pillar position={[4.7, 1.25, 0]} height={7.5} width={0.62} lean={0.13} />
    <Pillar position={[-3.22, 0.25, -1.6]} height={5.5} width={0.37} lean={-0.05} /><Pillar position={[3.22, 0.25, -1.6]} height={5.5} width={0.37} lean={0.05} />
    <Pillar position={[-1.95, 0.1, -2.6]} height={3.75} width={0.26} /><Pillar position={[1.95, 0.1, -2.6]} height={3.75} width={0.26} />
    <mesh position={[0, -2.45, -1.6]} rotation-x={-Math.PI / 2}><planeGeometry args={[19, 15]} /><meshStandardMaterial color="#03111b" metalness={0.88} roughness={0.32} /></mesh>
    <mesh position={[0, 3.95, -3.2]}><boxGeometry args={[9.4, 0.28, 0.45]} /><meshStandardMaterial color="#0c2937" metalness={0.92} roughness={0.2} /></mesh>
  </group>
  <OrbitAssembly /><EnergyVeil position={[-0.15, 0.15, -3.8]} scale={[4.1, 9.2, 1]} /><EnergyVeil position={[0.25, 0.35, -3.1]} scale={[2.35, 6.8, 1]} />
  {quality === "high" && <EffectComposer multisampling={0} resolutionScale={0.72}><Bloom mipmapBlur luminanceThreshold={1.1} luminanceSmoothing={0.28} intensity={0.78} /><Vignette offset={0.2} darkness={0.62} /></EffectComposer>}
</>;

export default SignalCathedral;
