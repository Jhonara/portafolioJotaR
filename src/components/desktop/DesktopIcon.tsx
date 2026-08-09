import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useDesktopStore } from "../../store/desktop.store";

interface Props {
  icon: ReactNode;
  title: string;
  id: string;
}

const DesktopIcon = ({ icon, title, id }: Props) => {
  const { openWindow } = useDesktopStore();
  return (
    <motion.button
    onClick={() =>
        openWindow({
            id,
            title,
        })
    }
      variants={{
        hidden: {
          opacity: 0,
          y: 20,
          scale: .8,
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: .35,
      }}
      whileHover={{
        scale: 1.08,
        y: -3,
      }}
      whileTap={{
        scale: .95,
      }}
      className="group flex min-w-0 flex-1 flex-col items-center gap-1.5 text-white"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-colors group-hover:border-cyan-300/50 group-hover:bg-cyan-400/15 sm:h-14 sm:w-14">
        {icon}
      </div>

      <span className="max-w-full truncate text-xs sm:text-sm">
        {title}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;
