import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, type TargetAndTransition, type Transition } from "framer-motion";
import type { NexoMood } from "./types";

type Props = { mood: NexoMood; lookAt: { x: number; y: number }; onClick: () => void; open: boolean };
type Expression = "normal" | "smile" | "focus" | "sleep";

const asset = "/images/NEXO";
const expressionAssets: Record<Expression, { leftEye: string; rightEye: string; mouth: string; leftCheek: string; rightCheek: string }> = {
  normal: { leftEye: "ojos/ojo izq normal.svg", rightEye: "ojos/ojo derc normal.svg", mouth: "bocas/boca de ojos normales.svg", leftCheek: "cachetes/cachete izq cara normal.svg", rightCheek: "cachetes/cachete derec cara normal.svg" },
  smile: { leftEye: "ojos/ojo izq sonriente.svg", rightEye: "ojos/ojo derc sonriente.svg", mouth: "bocas/boca de ojos sonrrientes.svg", leftCheek: "cachetes/cachete izq cara cara china.svg", rightCheek: "cachetes/cachete derech cara cara china.svg" },
  focus: { leftEye: "ojos/ojo izq normal.svg", rightEye: "ojos/ojo derc normal.svg", mouth: "bocas/boca de ojos normales.svg", leftCheek: "cachetes/cachete izq cara normal.svg", rightCheek: "cachetes/cachete derec cara normal.svg" },
  sleep: { leftEye: "ojos/ojo izq cara china.svg", rightEye: "ojos/ojo derc cara china.svg", mouth: "bocas/boca de ojos chinos.svg", leftCheek: "cachetes/cachete izq cara cara china.svg", rightCheek: "cachetes/cachete derech cara cara china.svg" },
};
const rocks = ["objetos/piedra_1.svg", "objetos/piedra_2.svg", "objetos/piedra_3.svg", "objetos/piedra_4.svg"];
const motionByMood: Record<NexoMood, object> = {
  idle: { y: [0, -3, 0], rotate: [0, .7, 0, -.7, 0], scaleY: [1, 1.014, 1] }, happy: { y: [0, -6, 0], rotate: [0, 1.5, -1.5, 0] }, thinking: { y: [0, -2, 0], rotate: [0, -3, -3, 0] }, typing: { y: [0, -2, 0] }, surprised: { y: [0, -7, 0], scale: [1, 1.045, 1] }, waving: { rotate: [0, -3, 3, -3, 0], y: [0, -3, 0] }, sleepy: { rotate: [0, 3, 4, 3], y: [0, 2, 0] }, celebrating: { y: [0, -9, 0, -6, 0], rotate: [0, -3, 3, 0] },
};

const Layer = ({ src, className = "", animate, transition, style }: { src: string; className?: string; animate?: TargetAndTransition; transition?: Transition; style?: CSSProperties }) => <motion.img src={`${asset}/${src}`} alt="" aria-hidden="true" draggable={false} animate={animate} transition={transition} style={style} className={`pointer-events-none absolute inset-0 h-full w-full select-none ${className}`} />;

const NexoCharacter = ({ mood, lookAt, onClick, open }: Props) => {
  const reduceMotion = useReducedMotion();
  const [blink, setBlink] = useState(false);
  const expression = useMemo<Expression>(() => mood === "sleepy" ? "sleep" : mood === "typing" || mood === "thinking" || mood === "surprised" ? "focus" : mood === "happy" || mood === "celebrating" || mood === "waving" ? "smile" : "normal", [mood]);
  const face = expressionAssets[expression];

  useEffect(() => {
    if (reduceMotion || mood === "sleepy") return;
    let timer: number;
    const schedule = () => { timer = window.setTimeout(() => { setBlink(true); window.setTimeout(() => { setBlink(false); schedule(); }, 140); }, 2800 + Math.random() * 3600); };
    schedule(); return () => window.clearTimeout(timer);
  }, [mood, reduceMotion]);

  return <button type="button" onClick={onClick} aria-label={open ? "Cerrar conversación con Nexo" : "Hablar con Nexo"} className="nexo-character pointer-events-auto relative aspect-[1586/992] w-52 cursor-pointer border-0 bg-transparent p-0 sm:w-64">
    <motion.div animate={reduceMotion ? {} : { ...motionByMood[mood], x: lookAt.x, skewX: lookAt.y / 10 }} transition={{ duration: mood === "celebrating" || mood === "waving" ? .9 : 3.8, repeat: Infinity, ease: "easeInOut" }} className="relative h-full w-full origin-bottom">
      <Layer src="cuerpo/cuerpo.svg" className="z-10 drop-shadow-[0_16px_22px_rgba(0,0,0,.38)]" />
      <Layer src="hoja/hoja.svg" className="z-20" animate={reduceMotion ? {} : { rotate: [0, -3, 2, 0], y: [0, -2, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
      {rocks.map((rock, index) => <Layer key={rock} src={rock} className="z-30" animate={reduceMotion ? {} : { rotate: index % 2 ? [0, -4, 0] : [0, 4, 0], y: [0, index % 2 ? 3 : -3, 0] }} transition={{ duration: 4.5 + index, repeat: Infinity, ease: "easeInOut", delay: index * .38 }} />)}
      <Layer src={face.leftCheek} className="z-40" /><Layer src={face.rightCheek} className="z-40" />
      <Layer src={face.leftEye} className="z-50" style={{ transformOrigin: "35% 70%" }} animate={reduceMotion ? {} : { x: lookAt.x * .6, y: blink ? 2 : lookAt.y * .35, scaleY: blink ? .08 : 1 }} transition={{ duration: blink ? .07 : .3, ease: "easeOut" }} />
      <Layer src={face.rightEye} className="z-50" style={{ transformOrigin: "50% 70%" }} animate={reduceMotion ? {} : { x: lookAt.x * .6, y: blink ? 2 : lookAt.y * .35, scaleY: blink ? .08 : 1 }} transition={{ duration: blink ? .07 : .3, ease: "easeOut" }} />
      <Layer src={face.mouth} className="z-50" style={{ transformOrigin: "42% 78%" }} animate={reduceMotion ? {} : mood === "typing" ? { scaleX: [1, 1.05, .96, 1] } : { scaleX: 1 }} transition={{ duration: .45, repeat: mood === "typing" ? Infinity : 0, ease: "easeInOut" }} />
      {!reduceMotion && <><motion.span animate={{ opacity: [0, .75, 0], scale: [.6, 1.1, .6] }} transition={{ duration: 3.8, repeat: Infinity, delay: .8 }} className="absolute left-[27%] top-[34%] z-60 h-1.5 w-1.5 rounded-full bg-cyan-200 shadow-[0_0_10px_#67e8f9]" /><motion.span animate={{ opacity: [0, .6, 0], scale: [.5, 1, .5] }} transition={{ duration: 4.6, repeat: Infinity, delay: 2.1 }} className="absolute right-[25%] top-[48%] z-60 h-1 w-1 rounded-full bg-violet-200 shadow-[0_0_9px_#c4b5fd]" /></>}
    </motion.div>
    {mood === "sleepy" && <span className="pointer-events-none absolute right-[14%] top-[8%] z-70 font-mono text-lg text-cyan-200">z</span>}
  </button>;
};

export default NexoCharacter;
