import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, Radio, Wifi } from "lucide-react";

const DesktopHeader = () => {
  const [cpu, setCpu] = useState(42);
  const [memory, setMemory] = useState(68);
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCpu(28 + Math.floor(Math.random() * 47));
      setMemory(56 + Math.floor(Math.random() * 25));
      setLatency(12 + Math.floor(Math.random() * 38));
    }, 1800);
    return () => window.clearInterval(timer);
  }, []);

  return <>
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }} className="absolute left-5 top-6 z-10 sm:left-10 sm:top-8"><p className="font-mono text-[10px] uppercase tracking-[0.32em] text-cyan-300/70">JOTAR // COMMAND DECK</p><div className="mt-2 flex items-center gap-2 text-xs text-white/45"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> ONLINE · BUILD 2026.07</div></motion.div>
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="absolute left-1/2 top-10 z-10 -translate-x-1/2 text-center sm:top-12"><div className="relative"><div className="absolute -inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" /><h1 className="relative text-4xl font-black tracking-tight text-white drop-shadow-[0_0_20px_rgba(34,211,238,.25)] sm:text-6xl">JotaR<span className="text-cyan-300">.</span>OS</h1></div><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-300/80 sm:text-xs">where code meets creativity</p></motion.div>
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="absolute right-5 top-6 z-10 hidden gap-4 font-mono text-[10px] text-white/45 sm:right-10 sm:top-8 sm:flex"><div className="flex items-center gap-1.5"><Cpu size={14} className="text-violet-300" /> CPU <motion.span key={cpu} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-violet-200">{cpu}%</motion.span></div><div className="flex items-center gap-1.5"><Activity size={14} className="text-cyan-300" /> MEM <motion.span key={memory} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-200">{memory}%</motion.span></div><div className="flex items-center gap-1.5"><Wifi size={14} className="text-emerald-300" /> {latency}ms</div><Radio size={14} className="animate-pulse text-emerald-300" /></motion.div>
  </>;
};

export default DesktopHeader;
