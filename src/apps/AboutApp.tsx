import { motion } from "framer-motion";
import { Code2, Database, GitBranch, MapPin, Server } from "lucide-react";

const stats = [
  { label: "Stack", value: "Full Stack", icon: Code2 },
  { label: "Especialidad", value: "Java + Spring", icon: Server },
  { label: "Datos", value: "SQL + NoSQL", icon: Database },
  { label: "Flujo", value: "Git + Scrum", icon: GitBranch },
];

const AboutApp = () => (
  <div className="grid gap-6 text-white lg:grid-cols-[230px_1fr]">
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex min-h-60 flex-col justify-between overflow-hidden rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-cyan-400/15 via-slate-950 to-violet-500/15 p-6"
    >
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-300/40 bg-slate-950/70 font-mono text-4xl font-bold text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,.24)]">JR</div>
      <div className="relative">
        <p className="text-sm text-cyan-200">SYSTEM PROFILE</p>
        <p className="mt-1 font-mono text-xs text-white/50">STATUS: AVAILABLE_FOR_WORK</p>
      </div>
    </motion.div>

    <div className="space-y-5">
      <div>
        <p className="font-mono text-sm text-cyan-300">// about_me</p>
        <h2 className="mt-1 text-3xl font-bold">Jhonatan Stiven Ramírez Useche</h2>
        <p className="mt-3 max-w-3xl leading-7 text-white/70">
          Ingeniero de Sistemas y desarrollador Full Stack. Construyo aplicaciones web sólidas de extremo a extremo, desde interfaces claras en React hasta servicios backend con Java y Spring Boot, APIs REST y datos bien modelados.
        </p>
        <p className="mt-3 max-w-3xl leading-7 text-white/60">
          Me interesa transformar necesidades reales en soluciones escalables, mantenibles y bien documentadas. Aporto experiencia práctica en despliegues, bases de datos, trabajo ágil y mejora continua.
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm text-violet-300"><MapPin size={16} /> Colombia · Inglés B1</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map(({ label, value, icon: Icon }, index) => (
          <motion.div key={label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <Icon size={20} className="text-cyan-300" />
            <div><p className="text-xs text-white/45">{label}</p><p className="font-medium">{value}</p></div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default AboutApp;
