import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Typewriter from "../common/Typewriter";
import Desktop from "../desktop/Desktop";

const bootLines = [
    "Initializing JotaR.OS...",
    "Loading Kernel...",
    "Checking Memory...",
    "Loading Graphics...",
    "Loading Developer Profile...",
    "Starting Creativity Engine...",
    "System Ready.",
    "Launching Desktop...",
];

type Phase = "boot" | "transition" | "desktop";

const BootScreen = () => {
    const [currentLine, setCurrentLine] = useState(0);
    const [phase, setPhase] = useState<Phase>("boot");
    const [bootComplete, setBootComplete] = useState(false);

    useEffect(() => {
        if (phase === "transition") {
            const timer = setTimeout(() => {
                setPhase("desktop");
            }, 700);

            return () => clearTimeout(timer);
        }
    }, [phase]);

    return (
        <section className="fixed inset-0 overflow-hidden bg-[#050816]">

            {/* Desktop */}

            <AnimatePresence>
                {phase === "desktop" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <Desktop />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Terminal */}

            <AnimatePresence>

                {phase !== "desktop" && (

                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"

                        animate={
                            phase === "transition"
                                ? {
                                    scale: 0.92,
                                    opacity: 0,
                                    filter: "blur(10px)",
                                }
                                : {}
                        }

                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >

                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-[780px] max-w-[90vw] overflow-hidden rounded-xl border border-emerald-400/30 bg-[#020806] font-mono shadow-[0_0_70px_rgba(16,185,129,.18)]"
                        >
                            <div className="flex items-center justify-between border-b border-emerald-400/20 bg-emerald-400/5 px-4 py-3 text-xs text-emerald-200/70">
                                <div className="flex gap-2"><span className="h-3 w-3 rounded-full bg-red-400/80" /><span className="h-3 w-3 rounded-full bg-amber-300/80" /><span className="h-3 w-3 rounded-full bg-emerald-400" /></div>
                                <span>jotar-os — boot sequence</span>
                                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]" />
                            </div>

                            <div className="relative min-h-80 overflow-hidden p-6 font-mono text-base text-emerald-300">
                                <motion.div
                                    animate={{ y: [-40, 360] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-emerald-300/20"
                                />
                                <p className="mb-5 text-emerald-100/80">JotaR.OS // initializing creative environment</p>

                                {bootLines
                                    .slice(0, bootComplete ? currentLine + 1 : currentLine)
                                    .map((line, index) => (
                                        <div key={index}><span className="mr-2 text-cyan-300">›</span>{line}</div>
                                    ))}

                                {!bootComplete && currentLine < bootLines.length && (
                                    <Typewriter
                                        key={currentLine}
                                        text={bootLines[currentLine]}
                                        speed={40}
                                        onComplete={() => {

                                            if (currentLine === bootLines.length - 1) {

                                                setBootComplete(true);

                                                setTimeout(() => {
                                                    setPhase("transition");
                                                }, 1500);

                                            } else {

                                                setTimeout(() => {
                                                    setCurrentLine((prev) => prev + 1);
                                                }, 250);

                                            }

                                        }}
                                    />
                                )}

                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </section>
    );
};

export default BootScreen;
