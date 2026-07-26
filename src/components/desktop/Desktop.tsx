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

const Desktop = () => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const theme = useDesktopStore((state) => state.theme);

  return (
    <section
      ref={desktopRef}
      className={`relative h-screen w-screen overflow-hidden ${theme === "matrix" ? "matrix-mode" : theme === "night" ? "night-mode" : "neon-mode"}`}
    >
      <DesktopBackground />

      <DesktopHeader />

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
        <DesktopIcon icon={<User size={30} />} title="About" />
        <DesktopIcon icon={<Folder size={30} />} title="Projects" />
        <DesktopIcon icon={<Code2 size={30} />} title="Skills" />
        <DesktopIcon icon={<Briefcase size={30} />} title="Experience" />
        <DesktopIcon icon={<Mail size={30} />} title="Contact" />
        <DesktopIcon icon={<Terminal size={30} />} title="Terminal" />
      </motion.div>

      <WindowManager />

      <DesktopClock />
      <CoffeeOverlay />
    </section>
  );
};

export default Desktop;
