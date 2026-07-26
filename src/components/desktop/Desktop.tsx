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

const Desktop = () => {
  const desktopRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={desktopRef}
      className="relative h-screen w-screen overflow-hidden"
    >
      <DesktopBackground />

      <DesktopHeader />

      <motion.div
        className="absolute left-10 top-40 flex flex-col gap-8"
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
    </section>
  );
};

export default Desktop;
