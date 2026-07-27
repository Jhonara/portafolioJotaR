import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderGit2, Gamepad2, Globe2, MessageSquareText, MonitorCog, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

type Project = { name: string; description: string; tags: string[]; icon: typeof Gamepad2; demo?: string; repo: string; accent: string; preview: string };

const ProjectsApp = () => {
  const { t } = useLanguage();
  const projects: Project[] = [
  {
    name: "Pokedex Pokémon",
    description: "projectPokedex",
    tags: ["React", "API", "JavaScript"],
    icon: Gamepad2,
    demo: "https://pokemon-api-jru.netlify.app",
    repo: "https://github.com/Jhonara/pokedex-react",
    accent: "from-red-400/35 via-yellow-300/10",
    preview: "previewPokedex",
  },
  {
    name: "Coopcompartir v2",
    description: "projectCoop",
    tags: ["React", "TypeScript", "Mailer"],
    icon: MonitorCog,
    demo: "https://compartirv2-coop-jru.netlify.app",
    repo: "https://github.com/Jhonara/Pagina-CoopV2",
    accent: "from-cyan-400/35 via-blue-500/10",
    preview: "previewCoop",
  },
  {
    name: "Bot WhatsApp",
    description: "projectBot",
    tags: ["Node.js", "Bot", "JavaScript"],
    icon: MessageSquareText,
    repo: "https://github.com/Jhonara/bot-whatsapp",
    accent: "from-emerald-400/35 via-green-500/10",
    preview: "previewBot",
  },
  {
    name: "JotaR.OS",
    description: "projectJotar",
    tags: ["React", "Framer Motion", "GSAP"],
    icon: Globe2,
    repo: "https://github.com/Jhonara",
    accent: "from-violet-400/35 via-cyan-500/10",
    preview: "previewJotar",
  },
];

  const [selected, setSelected] = useState<Project | null>(null);
  const openExternal = (url?: string) => { if (url) window.open(url, "_blank", "noopener,noreferrer"); };

  return <div className="text-white"><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-sm text-cyan-300">{t("workspaceProjects")}</p><h2 className="mt-1 text-3xl font-bold">{t("projectsExplorer")}</h2></div><span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">{projects.length} {t("repositoriesReady")}</span></div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{projects.map((project, index) => { const Icon = project.icon; return <motion.article key={project.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }} whileHover={{ y: -5 }} className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 transition-colors hover:border-cyan-400/40"><button onClick={() => setSelected(project)} className={`relative flex h-32 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${project.accent} text-white/70`}><div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:22px_22px]" /><Icon size={48} className="relative text-cyan-100 transition-transform group-hover:scale-125" /><span className="absolute bottom-2 left-3 font-mono text-[10px] text-white/50">preview://{project.name.toLowerCase().replaceAll(" ", "-")}</span></button><div className="p-5"><div className="flex items-start justify-between"><h3 className="text-lg font-bold">{project.name}</h3><FolderGit2 size={18} className="text-white/30 group-hover:text-cyan-300" /></div><p className="mt-2 min-h-12 text-sm leading-6 text-white/60">{t(project.description)}</p><div className="mt-4 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-md bg-white/7 px-2 py-1 text-xs text-cyan-200">{tag}</span>)}</div><div className="mt-5 flex items-center gap-4 text-xs"><button onClick={() => setSelected(project)} className="text-cyan-300 hover:text-cyan-100">{t("openExplorer")}</button><button onClick={() => openExternal(project.demo)} disabled={!project.demo} className="inline-flex items-center gap-1 text-violet-300 hover:text-violet-100 disabled:cursor-not-allowed disabled:opacity-30"><ExternalLink size={14} /> {t("fullScreen")}</button></div></div></motion.article>; })}</div>
    <AnimatePresence>{selected && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"><motion.div initial={{ y: 30, scale: .95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: .96 }} className="w-full max-w-3xl overflow-hidden rounded-2xl border border-cyan-300/30 bg-[#0B1220] shadow-[0_0_80px_rgba(34,211,238,.2)]"><div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3"><div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-amber-300" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div><span className="font-mono text-xs text-white/60">browser://{selected.name.toLowerCase().replaceAll(" ", "-")}</span><button onClick={() => setSelected(null)} className="text-white/60 hover:text-white"><X size={18} /></button></div><div className={`relative flex min-h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${selected.accent} p-8`}><div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:28px_28px]" /><div className="relative text-center"><selected.icon size={62} className="mx-auto text-cyan-100" /><p className="mt-4 font-mono text-cyan-100">{t(selected.preview)}</p></div></div><div className="flex flex-wrap items-center justify-between gap-3 p-5"><div><h3 className="text-xl font-bold">{selected.name}</h3><p className="mt-1 text-sm text-white/55">{t("previewOpened")}</p></div><div className="flex gap-2"><button onClick={() => openExternal(selected.repo)} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-sm text-white/70 hover:border-cyan-300"><FolderGit2 size={15} /> {t("code")}</button><button onClick={() => openExternal(selected.demo)} disabled={!selected.demo} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 disabled:opacity-30"><ExternalLink size={15} /> {t("viewLarge")}</button></div></div></motion.div></motion.div>}</AnimatePresence>
  </div>;
};

export default ProjectsApp;
