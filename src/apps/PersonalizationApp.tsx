import { motion } from "framer-motion";
import { Check, Cpu, Grid3X3, Palette, Sparkles } from "lucide-react";
import { backgroundRegistry } from "../backgrounds/background.registry";
import { useDesktopStore } from "../store/desktop.store";

const performanceLabel = { light: "Ligero", balanced: "Equilibrado", cinematic: "Cinemático" } as const;

const PersonalizationApp = () => {
  const backgroundId = useDesktopStore((state) => state.backgroundId);
  const setBackground = useDesktopStore((state) => state.setBackground);

  return <div className="h-full min-h-0 overflow-y-auto pr-1 text-white">
    <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-6">
      <div><p className="flex items-center gap-2 font-mono text-[10px] tracking-[.22em] text-cyan-300"><Palette size={14} /> CONFIGURACIÓN / AMBIENTE VISUAL</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Personalizar entorno</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">Selecciona la atmósfera visual que acompaña al sistema. La escena activa se conserva entre sesiones.</p></div>
      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 px-4 py-3 font-mono text-[10px] tracking-[.14em] text-cyan-100"><span className="flex items-center gap-2"><Sparkles size={14} className="text-cyan-300" /> BACKGROUND ENGINE</span><span className="mt-1 block text-white/40">{backgroundRegistry.length} PRESET DISPONIBLE</span></div>
    </header>

    <section className="mt-6"><div className="mb-3 flex items-center gap-2 font-mono text-xs tracking-[.16em] text-white/55"><Grid3X3 size={15} className="text-cyan-300" /> BIBLIOTECA DE ESCENAS</div><div className="grid gap-4 lg:grid-cols-2">
      {backgroundRegistry.map((background, index) => {
        const active = background.id === backgroundId;
        return <motion.button key={background.id} type="button" onClick={() => setBackground(background.id)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }} className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition ${active ? "border-cyan-300/55 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,.12)]" : "border-white/10 bg-white/[.025] hover:border-cyan-300/30 hover:bg-cyan-400/[.04]"}`}>
          <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(56,189,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.08)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(90deg,black,transparent_72%)]" />
          <div className="relative flex min-h-32 flex-col justify-between"><div className="flex items-start justify-between gap-4"><span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-[#071224]/80 text-cyan-200"><Grid3X3 size={20} /></span>{active && <span className="flex items-center gap-1 rounded-full border border-cyan-300/35 bg-cyan-400/15 px-2.5 py-1 font-mono text-[9px] tracking-[.12em] text-cyan-100"><Check size={12} /> ACTIVO</span>}</div><div><div className="flex items-center justify-between gap-3"><h3 className="font-semibold text-white">{background.name}</h3><span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wide text-white/40"><Cpu size={11} /> {performanceLabel[background.performance]}</span></div><p className="mt-1.5 max-w-md text-sm leading-5 text-white/55">{background.description}</p></div></div>
        </motion.button>;
      })}
    </div></section>
    <p className="mt-6 font-mono text-[10px] tracking-[.12em] text-white/35">EL MOTOR CARGA SOLAMENTE LA ESCENA SELECCIONADA.</p>
  </div>;
};

export default PersonalizationApp;
