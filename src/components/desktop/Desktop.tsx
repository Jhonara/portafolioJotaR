import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Folder,
  User,
  Code2,
  Briefcase,
  Mail,
  Terminal,
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

const Desktop = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const theme = useDesktopStore((state) => state.theme);
  const { t } = useLanguage();

  return (
    <section
      ref={desktopRef}
      className={`relative h-screen w-screen overflow-hidden ${theme === "matrix" ? "matrix-mode" : theme === "night" ? "night-mode" : "neon-mode"}`}
    >
      <DesktopBackground />

      <DesktopHeader />
      <LanguageSwitcher />

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
    </section>
  );
};

export default Desktop;
