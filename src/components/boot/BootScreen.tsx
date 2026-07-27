import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";

import Typewriter from "../common/Typewriter";
import Desktop from "../desktop/Desktop";
import { useLanguage } from "../../i18n/LanguageContext";

const bootLines = [
  "BIOS handshake established",
  "Loading JotaR kernel",
  "Mounting creative filesystem",
  "Calibrating neon signal grid",
  "Importing developer profile",
  "Starting easter egg engine",
  "All systems nominal",
  "Launching command deck",
];

type Phase = "boot" | "transition" | "desktop";

const BootScreen = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const [phase, setPhase] = useState<Phase>("boot");
  const [bootComplete, setBootComplete] = useState(false);
  const { language, setLanguage } = useLanguage();
  const bootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bootRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(".boot-frame", { opacity: 0, scale: 0.92, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" });
      gsap.to(".boot-core", { rotation: 360, duration: 18, repeat: -1, ease: "none" });
      gsap.to(".boot-progress", { width: "100%", duration: 11, ease: "power1.inOut" });
      gsap.to(".boot-pulse", { opacity: 0.3, scale: 1.6, duration: 1.3, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, bootRef);
    return () => context.revert();
  }, []);
  const selectLanguage = (next: "es" | "en") => setLanguage(next);

  useEffect(() => {
    if (phase !== "transition") return;
    const timer = window.setTimeout(() => setPhase("desktop"), 800);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <section ref={bootRef} className="fixed inset-0 overflow-hidden bg-[#030611]">
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(34,211,238,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.08)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />

      <AnimatePresence>{phase === "desktop" && <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0"><Desktop /></motion.div>}</AnimatePresence>

      <AnimatePresence>{phase !== "desktop" && <motion.div animate={phase === "transition" ? { scale: 1.08, opacity: 0, filter: "blur(14px)" } : {}} transition={{ duration: 0.7 }} className="absolute inset-0 flex items-center justify-center p-4">
        <div className="boot-frame relative w-[820px] max-w-full overflow-hidden rounded-2xl border border-cyan-300/25 bg-[#040a14]/90 font-mono shadow-[0_0_100px_rgba(34,211,238,.15)] backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-cyan-300/15 px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-cyan-100/60"><span>JOTAR.OS / BIOS</span><span className="flex items-center gap-3"><button onClick={() => selectLanguage("es")} className={language === "es" ? "text-cyan-200" : "text-white/30"}>ES</button><button onClick={() => selectLanguage("en")} className={language === "en" ? "text-cyan-200" : "text-white/30"}>EN</button><span className="boot-pulse h-2 w-2 rounded-full bg-emerald-300" />SECURE BOOT</span></div>
          <div className="grid gap-8 p-5 sm:grid-cols-[150px_1fr] sm:p-8">
            <div className="hidden items-center justify-center sm:flex"><div className="boot-core relative flex h-28 w-28 items-center justify-center rounded-full border border-cyan-300/40"><div className="absolute inset-3 rounded-full border border-violet-300/40" /><div className="h-10 w-10 rounded-xl bg-gradient-to-br from-cyan-300 to-violet-500 shadow-[0_0_35px_rgba(34,211,238,.7)]" /></div></div>
            <div className="relative min-h-[330px] overflow-hidden"><div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-cyan-200/30 shadow-[0_0_14px_#67e8f9]" /><p className="mb-5 text-xs text-cyan-100/60">JotaR.OS // initializing command deck</p><div className="space-y-1.5 text-sm text-emerald-300">{bootLines.slice(0, bootComplete ? currentLine + 1 : currentLine).map((line, index) => <div key={line}><span className="mr-2 text-cyan-300">›</span>{line}<span className="ml-2 text-white/25">[{String(index + 1).padStart(2, "0")}]</span></div>)}{!bootComplete && currentLine < bootLines.length && <div className="flex"><span className="mr-2 text-cyan-300">›</span><Typewriter key={currentLine} text={bootLines[currentLine]} speed={38} onComplete={() => { if (currentLine === bootLines.length - 1) { setBootComplete(true); window.setTimeout(() => setPhase("transition"), 1200); } else window.setTimeout(() => setCurrentLine((line) => line + 1), 220); }} /></div>}</div></div>
          </div>
          <div className="border-t border-cyan-300/15 px-5 py-4"><div className="mb-2 flex justify-between text-[10px] uppercase tracking-[0.2em] text-white/40"><span>System integrity</span><span>{bootComplete ? "100%" : "scanning"}</span></div><div className="h-1 overflow-hidden rounded-full bg-white/10"><div className="boot-progress h-full w-0 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500 shadow-[0_0_14px_#22d3ee]" /></div></div>
        </div>
      </motion.div>}</AnimatePresence>
    </section>
  );
};

export default BootScreen;
