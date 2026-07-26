import { motion } from "framer-motion";

const DesktopBackground = () => {
  return (
    <>
      <div className="absolute inset-0 bg-[#050816]" />

      <motion.div
        animate={{
          x: [-50, 55, -50],
          y: [-35, 45, -35],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[180px]"
      />

      <motion.div
        animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[12%] top-[18%] h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]"
      />
    </>
  );
};

export default DesktopBackground;
