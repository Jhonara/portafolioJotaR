import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useDesktopStore } from "../../store/desktop.store";

interface Props {
  icon: ReactNode;
  title: string;
}

const DesktopIcon = ({ icon, title }: Props) => {
  const { openWindow } = useDesktopStore();
  return (
    <motion.button
    onDoubleClick={() =>
        openWindow({
            id: title.toLowerCase(),
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
      className="flex flex-col items-center gap-2 text-white"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        {icon}
      </div>

      <span className="text-sm">
        {title}
      </span>
    </motion.button>
  );
};

export default DesktopIcon;