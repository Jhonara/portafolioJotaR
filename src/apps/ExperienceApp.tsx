import { motion } from "framer-motion";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

const timeline = [
  { year: "2024 — hoy", title: "Desarrollador de software", place: "Playtechnologies", icon: BriefcaseBusiness, detail: "Backend con Java y Spring Boot, frontend con React, PostgreSQL, despliegues, Scrum y documentación técnica.", current: true },
  { year: "2020 — 2024", title: "Soporte hardware", place: "Playtechnologies", icon: BriefcaseBusiness, detail: "Soporte a equipos POS, kioskos y redes; mantenimiento, análisis de logs y gestión de proveedores." },
  { year: "2019 — 2020", title: "Auxiliar de sistemas", place: "Zagacol", icon: BriefcaseBusiness, detail: "Mantenimiento de equipos, soporte de cámaras y telefonía IP, configuración de software y redes." },
  { year: "2024", title: "Ingeniería de Sistemas", place: "CUN", icon: GraduationCap, detail: "Formación profesional en sistemas y desarrollo de software." },
  { year: "2022", title: "Tecnólogo ADSI", place: "SENA", icon: GraduationCap, detail: "Análisis y Desarrollo de Sistemas de Información." },
];

const ExperienceApp = () => (
  <div className="text-white"><p className="font-mono text-sm text-cyan-300">// career_timeline.log</p><h2 className="mt-1 text-3xl font-bold">Trayectoria y formación</h2><div className="relative mt-7 space-y-5 border-l border-cyan-400/25 pl-7">
    {timeline.map((item, index) => { const Icon = item.icon; return <motion.article key={`${item.title}-${item.year}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} className="relative rounded-xl border border-white/10 bg-white/5 p-4 hover:border-cyan-400/35">
      <span className={`absolute -left-[37px] top-5 flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#0B1220] ${item.current ? "bg-emerald-400" : "bg-violet-400"}`} />
      <div className="flex gap-3"><div className="rounded-lg bg-cyan-400/10 p-2 text-cyan-300"><Icon size={19} /></div><div className="min-w-0"><div className="flex flex-wrap items-center gap-x-3"><h3 className="font-bold">{item.title}</h3><span className="font-mono text-xs text-cyan-300">{item.year}</span></div><p className="text-sm text-violet-300">{item.place}</p><p className="mt-2 text-sm leading-6 text-white/60">{item.detail}</p></div></div>
    </motion.article>; })}
  </div></div>
);

export default ExperienceApp;
