import { motion, useReducedMotion } from "framer-motion";
import type { NexoMood } from "./types";

type Props = { mood: NexoMood; lookAt: { x: number; y: number }; onClick: () => void; open: boolean };

const characterMotion: Record<NexoMood, object> = {
  idle: { y: [0, -3, 0], rotate: [0, 1, 0, -1, 0], scaleY: [1, 1.018, 1] },
  happy: { y: [0, -7, 0], rotate: [0, 2, -2, 0] },
  thinking: { y: [0, -2, 0], rotate: [0, -4, -4, 0] },
  typing: { y: [0, -2, 0], rotate: [0, 1, 0] },
  surprised: { y: [0, -9, 0], scale: [1, 1.06, 1] },
  waving: { rotate: [0, -5, 5, -5, 0], y: [0, -3, 0] },
  sleepy: { rotate: [0, 4, 5, 4], y: [0, 2, 0] },
  celebrating: { y: [0, -10, 0, -7, 0], rotate: [0, -5, 5, 0] },
};

// The layered export currently includes opaque raster canvases. Keep the stable,
// transparent master artwork active until those source layers are re-exported.
const NexoCharacter = ({ mood, lookAt, onClick, open }: Props) => {
  const reduceMotion = useReducedMotion();
  return <button type="button" onClick={onClick} aria-label={open ? "Cerrar conversación con Nexo" : "Hablar con Nexo"} className="nexo-character pointer-events-auto relative h-40 w-40 cursor-pointer border-0 bg-transparent p-0 sm:h-48 sm:w-48">
    <motion.img src="/images/Nexo_Piedra.svg" alt="" aria-hidden="true" animate={reduceMotion ? {} : { rotate: 360 }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute -inset-5 h-[calc(100%+2.5rem)] w-[calc(100%+2.5rem)] object-contain opacity-90" />
    <motion.img src="/images/Nexo_Principal_1.svg" alt="Nexo, asistente de JotaR.OS" animate={reduceMotion ? {} : { ...characterMotion[mood], x: lookAt.x, skewX: lookAt.y / 9 }} transition={{ duration: mood === "waving" || mood === "celebrating" ? .85 : 3.6, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 h-full w-full origin-bottom object-contain drop-shadow-[0_14px_20px_rgba(0,0,0,.42)]" />
    {mood === "sleepy" && <span className="pointer-events-none absolute right-1 top-2 z-20 font-mono text-lg text-cyan-200">z</span>}
  </button>;
};

export default NexoCharacter;
