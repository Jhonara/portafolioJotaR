import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LockKeyhole, Trophy } from "lucide-react";
import { achievements, getLocalizedAchievement } from "../../data/achievements";
import { useAchievementsStore } from "../../store/achievements.store";
import { useLanguage } from "../../i18n/LanguageContext";

const AchievementNotifications = () => {
  const { t, language } = useLanguage();
  const { notices, dismiss } = useAchievementsStore();
  useEffect(() => { const timers = notices.map((notice) => window.setTimeout(() => dismiss(notice.id), 5200)); return () => timers.forEach(window.clearTimeout); }, [dismiss, notices]);
  return <div className="pointer-events-none fixed right-4 top-16 z-[120] flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-3"> <AnimatePresence initial={false}>{notices.map((notice) => { const source = achievements.find((item) => item.id === notice.achievementId); if (!source) return null; const achievement = getLocalizedAchievement(source, language); return <motion.article key={notice.id} initial={{ opacity: 0, x: 80, scale: .94 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 60, scale: .94 }} transition={{ type: "spring", stiffness: 360, damping: 25 }} className="overflow-hidden rounded-2xl border border-amber-300/35 bg-[#0b1220]/95 p-3 shadow-[0_14px_45px_rgba(0,0,0,.5)] backdrop-blur-xl"><div className="flex gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-amber-300/30 bg-amber-300/10 text-amber-200"><Trophy size={22} /></div><div className="min-w-0"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-amber-200">{t("achievementUnlocked")}</p><p className="mt-0.5 font-semibold text-white">{achievement.title}</p><p className="mt-1 text-xs leading-4 text-white/60">{achievement.description}</p></div><LockKeyhole size={14} className="ml-auto text-emerald-300" /></div></motion.article>; })}</AnimatePresence></div>;
};

export default AchievementNotifications;
