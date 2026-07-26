import { motion } from "framer-motion";

const DesktopHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="absolute top-12 left-1/2 -translate-x-1/2 text-center"
    >
      <h1 className="text-6xl font-bold text-white">
        JotaR.OS
      </h1>

      <p className="mt-3 text-cyan-400">
        Where code meets creativity
      </p>
    </motion.div>
  );
};

export default DesktopHeader;