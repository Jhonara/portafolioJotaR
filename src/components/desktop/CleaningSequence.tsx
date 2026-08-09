import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { Group, Mesh } from "three";
import { useLanguage } from "../../i18n/LanguageContext";

export type CleaningPhase = "arriving" | "cleaning" | "leaving" | "complete";
type Props = { phase: CleaningPhase; message: string };
const robotUrl = "/images/avatar/Cleaner_robot.glb";

const CleaningRobot = ({ phase }: Pick<Props, "phase">) => {
  const robot = useRef<Group>(null);
  const { scene } = useGLTF(robotUrl);
  const model = useMemo(() => scene.clone(true), [scene]);
  const phaseStart = useRef(0);
  const previousPhase = useRef(phase);
  useEffect(() => { model.traverse((node) => { if (node instanceof Mesh) { node.castShadow = true; node.receiveShadow = true; } }); }, [model]);
  useFrame((state) => {
    if (!robot.current) return;
    if (previousPhase.current !== phase) { previousPhase.current = phase; phaseStart.current = state.clock.elapsedTime; }
    const elapsed = state.clock.elapsedTime - phaseStart.current;
    const ease = (value: number) => 1 - (1 - Math.min(value, 1)) ** 3;
    if (phase === "arriving") { robot.current.position.x = -9 + ease(elapsed / 2.25) * 8.45; robot.current.rotation.y = -0.5; }
    else if (phase === "cleaning") { robot.current.position.x = Math.sin(elapsed * 2.15) * 2.45 - 0.55; robot.current.rotation.y = -0.5 + Math.sin(elapsed * 2.15) * 0.25; }
    else { robot.current.position.x = -0.55 + ease(elapsed / 2.1) * 9.4; robot.current.rotation.y = -0.5 + ease(elapsed / 2.1) * 0.45; }
    robot.current.position.y = -3.15 + Math.abs(Math.sin(elapsed * 5.2)) * 0.07;
    robot.current.rotation.z = Math.sin(elapsed * 5.2) * 0.035;
  });
  return <group ref={robot} scale={0.72}><Center><primitive object={model} /></Center></group>;
};

const CleaningSequence = ({ phase, message }: Props) => { const { t } = useLanguage(); return <>
  <motion.div className="pointer-events-none absolute inset-0 z-40 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,9,12,.34)_100%)]" initial={{ opacity: 0 }} animate={{ opacity: phase === "complete" ? 0 : 1 }} transition={{ duration: 0.55 }} />
  <motion.div className="pointer-events-none absolute inset-0 z-40 bg-[repeating-radial-gradient(ellipse_at_50%_50%,transparent_0px,transparent_7px,rgba(128,186,180,.07)_8px,transparent_10px)]" initial={{ opacity: 0.42 }} animate={{ opacity: phase === "cleaning" ? 0.08 : phase === "complete" ? 0 : 0.34 }} transition={{ duration: 1.2 }} />
  <Canvas className="pointer-events-none absolute inset-0 z-50" dpr={[1, 1.5]} camera={{ fov: 45, position: [0, 0, 12] }} gl={{ alpha: true, antialias: true }}>
    <ambientLight intensity={1.9} /><directionalLight position={[3, 7, 5]} intensity={3.2} color="#dcffff" /><pointLight position={[-3, 1, 4]} intensity={15} distance={10} color="#13d8d1" /><CleaningRobot phase={phase} />
  </Canvas>
  <motion.div key={`${phase}-${message}`} className="pointer-events-none absolute left-1/2 top-20 z-60 w-[min(88vw,430px)] -translate-x-1/2 rounded-2xl border border-cyan-300/35 bg-slate-950/85 px-5 py-3 text-center shadow-[0_0_36px_rgba(34,211,238,.2)] backdrop-blur-xl" initial={{ opacity: 0, y: -14, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
    <p className="font-mono text-[10px] tracking-[.22em] text-cyan-300">{t("cleanerBot")} // {phase === "complete" ? t("taskCompleted") : t("inOperation")}</p><p className="mt-1 text-sm font-medium text-white/90">{message}</p>
  </motion.div>
</>; };

useGLTF.preload(robotUrl);
export default CleaningSequence;
