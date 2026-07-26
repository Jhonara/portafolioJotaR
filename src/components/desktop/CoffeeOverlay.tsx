import { AnimatePresence, motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { useDesktopStore } from "../../store/desktop.store";

const CoffeeOverlay = () => {
  const coffeeMode = useDesktopStore((state) => state.coffeeMode);

  return (
    <AnimatePresence>
      {coffeeMode && <motion.div initial={{ opacity: 0, scale: 0.7, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: -30 }} className="pointer-events-none absolute inset-0 z-30 grid place-items-center overflow-hidden">
        <motion.div animate={{ rotate: [0, -7, 7, 0], y: [0, -12, 0] }} transition={{ duration: 1.2, repeat: 3 }} className="relative rounded-full border border-amber-200/35 bg-[#26130a]/90 p-10 text-center shadow-[0_0_110px_rgba(251,146,60,.45)] backdrop-blur-xl">
          <motion.span animate={{ y: [-8, -45], opacity: [0, 1, 0] }} transition={{ duration: 1.1, repeat: Infinity }} className="absolute left-[42%] -top-2 text-3xl text-amber-100">~</motion.span>
          <Coffee size={76} className="mx-auto text-amber-300" />
          <p className="mt-4 font-mono text-lg font-bold text-amber-100">JAVA BOOST +10</p>
          <p className="mt-1 text-sm text-amber-200/75">Caffeine compiled successfully.</p>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
};

export default CoffeeOverlay;
