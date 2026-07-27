import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BriefcaseBusiness, ChevronRight, MapPinned, Sparkles } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

const ExperienceApp = () => {
  const { t } = useLanguage();
  const timeline = [
  {
    year: "2024 — hoy",
    title: "experienceDeveloper",
    place: "Playtechnologies",
    color: "cyan",
    detail: "experienceDeveloperDetail",
    skills: ["Java", "Spring Boot", "React", "PostgreSQL"],
    functions: [
      "experienceDeveloperFunction1",
      "experienceDeveloperFunction2",
      "experienceDeveloperFunction3",
      "experienceDeveloperFunction4",
    ],
  },
  {
    year: "2020 — 2024",
    title: "experienceSupport",
    place: "Playtechnologies",
    color: "violet",
    detail: "experienceSupportDetail",
    skills: ["POS", "Sunmi", "Redes", "Linux"],
    functions: [
      "experienceSupportFunction1",
      "experienceSupportFunction2",
      "experienceSupportFunction3",
      "experienceSupportFunction4",
    ],
  },
  {
    year: "2019 — 2020",
    title: "experienceAssistant",
    place: "Zagacol",
    color: "amber",
    detail: "experienceAssistantDetail",
    skills: ["Hardware", "CCTV", "Telefonía IP"],
    functions: [
      "experienceAssistantFunction1",
      "experienceAssistantFunction2",
      "experienceAssistantFunction3",
      "experienceAssistantFunction4",
    ],
  },
];
  const [selected, setSelected] = useState(0);
  const current = timeline[selected];
  return <div className="text-white"><div className="mb-6"><p className="font-mono text-sm text-cyan-300">// career_map.log</p><h2 className="mt-1 text-3xl font-bold">{t("careerMap")}</h2><p className="mt-2 text-white/60">{t("careerDescription")}</p></div><div className="grid gap-6 lg:grid-cols-[1fr_300px]"><div className="relative space-y-3 border-l border-cyan-400/25 pl-7">{timeline.map((item, index) => <motion.button key={item.title} onClick={() => setSelected(index)} whileHover={{ x: 5 }} className={`relative w-full rounded-xl border p-4 text-left transition ${selected === index ? "border-cyan-300/55 bg-cyan-400/10" : "border-white/10 bg-white/5 hover:border-white/25"}`}><span className={`absolute -left-[39px] top-5 h-5 w-5 rounded-full border-4 border-[#0B1220] ${selected === index ? "bg-cyan-300" : "bg-violet-400"}`} /><div className="flex items-center gap-3"><div className="rounded-lg bg-white/10 p-2 text-cyan-300"><BriefcaseBusiness size={18} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-3"><h3 className="font-bold">{t(item.title)}</h3><span className="font-mono text-xs text-cyan-300">{item.year}</span></div><p className="text-sm text-violet-300">{item.place}</p></div><ChevronRight size={17} className={selected === index ? "text-cyan-300" : "text-white/20"} /></div></motion.button>)}</div><AnimatePresence mode="wait"><motion.aside key={current.title} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="h-fit rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/10 via-slate-950 to-violet-500/10 p-5"><div className="flex items-center justify-between"><BriefcaseBusiness className="text-cyan-300" size={26} /><span className="font-mono text-xs text-emerald-300">NODE_{String(selected + 1).padStart(2, "0")}</span></div><h3 className="mt-6 text-xl font-bold">{t(current.title)}</h3><p className="mt-1 text-violet-300">{current.place} · {current.year}</p><p className="mt-4 text-sm leading-6 text-white/65">{t(current.detail)}</p><p className="mt-5 text-xs font-semibold uppercase tracking-wider text-cyan-200">{t("featuredFunctions")}</p><ul className="mt-3 space-y-2 text-sm text-white/70">{current.functions.map((fn) => <li key={fn} className="flex gap-2"><span className="text-cyan-300">›</span> {t(fn)}</li>)}</ul><div className="mt-5 flex flex-wrap gap-2">{current.skills.map((skill) => <span key={skill} className="rounded-full border border-cyan-300/20 px-2.5 py-1 text-xs text-cyan-100">{skill}</span>)}</div><div className="mt-6 flex items-center gap-2 text-xs text-white/45"><MapPinned size={14} className="text-cyan-300" /> {t("growthTrajectory")}</div></motion.aside></AnimatePresence></div><div className="mt-6 flex items-center gap-2 rounded-xl border border-violet-400/20 bg-violet-40<PASSWORD> p-4 text-sm text-violet-1<PASSWORD>"><Sparkles size={17} />  {t("experienceFooter")}</div></div>;
};

export default ExperienceApp;
