import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Folder,
  User,
  Code2,
  Briefcase,
  Mail,
  Terminal,
  FolderArchive,
  Images,
} from "lucide-react";

import WindowManager from "../windows/WindowManager";
import DesktopBackground from "./DesktopBackground";
import DesktopHeader from "./DesktopHeader";
import DesktopClock from "./DesktopClock";
import DesktopIcon from "./DesktopIcon";
import { useDesktopStore } from "../../store/desktop.store";
import CoffeeOverlay from "./CoffeeOverlay";
import { useLanguage } from "../../i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import NexoAssistant from "../nexo/NexoAssistant";
import AchievementNotifications from "../achievements/AchievementNotifications";
import { useAchievementsStore } from "../../store/achievements.store";

const Desktop = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const theme = useDesktopStore((state) => state.theme);
  const windows = useDesktopStore((state) => state.windows);
  const openWindow = useDesktopStore((state) => state.openWindow);
  const unlock = useAchievementsStore((state) => state.unlock);
  const { t } = useLanguage();

  useEffect(() => { unlock("first-visitor"); }, [unlock]);
  useEffect(() => {
    windows.filter((window) => window.opened).forEach((window) => {
      if (window.id === "terminal") unlock("terminal-discovered");
      if (window.id === "projects") unlock("project-explorer");
      if (window.id === "about") unlock("profile-read");
    });
  }, [unlock, windows]);

  return (
    <section
      ref={desktopRef}
      className={`relative h-screen w-screen overflow-hidden ${theme === "matrix" ? "matrix-mode" : theme === "night" ? "night-mode" : "neon-mode"}`}
    >
      <DesktopBackground />

      <DesktopHeader />
      <LanguageSwitcher />
      <aside className="absolute left-4 top-24 z-20 hidden flex-col gap-3 sm:flex">
        <QuickAccess icon={<TrophyIcon />} label="Logros" onClick={() => openWindow({ id: "achievements", title: "Logros" })} />
        <QuickAccess icon={<Images size={21} />} label="Galería" disabled />
        <QuickAccess icon={<Mail size={21} />} label="Correo" disabled />
      </aside>

      <motion.div
        className="absolute bottom-6 left-1/2 z-20 flex w-[min(92vw,600px)] -translate-x-1/2 items-start justify-between gap-2 rounded-3xl border border-white/10 bg-slate-950/55 px-3 py-3 shadow-[0_14px_50px_rgba(0,0,0,.38)] backdrop-blur-2xl sm:px-5"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        <DesktopIcon id="about" icon={<User size={30} />} title={t("about")} />
        <DesktopIcon id="projects" icon={<Folder size={30} />} title={t("projects")} />
        <DesktopIcon id="skills" icon={<Code2 size={30} />} title={t("skills")} />
        <DesktopIcon id="experience" icon={<Briefcase size={30} />} title={t("experience")} />
        <DesktopIcon id="contact" icon={<Mail size={30} />} title={t("contact")} />
        <DesktopIcon id="terminal" icon={<Terminal size={30} />} title={t("terminal")} />
      </motion.div>

      <WindowManager />

      <DesktopClock />
      <CoffeeOverlay />
      <NexoAssistant />
      <AchievementNotifications />
    </section>
  );
};

const TrophyIcon = () => <FolderArchive size={21} />;
const QuickAccess = ({ icon, label, onClick, disabled = false }: { icon: React.ReactNode; label: string; onClick?: () => void; disabled?: boolean }) => <button type="button" onClick={onClick} disabled={disabled} className="group flex w-18 flex-col items-center gap-1.5 text-xs text-white/70 disabled:cursor-default disabled:opacity-45"><span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-slate-950/45 text-cyan-200 shadow-lg backdrop-blur-xl transition group-hover:border-cyan-300/50 group-hover:bg-cyan-400/15">{icon}</span><span>{label}</span>{disabled && <span className="-mt-1 text-[8px] text-white/35">PRÓXIMAMENTE</span>}</button>;

export default Desktop;
