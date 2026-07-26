import { motion } from "framer-motion";

const clusters = [
  { name: "Backend", color: "cyan", skills: ["Java", "Spring Boot", "Node.js", "PHP", "REST API", "Maven"] },
  { name: "Frontend", color: "violet", skills: ["React", "Angular", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind", "Vite"] },
  { name: "Datos", color: "emerald", skills: ["PostgreSQL", "MySQL", "SQL", "MongoDB"] },
  { name: "Tooling", color: "amber", skills: ["Git", "GitHub", "Docker", "Postman", "Jira", "Linux", "Netlify"] },
];

const colorClasses: Record<string, string> = { cyan: "border-cyan-400/35 text-cyan-200 bg-cyan-400/10", violet: "border-violet-400/35 text-violet-200 bg-violet-400/10", emerald: "border-emerald-400/35 text-emerald-200 bg-emerald-400/10", amber: "border-amber-400/35 text-amber-200 bg-amber-400/10" };

const SkillsApp = () => (
  <div className="text-white"><p className="font-mono text-sm text-cyan-300">// skill_radar.exe</p><h2 className="mt-1 text-3xl font-bold">Constelación técnica</h2><p className="mt-2 max-w-2xl text-white/60">Cada nodo representa una tecnología que he aplicado en proyectos, soporte o despliegue.</p>
    <div className="mt-7 grid gap-4 md:grid-cols-2">{clusters.map((cluster, index) => <motion.section key={cluster.name} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.08 }} className={`relative overflow-hidden rounded-2xl border p-5 ${colorClasses[cluster.color]}`}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-current opacity-10 blur-2xl" /><h3 className="relative text-lg font-bold">{cluster.name}</h3><div className="relative mt-4 flex flex-wrap gap-2">{cluster.skills.map((skill, skillIndex) => <motion.span key={skill} whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 400 }} className="cursor-default rounded-full border border-current/30 bg-slate-950/50 px-3 py-1.5 text-sm" style={{ transitionDelay: `${skillIndex * 30}ms` }}>{skill}</motion.span>)}</div>
    </motion.section>)}</div>
  </div>
);

export default SkillsApp;
