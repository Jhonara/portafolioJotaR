import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BadgeCheck, Coffee, IdCard, PartyPopper, Rocket, TrendingUp } from "lucide-react";
import { useDesktopStore } from "../store/desktop.store";

type TerminalEffect = "matrix" | "night" | "neon" | "java" | "coffee" | "hire" | "whoami" | "increase" | null;

const help = "Comandos: help, whoami, about, projects, pokemon, java, coffee, matrix, night, neon, sudo hire jhonatan, increase, clear.";
const responses: Record<string, string> = {
  whoami: "Identidad verificada: Jhonatan Ramírez Useche — Ingeniero de Sistemas y Full Stack Developer.",
  java: "JVM online: Spring Boot power unlocked.",
  coffee: "Caffeine protocol iniciado. Pair programming fuel ready.",
  pokemon: "Liga JotaR localizada. Abriendo perfil de campeón…",
  matrix: "Wake up, Jhonatan. The portfolio has you.",
  night: "Night Shift activado. Señal reducida, creatividad aumentada.",
  neon: "Neon Core restaurado. Todos los canales de energía online.",
  "sudo hire jhonatan": "Solicitud elevada al comité de decisiones. Excelente decisión.",
  increase: "Solicitud de revisión salarial registrada con prioridad ejecutiva.",
};

const playTone = (frequency: number, duration = 0.12) => {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.035, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
  window.setTimeout(() => context.close(), duration * 1000 + 100);
};

const TerminalEffectLayer = ({ effect }: { effect: TerminalEffect }) => (
  <AnimatePresence mode="wait">
    {effect && <motion.div key={effect} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {effect === "matrix" && <div className="absolute inset-0 bg-[#010b05]/95 p-5 font-mono text-xs leading-5 text-emerald-400/70">{Array.from({ length: 520 }, (_, index) => <motion.span key={index} animate={{ opacity: [0.1, 1, 0.2] }} transition={{ duration: 0.7 + (index % 5) * 0.2, repeat: Infinity, delay: (index % 12) * 0.08 }}>{String.fromCharCode(0x30a0 + (index % 96))}</motion.span>)}</div>}
      {effect === "night" && <div className="absolute inset-0 bg-[#07091b]/95"><motion.div animate={{ boxShadow: ["0 0 25px #c4b5fd", "0 0 70px #c4b5fd", "0 0 25px #c4b5fd"] }} transition={{ duration: 2, repeat: Infinity }} className="absolute right-16 top-12 h-20 w-20 rounded-full bg-violet-100" /><p className="absolute bottom-12 left-6 font-mono text-violet-200">NIGHT SHIFT // focus mode</p></div>}
      {effect === "neon" && <div className="absolute inset-0 grid place-items-center bg-[#050816]/90"><motion.div animate={{ scale: [0.1, 2.6], opacity: [0.9, 0] }} transition={{ duration: 1.2, repeat: Infinity }} className="absolute h-24 w-24 rounded-full border border-cyan-300" /><motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="h-36 w-36 rounded-full border border-dashed border-violet-300" /><p className="absolute bottom-10 font-mono text-cyan-200">NEON CORE // ONLINE</p></div>}
      {effect === "java" && <div className="absolute inset-0 grid place-items-center bg-[#160d08]/95"><motion.div animate={{ rotate: [0, 8, -8, 0], y: [10, -8, 10] }} transition={{ duration: 1.4, repeat: Infinity }} className="text-center"><Rocket size={44} className="mx-auto text-orange-300" /><p className="mt-3 font-mono text-orange-100">JVM WARMUP COMPLETE</p><p className="text-xs text-orange-200/60">spring beans are dancing</p></motion.div></div>}
      {effect === "coffee" && <div className="absolute inset-0 grid place-items-center bg-[#190d08]/95"><div className="flex items-end gap-7"><motion.div animate={{ x: [0, 30, 0], rotate: [0, -8, 0] }} transition={{ duration: 1.4, repeat: 2 }} className="text-center"><Coffee size={58} className="text-amber-300" /><span className="text-3xl">☕</span></motion.div><motion.div animate={{ x: [0, -30, 0], rotate: [0, 8, 0] }} transition={{ duration: 1.4, repeat: 2, delay: .2 }} className="text-center"><Coffee size={58} className="text-amber-100" /><span className="text-3xl">☕</span></motion.div></div><p className="absolute bottom-10 font-mono text-amber-100">PAIR PROGRAMMING FUEL // COMPILED</p></div>}
      {effect === "hire" && <div className="absolute inset-0 grid place-items-center bg-[#0c0717]/95"><motion.div initial={{ scale: 0, rotate: -18 }} animate={{ scale: 1, rotate: -8 }} className="rounded-xl border-4 border-violet-300 p-5 text-center text-violet-100 shadow-[0_0_50px_rgba(167,139,250,.35)]"><BadgeCheck size={42} className="mx-auto" /><p className="mt-2 font-black tracking-widest">HIRE APPROVED</p><p className="mt-1 text-xs text-violet-200/70">excellent ROI detected</p></motion.div><PartyPopper className="absolute bottom-10 right-12 text-pink-300" /></div>}
      {effect === "whoami" && <div className="absolute inset-0 flex items-center justify-center bg-[#06131c]/95 p-5"><motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="flex items-center gap-4 rounded-xl border border-cyan-300/30 bg-cyan-300/10 p-4"><img src="/images/trainer-avatar.png" className="h-16 w-16 rounded-lg object-cover" alt="Jhonatan avatar" /><div><p className="font-mono text-xs text-cyan-300">IDENTITY // VERIFIED</p><p className="mt-1 font-bold">Jhonatan Ramírez Useche</p><p className="text-xs text-white/55">systems engineer · full stack</p></div><IdCard className="text-cyan-300" /></motion.div></div>}
      {effect === "increase" && <div className="absolute inset-0 flex items-center justify-center bg-[#121008]/95 p-5"><motion.div initial={{ scale: .8 }} animate={{ scale: 1 }} className="w-full max-w-sm rounded-xl border border-amber-300/35 bg-amber-300/10 p-5"><div className="flex items-center justify-between"><p className="font-bold text-amber-100">SALARY REVIEW</p><TrendingUp className="text-emerald-300" /></div><p className="mt-3 text-sm text-white/70">Professional growth detected. Compensation alignment is now under review.</p><div className="mt-4 h-2 overflow-hidden rounded-full bg-black/30"><motion.div initial={{ width: 0 }} animate={{ width: "78%" }} transition={{ duration: 1.4 }} className="h-full bg-gradient-to-r from-amber-300 to-emerald-300" /></div><p className="mt-2 text-right font-mono text-xs text-amber-200">78% · committee pending</p><p className="mt-4 text-center text-xs text-white/45">A polite hint, professionally compiled.</p></motion.div></div>}
    </motion.div>}
  </AnimatePresence>
);

const TerminalApp = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(["JotaR.OS v1.0.0", "Type 'help' to discover the system.", "Status: all creative modules online."]);
  const [effect, setEffect] = useState<TerminalEffect>(null);
  const { openWindow, setTheme, activateCoffee } = useDesktopStore();

  useEffect(() => {
    if (!effect) return;
    const timer = window.setTimeout(() => setEffect(null), 3200);
    return () => window.clearTimeout(timer);
  }, [effect]);

  const runCommand = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    setInput("");
    if (command === "clear") { setOutput([]); setEffect(null); return; }
    if (command === "help") { setOutput((lines) => [...lines, help]); return; }
    if (command === "about" || command === "projects" || command === "pokemon") {
      openWindow({ id: command, title: command === "about" ? "About" : command === "projects" ? "Projects" : "Pokémon League" });
      setOutput((lines) => [...lines, `Opening ${command}.app...`]); playTone(520); return;
    }
    const nextEffect: TerminalEffect = command === "sudo hire jhonatan" ? "hire" : command === "whoami" ? "whoami" : command === "increase" ? "increase" : ["matrix", "night", "neon", "java", "coffee"].includes(command) ? command as TerminalEffect : null;
    if (nextEffect) setEffect(nextEffect);
    if (command === "matrix") { setTheme("matrix"); playTone(180, .24); }
    if (command === "night") { setTheme("night"); playTone(260, .18); }
    if (command === "neon") { setTheme("neon"); playTone(720, .14); }
    if (command === "java") playTone(430, .12);
    if (command === "coffee") { activateCoffee(); playTone(340, .18); }
    if (command === "sudo hire jhonatan") playTone(620, .25);
    setOutput((lines) => [...lines, responses[command] ?? `command not found: ${command}. Try 'help'.`]);
  };

  return <div className="relative h-full overflow-hidden bg-[#030a08] p-5 font-mono text-sm text-emerald-300"><TerminalEffectLayer effect={effect} /><motion.div animate={{ y: [0, 420, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute inset-x-0 top-0 h-px bg-emerald-300/30 shadow-[0_0_18px_rgba(110,231,183,.8)]" /><div className="relative mb-5 flex items-center justify-between border-b border-emerald-400/15 pb-3 text-xs text-emerald-300/60"><span>guest@jotar-os:~</span><span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />CONNECTED</span></div><div className="relative space-y-2">{output.map((line, index) => <p key={`${line}-${index}`}><span className="mr-2 text-cyan-300">›</span>{line}</p>)}</div><form className="relative mt-4 flex items-center gap-2 text-white" onSubmit={runCommand}><span className="shrink-0 text-cyan-300">guest@jotar-os:~$</span><input autoFocus value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" aria-label="Terminal command" /><span className="h-4 w-2 animate-pulse bg-emerald-300" aria-label="blinking cursor" /></form><p className="relative mt-5 text-[10px] text-white/25">AUDIO CHANNEL: interactive tones enabled · type help</p></div>;
};

export default TerminalApp;
