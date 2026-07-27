import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Code2, Database, GitBranch, MapPin, Server, ShieldCheck } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";


const stats = [
  { label: "Stack", value: "Full Stack", icon: Code2, progress: 70 },
  { label: "Backend", value: "Java + Spring", icon: Server, progress: 72 },
  { label: "Datos", value: "SQL + NoSQL", icon: Database, progress: 74 },
  { label: "Flujo", value: "Git + Scrum", icon: GitBranch, progress: 86 },
];



const AboutApp = () => {
  const { t } = useLanguage();
  const milestones = [
    { year: "2015", text: t("milestone2015") },
    { year: "2022", text: t("milestone2022") },
    { year: "2024", text: t("milestone2024") },
    { year: "NOW", text: t("milestoneNow") },
  ];
  const [activeTab, setActiveTab] = useState<"profile" | "timeline">("profile");

  return <div className="text-white"><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="font-mono text-sm text-cyan-300">// {t("systemProfileFile")}</p><h2 className="mt-1 text-3xl font-bold">{t("about")}</h2></div><div className="flex rounded-lg border border-white/10 bg-white/5 p-1 text-xs"><button onClick={() => setActiveTab("profile")} className={`rounded-md px-3 py-2 ${activeTab === "profile" ? "bg-cyan-400/15 text-cyan-200" : "text-white/50"}`}>{t("profile")}</button><button onClick={() => setActiveTab("timeline")} className={`rounded-md px-3 py-2 ${activeTab === "timeline" ? "bg-violet-400/15 text-violet-200" : "text-white/50"}`}>{t("timeline")}</button></div></div>
    {activeTab === "profile" ? <div className="grid gap-6 lg:grid-cols-[220px_1fr]"><motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden rounded-2xl border border-cyan-400/25 bg-slate-950 p-5"><img src="/images/trainer-avatar.png" alt="Avatar de Jhonatan" className="relative aspect-square w-full rounded-xl object-cover opacity-90" /><div className="mt-4 flex items-center gap-2 text-xs text-emerald-300"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> {t("availableForWork")}</div><p className="mt-2 font-mono text-xs text-white/45">ID: JRU-DEV-2026</p></motion.div><div><h3 className="text-2xl font-bold">Jhonatan Stiven Ramírez Useche</h3><p className="mt-3 max-w-3xl leading-7 text-white/70">{t("aboutDescription1")}</p><p className="mt-3 max-w-3xl leading-7 text-white/60">{t("aboutDescription2")}</p><p className="mt-4 flex items-center gap-2 text-sm text-violet-300"><MapPin size={16} /> {t("location")} </p><div className="mt-6 grid gap-3 sm:grid-cols-2">{stats.map(({ label, value, icon: Icon, progress }, index) => <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .08 }} className="rounded-xl border border-white/10 bg-white/5 p-3"><div className="flex items-center gap-2"><Icon size={17} className="text-cyan-300" /><span className="text-xs text-white/45">{label}</span><span className="ml-auto font-mono text-xs text-cyan-200">{progress}%</span></div><p className="mt-2 font-medium">{value}</p><div className="mt-2 h-1 overflow-hidden rounded-full bg-black/30"><motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ delay: .2 + index * .08, duration: .8 }} className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" /></div></motion.div>)}</div></div></div> : <div className="relative ml-3 space-y-4 border-l border-cyan-400/25 pl-8">{milestones.map((milestone, index) => <motion.div key={milestone.year} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .1 }} className="relative rounded-xl border border-white/10 bg-white/5 p-5"><span className="absolute -left-[42px] top-5 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#0B1220] bg-cyan-400 text-[9px] font-bold text-slate-950">{index + 1}</span><div className="flex items-center gap-3"><span className="font-mono text-sm text-cyan-300">{milestone.year}</span>{index === milestones.length - 1 && <span className="flex items-center gap-1 text-xs text-emerald-300"><Activity size={13} /> {t("live")}</span>}</div><p className="mt-2 text-white/70">{milestone.text}</p></motion.div>)}</div>}
    <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4 text-sm text-emerald-200"><ShieldCheck size={18} /> {t("verifiedProfile")}</div>
  </div>;

};

export default AboutApp;
