import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, ChevronDown, Download, Laptop, Network, Wrench, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Chapter = {
  id: string;
  chapter: string;
  heading: string;
  role: string;
  company: string;
  period: string;
  color: string;
  accent: string;
  story: string;
  functions: string[];
  unlocks: string[];
  tools: string[];
  achievements: string[];
  projects: string[];
  logo: string;
  icon: typeof Laptop;
};

const chapters: Chapter[] = [
  {
    id: "beginning", chapter: "CHAPTER I", heading: "THE BEGINNING", role: "Auxiliar de Sistemas", company: "Zagacol", period: "2019 — 2020", color: "#f4c95d", accent: "rgba(244,201,93,.18)",
    story: "El primer capítulo de una carrera construida cerca de las personas y de la infraestructura. Aquí aprendí que cada equipo, red y usuario cuenta dentro de un sistema que debe seguir funcionando.",
    functions: ["Mantenimiento de computadores y redes", "Instalación y revisión de cámaras", "Configuración de telefonía IP", "Inventario y soporte a usuarios"],
    unlocks: ["SQL", "PHP", "Atención al cliente"], tools: ["Hardware", "CCTV", "Telefonía IP", "Redes"], achievements: ["Primer entorno profesional desbloqueado", "Soporte de campo operativo"], projects: ["Mantenimiento e inventario tecnológico"], logo: "/images/experience/zagacol-logo.png", icon: Laptop,
  },
  {
    id: "foundations", chapter: "CHAPTER II", heading: "BUILDING THE FOUNDATIONS", role: "Soporte Hardware", company: "Playtechnologies", period: "2020 — 2024", color: "#a78bfa", accent: "rgba(167,139,250,.2)",
    story: "La operación se convirtió en laboratorio. Resolver incidencias de equipos POS, kioscos y redes fortaleció una mirada práctica: entender el problema, encontrar la causa y llevar el servicio de vuelta a producción.",
    functions: ["Diagnóstico y mantenimiento preventivo", "Configuración de dispositivos y periféricos", "Análisis de logs y escalamiento de incidentes", "Acompañamiento a proveedores y usuarios"],
    unlocks: ["Linux", "Redes", "Docker"], tools: ["POS", "Sunmi", "Linux", "Logs"], achievements: ["Soporte de operación real", "Diagnóstico técnico de alto impacto"], projects: ["Estabilización de kioscos y puntos de venta"], logo: "/images/experience/playtechnologies-logo.png", icon: Wrench,
  },
  {
    id: "fullstack", chapter: "CHAPTER III", heading: "FULL STACK DEVELOPER", role: "Desarrollador de Software", company: "Playtechnologies", period: "2024 — ACTUALIDAD", color: "#13AB91", accent: "rgba(19,171,145,.22)",
    story: "La experiencia de operación se transformó en productos. Hoy construyo soluciones Full Stack que conectan interfaces, servicios, datos y despliegues con una prioridad clara: que funcionen para las personas que las usan.",
    functions: ["Diseño de APIs REST y servicios Spring Boot", "Desarrollo de módulos React y validación de flujos", "Integración con bases de datos y soporte de despliegues", "Trabajo ágil, documentación y mejora continua"],
    unlocks: ["Java", "Spring Boot", "React", "PostgreSQL", "APIs REST"], tools: ["Java", "Spring Boot", "React", "PostgreSQL", "Git", "Docker"], achievements: ["Arquitectura Full Stack activada", "Servicios y datos conectados a operación"], projects: ["AuditPlay", "Módulos operativos", "Integraciones REST"], logo: "/images/experience/playtechnologies-logo.png", icon: Network,
  },
];

const LogoSlot = ({ chapter }: { chapter: Chapter }) => {
  const [showImage, setShowImage] = useState(true);
  const Icon = chapter.icon;
  return <div className="relative grid h-18 w-18 place-items-center rounded-2xl border border-white/15 bg-black/20 shadow-[inset_0_0_26px_rgba(255,255,255,.04)]">
    {showImage && <img src={chapter.logo} alt={`Logo de ${chapter.company}`} onError={() => setShowImage(false)} className="max-h-12 max-w-12 object-contain" />}
    {!showImage && <Icon size={30} style={{ color: chapter.color }} />}
  </div>;
};

const ChapterCard = ({ chapter, onExpand }: { chapter: Chapter; onExpand: () => void }) => {
  const [flipped, setFlipped] = useState(false);
  return <motion.button type="button" onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} onClick={onExpand} initial={{ opacity: 0, z: -180, rotateX: 18 }} whileInView={{ opacity: 1, z: 0, rotateX: 0 }} viewport={{ amount: .55, once: false }} transition={{ type: "spring", stiffness: 130, damping: 19 }} className="career-card relative h-[22rem] w-full max-w-[25rem] text-left [perspective:1100px]">
    <motion.span animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: .65, ease: [0.22, 1, 0.36, 1] }} className="absolute inset-0 block [transform-style:preserve-3d]">
      <span className="career-card-face absolute inset-0 flex flex-col justify-between rounded-3xl border p-6 [backface-visibility:hidden]" style={{ borderColor: `${chapter.color}66`, background: `linear-gradient(145deg, ${chapter.accent}, rgba(4,10,22,.97) 52%, rgba(4,10,22,.9))`, boxShadow: `0 0 45px ${chapter.accent}` }}>
        <div className="flex items-start justify-between"><LogoSlot chapter={chapter} /><span className="font-mono text-[10px] tracking-[.2em]" style={{ color: chapter.color }}>{chapter.chapter}</span></div>
        <div><p className="font-mono text-xs tracking-[.18em] text-white/50">{chapter.company.toUpperCase()}</p><h3 className="mt-2 text-3xl font-black leading-none text-white">{chapter.role}</h3><p className="mt-4 font-mono text-sm" style={{ color: chapter.color }}>{chapter.period}</p></div>
        <span className="font-mono text-[10px] tracking-[.14em] text-white/45">HOVER PARA REVISAR ARCHIVO · CLICK PARA ABRIR</span>
      </span>
      <span className="career-card-face absolute inset-0 flex -rotate-y-180 flex-col justify-between rounded-3xl border p-6 [backface-visibility:hidden]" style={{ borderColor: `${chapter.color}66`, background: "linear-gradient(145deg, #111b31, #050914)" }}>
        <div className="flex items-center gap-3"><Award size={21} style={{ color: chapter.color }} /><span className="font-mono text-xs tracking-[.18em] text-white/60">UNLOCK REPORT</span></div>
        <div className="space-y-4"><MiniList title="TECNOLOGÍAS" items={chapter.tools.slice(0, 4)} color={chapter.color} /><MiniList title="LOGROS" items={chapter.achievements} color={chapter.color} /></div>
        <span className="font-mono text-[10px] tracking-[.14em]" style={{ color: chapter.color }}>CLICK PARA EXPANDIR CAPÍTULO</span>
      </span>
    </motion.span>
  </motion.button>;
};

const MiniList = ({ title, items, color }: { title: string; items: string[]; color: string }) => <div><p className="font-mono text-[10px] tracking-[.16em] text-white/40">{title}</p><div className="mt-2 flex flex-wrap gap-1.5">{items.map((item) => <span key={item} className="rounded-full border px-2 py-1 text-[10px] text-white/75" style={{ borderColor: `${color}55` }}>{item}</span>)}</div></div>;

const ExpandedChapter = ({ chapter, onClose }: { chapter: Chapter | null; onClose: () => void }) => <AnimatePresence>{chapter && <motion.div initial={{ opacity: 0, scale: .94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .97, y: 18 }} transition={{ type: "spring", stiffness: 230, damping: 25 }} className="absolute inset-3 z-30 overflow-auto rounded-3xl border bg-[#071224]/98 p-6 shadow-[0_25px_90px_rgba(0,0,0,.7)] backdrop-blur-2xl sm:p-8" style={{ borderColor: `${chapter.color}66` }}>
  <button type="button" onClick={onClose} className="absolute right-4 top-4 rounded-xl p-2 text-white/60 transition hover:bg-white/10 hover:text-white" aria-label="Cerrar capítulo"><X size={18} /></button>
  <div className="max-w-4xl"><div className="flex items-center gap-4"><LogoSlot chapter={chapter} /><div><p className="font-mono text-xs tracking-[.2em]" style={{ color: chapter.color }}>{chapter.chapter} · {chapter.company.toUpperCase()}</p><h3 className="mt-1 text-3xl font-black">{chapter.role}</h3><p className="mt-1 font-mono text-sm text-white/50">{chapter.period}</p></div></div><p className="mt-8 max-w-3xl text-base leading-7 text-white/70">{chapter.story}</p>
  <div className="mt-8 grid gap-6 md:grid-cols-2"><InfoBlock title="MISIÓN Y FUNCIONES" items={chapter.functions} color={chapter.color} /><InfoBlock title="PROYECTOS Y LOGROS" items={[...chapter.projects, ...chapter.achievements]} color={chapter.color} /></div>
  <div className="mt-7"><p className="font-mono text-xs tracking-[.18em] text-white/45">HABILIDADES DESBLOQUEADAS</p><div className="mt-3 flex flex-wrap gap-2">{chapter.unlocks.map((skill, index) => <motion.span key={skill} initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .18 + index * .06 }} className="rounded-full border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: `${chapter.color}88`, color: chapter.color, background: `${chapter.color}16` }}>+ {skill}</motion.span>)}</div></div>
  <div className="mt-7"><p className="font-mono text-xs tracking-[.18em] text-white/45">HERRAMIENTAS APRENDIDAS</p><div className="mt-3 flex flex-wrap gap-2">{chapter.tools.map((tool) => <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70">{tool}</span>)}</div></div></div>
</motion.div>}</AnimatePresence>;

const InfoBlock = ({ title, items, color }: { title: string; items: string[]; color: string }) => <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="font-mono text-[10px] tracking-[.18em] text-white/45">{title}</p><ul className="mt-4 space-y-3 text-sm leading-5 text-white/70">{items.map((item) => <li key={item} className="flex gap-2"><span style={{ color }}>✦</span>{item}</li>)}</ul></div>;

const CareerIntro = ({ visible }: { visible: boolean }) => <AnimatePresence>{visible && <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }} transition={{ duration: .5 }} className="absolute inset-0 z-40 grid place-items-center bg-[#030813]/98 backdrop-blur-sm"><div className="text-center font-mono"><motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-sm tracking-[.25em] text-[#13AB91]">ACCESSING CAREER DATABASE...</motion.p><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .55 }} className="mt-4 text-xs tracking-[.16em] text-white/55">Loading career history...</motion.p><motion.p initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.05, type: "spring" }} className="mt-6 text-2xl font-black tracking-[.15em] text-white">3 CHAPTERS FOUND</motion.p></div></motion.div>}</AnimatePresence>;

const ExperienceApp = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [intro, setIntro] = useState(true);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Chapter | null>(null);

  useEffect(() => { const timer = window.setTimeout(() => setIntro(false), 2100); return () => window.clearTimeout(timer); }, []);
  useEffect(() => {
    if (intro) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    const resetCampaign = () => { viewport.scrollTo({ top: 0 }); setActive(0); ScrollTrigger.refresh(); };
    const timer = window.setTimeout(resetCampaign, 80);
    return () => window.clearTimeout(timer);
  }, [intro]);
  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".campaign-chapter");
      sections.forEach((section, index) => ScrollTrigger.create({ trigger: section, scroller: viewport, start: "top 55%", end: "bottom 45%", onEnter: () => setActive(index), onEnterBack: () => setActive(index) }));
    }, viewport);
    return () => context.revert();
  }, []);

  return <div className="text-white"><div className="mb-4 flex items-end justify-between gap-4"><div><p className="font-mono text-xs tracking-[.2em] text-[#13AB91]">// CAREER_CAMPAIGN.EXE</p><h2 className="mt-1 text-3xl font-bold">Modo campaña</h2></div><p className="font-mono text-[10px] tracking-[.16em] text-white/45">CHAPTER {String(active + 1).padStart(2, "0")} / 03</p></div>
    <div className="career-campaign relative overflow-hidden rounded-3xl border border-white/10 bg-[#040914] shadow-[0_0_55px_rgba(19,171,145,.1)]">
      <CareerIntro visible={intro} />
      <div ref={viewportRef} className="career-viewport h-[min(680px,calc(100vh-190px))] min-h-[500px] snap-y snap-mandatory overflow-y-auto">
        {chapters.map((chapter, index) => <section key={chapter.id} className="campaign-chapter relative flex min-h-full snap-start items-center overflow-hidden p-5 sm:p-10" style={{ "--chapter-color": chapter.color, "--chapter-accent": chapter.accent } as CSSProperties}>
          <div className="career-chapter-aura absolute inset-0" /><div className="relative z-10 grid w-full items-center gap-8 lg:grid-cols-[1fr_minmax(320px,400px)]"><div className="max-w-xl"><motion.p initial={{ opacity: 0, letterSpacing: "0em" }} whileInView={{ opacity: 1, letterSpacing: ".25em" }} viewport={{ amount: .6 }} className="font-mono text-xs font-bold" style={{ color: chapter.color }}>{chapter.chapter}</motion.p><motion.h3 initial={{ opacity: 0, y: 35, filter: "blur(9px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ amount: .55 }} transition={{ duration: .75, ease: [0.16, 1, 0.3, 1] }} className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">{chapter.heading}</motion.h3><p className="mt-5 text-lg font-semibold text-white/90">{chapter.role} <span style={{ color: chapter.color }}>@ {chapter.company}</span></p><p className="mt-1 font-mono text-sm text-white/45">{chapter.period}</p><p className="mt-6 max-w-lg leading-7 text-white/60">{chapter.story}</p><div className="mt-7"><p className="font-mono text-[10px] tracking-[.18em] text-white/45">HABILIDADES DESBLOQUEADAS</p><div className="mt-3 flex flex-wrap gap-2">{chapter.unlocks.map((skill) => <span key={skill} className="rounded-full border px-3 py-1 text-xs" style={{ color: chapter.color, borderColor: `${chapter.color}70`, background: `${chapter.color}12` }}>+ {skill}</span>)}</div></div></div><ChapterCard chapter={chapter} onExpand={() => setExpanded(chapter)} /></div>
          {index < chapters.length - 1 && <ChevronDown className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white/35" size={18} />}
        </section>)}
        <section className="campaign-chapter relative flex min-h-full snap-start items-center justify-center overflow-hidden p-6 text-center"><div className="relative z-10"><motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="font-mono text-xs tracking-[.3em] text-[#13AB91]">CAREER DATABASE SYNCHRONIZED</motion.p><motion.h3 initial={{ opacity: 0, scale: .86 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }} className="mt-5 text-5xl font-black sm:text-7xl">MISSION COMPLETE</motion.h3><p className="mt-5 font-mono text-sm text-white/55">Career Progress</p><div className="mx-auto mt-3 h-2 w-64 overflow-hidden rounded-full bg-white/10"><motion.div whileInView={{ width: "100%" }} initial={{ width: 0 }} transition={{ duration: 1.2 }} className="h-full bg-gradient-to-r from-[#13AB91] via-cyan-300 to-[#E92D88]" /></div><p className="mt-2 font-mono text-sm text-[#13AB91]">100%</p><p className="mt-10 font-mono text-sm tracking-[.22em] text-white/50">NEXT CHAPTER</p><p className="mt-2 text-2xl font-bold text-white/75">??? <span className="text-[#E92D88]">Coming Soon...</span></p><a href="/images/documentos/HV-Jhonathan%20Rami_rez%20Useche.pdf" download className="mt-9 inline-flex items-center gap-2 rounded-xl border border-[#13AB91]/55 bg-[#13AB91]/10 px-5 py-3 font-semibold text-cyan-50 transition hover:-translate-y-1 hover:bg-[#13AB91]/20 hover:shadow-[0_0_26px_rgba(19,171,145,.4)]"><Download size={18} /> Descargar CV</a></div></section>
      </div>
      <ExpandedChapter chapter={expanded} onClose={() => setExpanded(null)} />
    </div>
  </div>;
};

export default ExperienceApp;
