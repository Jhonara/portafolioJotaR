import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import type { NexoMood } from "./types";

type Props = { mood: NexoMood; lookAt: { x: number; y: number }; onClick: () => void; open: boolean; speaking: boolean };
type Expression = "initial" | "sonriente" | "ilusion" | "chinito" | "ojitos" | "enamorado" | "sospecha" | "triste";

const asset = "/images/NEXO";
const expressionAssets: Record<Expression, { leftEye: string; rightEye: string; mouth: string; tears?: boolean }> = {
  initial: { leftEye: "ojos/Ojo_Izquierdo_Inicial.svg", rightEye: "ojos/Ojo_Derecho_Inicial.svg", mouth: "bocas/Boca_Inicial.svg" },
  sonriente: { leftEye: "ojos/Ojo_Izquierdo_Sonriente.svg", rightEye: "ojos/Ojo_Derecho_Sonriente.svg", mouth: "bocas/Boca_Sonriente.svg" },
  ilusion: { leftEye: "ojos/Ojo_Izquierdo_Ilusion.svg", rightEye: "ojos/Ojo_Derecho_Ilusion.svg", mouth: "bocas/Boca_Ilusion.svg" },
  chinito: { leftEye: "ojos/Ojo_Izquierda_Chinito.svg", rightEye: "ojos/Ojo_Derecho_Chinito.svg", mouth: "bocas/Boca_Chinito.svg" },
  ojitos: { leftEye: "ojos/Ojo_Izquierdo_Ojitos.svg", rightEye: "ojos/Ojo_Derecha_Ojitos.svg", mouth: "bocas/Boca_Ojitos.svg" },
  enamorado: { leftEye: "ojos/Ojo_Izquierdo_Enamorado.svg", rightEye: "ojos/Ojo_Derecho_Enamorado.svg", mouth: "bocas/Boca_Enamorado.svg" },
  sospecha: { leftEye: "ojos/Ojo_Izquierda_Sospecha.svg", rightEye: "ojos/Ojo_Derecho_Sospecha.svg", mouth: "bocas/Boca_Sospecho.svg" },
  triste: { leftEye: "ojos/Ojo_Izquierdo_Triste.svg", rightEye: "ojos/Ojo_Derecho_Triste.svg", mouth: "bocas/Boca_Triste.svg", tears: true },
};
const cheeks = ["cachetes/Mejilla_Izquierda.svg", "cachetes/Mejilla_Derecha.svg"];
const rocks = ["objetos/piedra_1.svg", "objetos/piedra_2.svg", "objetos/piedra_3.svg", "objetos/piedra_4.svg"];
const motionByMood: Record<NexoMood, TargetAndTransition> = {
  idle: { y: [0, -3, 0], rotate: [0, .7, 0, -.7, 0], scaleY: [1, 1.014, 1] },
  happy: { y: [0, -6, 0], rotate: [0, 1.5, -1.5, 0] },
  thinking: { y: [0, -2, 0], rotate: [0, -3, -3, 0] },
  typing: { y: [0, -2, 0] },
  surprised: { y: [0, -7, 0], scale: [1, 1.045, 1] },
  waving: { rotate: [0, -3, 3, -3, 0], y: [0, -3, 0] },
  sleepy: { rotate: [0, 3, 4, 3], y: [0, 2, 0] },
  celebrating: { y: [0, -9, 0, -6, 0], rotate: [0, -3, 3, 0] },
  sad: { y: [0, 2, 0], rotate: [0, -1, 0] },
};

const expressionByMood: Record<NexoMood, Expression> = {
  idle: "initial", happy: "sonriente", thinking: "sospecha", typing: "ilusion", surprised: "ojitos", waving: "chinito", sleepy: "chinito", celebrating: "enamorado", sad: "triste",
};

const Layer = ({ src, className = "", animate, transition, style }: { src: string; className?: string; animate?: TargetAndTransition; transition?: Transition; style?: CSSProperties }) => <motion.img src={`${asset}/${src}`} alt="" aria-hidden="true" draggable={false} animate={animate} transition={transition} style={style} className={`pointer-events-none absolute inset-0 h-full w-full select-none ${className}`} />;

const NexoCharacter = ({ mood, lookAt, onClick, open, speaking }: Props) => {
  const reduceMotion = useReducedMotion();
  const [blink, setBlink] = useState(false);
  const face = useMemo(() => expressionAssets[expressionByMood[mood]], [mood]);

  useEffect(() => {
    if (reduceMotion || mood === "sleepy") return;
    let timer: number;
    const schedule = () => { timer = window.setTimeout(() => { setBlink(true); window.setTimeout(() => { setBlink(false); schedule(); }, 115); }, 2400 + Math.random() * 3400); };
    schedule();
    return () => window.clearTimeout(timer);
  }, [mood, reduceMotion]);

  return <button type="button" onClick={onClick} aria-label={open ? "Cerrar conversación con Nexo" : "Hablar con Nexo"} className="nexo-character pointer-events-auto relative aspect-[1586/992] w-52 cursor-pointer border-0 bg-transparent p-0 sm:w-64">
    <motion.div animate={reduceMotion ? {} : { ...motionByMood[mood], x: lookAt.x, skewX: lookAt.y / 10 }} transition={{ duration: mood === "celebrating" || mood === "waving" ? .9 : 3.8, repeat: Infinity, ease: "easeInOut" }} className="relative h-full w-full origin-bottom">
      <Layer src="cuerpo/cuerpo.svg" className="z-10 drop-shadow-[0_16px_22px_rgba(0,0,0,.38)]" />
      <Layer src="hoja/hoja.svg" className="z-20" animate={reduceMotion ? {} : { rotate: [0, -3, 2, 0], y: [0, -2, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
      {rocks.map((rock, index) => <Layer key={rock} src={rock} className="z-30" animate={reduceMotion ? {} : { rotate: index % 2 ? [0, -5, 1, 0] : [0, 4, -1, 0], y: [0, index % 2 ? 3 : -3, 0], x: [0, index % 2 ? -1 : 1, 0] }} transition={{ duration: 4.5 + index, repeat: Infinity, ease: "easeInOut", delay: index * .38 }} />)}
      {cheeks.map((cheek) => <Layer key={cheek} src={cheek} className="z-40" />)}
      {face.tears && <Layer src="cachetes/Lagrimas_Triste.svg" className="z-45" animate={reduceMotion ? {} : { opacity: [.7, 1, .7] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />}
      <Layer src={face.leftEye} className="z-50" style={{ transformOrigin: "35% 70%" }} animate={reduceMotion ? {} : { x: lookAt.x * .6, y: blink ? 2 : lookAt.y * .35, scaleY: blink ? .08 : 1 }} transition={{ duration: blink ? .06 : .3, ease: "easeOut" }} />
      <Layer src={face.rightEye} className="z-50" style={{ transformOrigin: "50% 70%" }} animate={reduceMotion ? {} : { x: lookAt.x * .6, y: blink ? 2 : lookAt.y * .35, scaleY: blink ? .08 : 1 }} transition={{ duration: blink ? .06 : .3, ease: "easeOut" }} />
      <Layer src={face.mouth} className="z-50" style={{ transformOrigin: "42% 78%" }} animate={reduceMotion ? {} : speaking ? { scaleX: [1, 1.055, .96, 1], scaleY: [1, .92, 1.045, 1] } : { scaleX: 1, scaleY: 1 }} transition={{ duration: .42, repeat: speaking ? Infinity : 0, ease: "easeInOut" }} />
      {!reduceMotion && <><motion.span animate={{ opacity: [0, .75, 0], scale: [.6, 1.1, .6] }} transition={{ duration: 3.8, repeat: Infinity, delay: .8 }} className="absolute left-[27%] top-[34%] z-60 h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_#67e8f9]" /><motion.span animate={{ opacity: [0, .6, 0], scale: [.5, 1, .5] }} transition={{ duration: 4.6, repeat: Infinity, delay: 2.1 }} className="absolute right-[25%] top-[48%] z-60 h-1 w-1 rounded-full bg-violet-200 shadow-[0_0_9px_#c4b5fd]" /></>}
    </motion.div>
    {mood === "sleepy" && <span className="pointer-events-none absolute right-[14%] top-[8%] z-70 font-mono text-lg text-cyan-200">z</span>}
  </button>;
};

export default NexoCharacter;
