import { motion } from "framer-motion";
import { ExternalLink, FolderGit2, Gamepad2, MessageSquareText, MonitorCog } from "lucide-react";

const projects = [
  { name: "Pokedex Pokémon", description: "Aplicación React que consume la PokéAPI para explorar y consultar Pokémon.", tags: ["React", "API", "JavaScript"], icon: Gamepad2, demo: "https://pokemon-api-jru.netlify.app", repo: "https://github.com/Jhonara/pokedex-react" },
  { name: "Coopcompartir v2", description: "Actualización de sitio web institucional para una cooperativa.", tags: ["React", "TypeScript", "Mailer"], icon: MonitorCog, demo: "https://compartirv2-coop-jru.netlify.app", repo: "https://github.com/Jhonara/Pagina-CoopV2" },
  { name: "Bot WhatsApp", description: "Bot conversacional con respuestas automáticas e interacción por WhatsApp.", tags: ["Node.js", "Bot", "JavaScript"], icon: MessageSquareText, repo: "https://github.com/Jhonara/bot-whatsapp" },
];

const ProjectsApp = () => (
  <div className="text-white">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div><p className="font-mono text-sm text-cyan-300">~/workspace/projects</p><h2 className="mt-1 text-3xl font-bold">Explorador de proyectos</h2></div>
      <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{projects.length} repositorios destacados</span>
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => {
        const Icon = project.icon;
        return <motion.article key={project.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5 }} className="group flex min-h-72 flex-col rounded-2xl border border-white/10 bg-slate-950/40 p-5 transition-colors hover:border-cyan-400/40">
          <div className="flex items-start justify-between"><div className="rounded-xl bg-violet-500/15 p-3 text-violet-300"><Icon size={24} /></div><FolderGit2 size={20} className="text-white/30 group-hover:text-cyan-300" /></div>
          <h3 className="mt-5 text-xl font-bold">{project.name}</h3><p className="mt-2 flex-1 text-sm leading-6 text-white/60">{project.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-md bg-white/7 px-2 py-1 text-xs text-cyan-200">{tag}</span>)}</div>
          <div className="mt-5 flex gap-3 text-sm"><a className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-100" href={project.repo} target="_blank" rel="noreferrer"><FolderGit2 size={15} /> Código</a>{project.demo && <a className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-100" href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Demo</a>}</div>
        </motion.article>;
      })}
    </div>
  </div>
);

export default ProjectsApp;
