import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

const stars = Array.from({ length: 30 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  top: `${(index * 61) % 100}%`,
  delay: (index % 7) * 0.2,
}));

const DesktopBackground = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;
    const context = gsap.context(() => {
      gsap.to(".ambient-orb", { rotation: 360, duration: 55, repeat: -1, ease: "none" });
      gsap.to(".ambient-orb-inner", { rotation: -360, duration: 38, repeat: -1, ease: "none" });
      gsap.to(".scene-star", { opacity: 0.15, scale: 0.55, duration: 1.4, stagger: { each: 0.16, repeat: -1, yoyo: true }, ease: "sine.inOut" });
      gsap.to(".signal-line", { strokeDashoffset: -400, duration: 4, repeat: -1, ease: "none", stagger: 0.7 });
    }, sceneRef);
    return () => context.revert();
  }, []);

  return (
    <div ref={sceneRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#050816]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(56,189,248,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,.08)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]" />
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-violet-300/20 to-transparent" />

      <motion.div animate={{ x: [-50, 55, -50], y: [-35, 45, -35], scale: [1, 1.15, 1] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="ambient-orb absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 bg-cyan-500/10 blur-[110px]" />
      <div className="ambient-orb-inner absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/15" />
      <motion.div animate={{ opacity: [0.08, 0.2, 0.08], scale: [0.9, 1.08, 0.9] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute right-[12%] top-[18%] h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]" />

      {stars.map((star, index) => <span key={index} className="scene-star absolute h-1 w-1 rounded-full bg-cyan-200 shadow-[0_0_10px_#67e8f9]" style={{ left: star.left, top: star.top, opacity: index % 3 === 0 ? 0.7 : 0.35, animationDelay: `${star.delay}s` }} />)}

      <svg className="absolute inset-0 h-full w-full opacity-45" viewBox="0 0 1200 800" preserveAspectRatio="none" aria-hidden="true">
        <path className="signal-line" d="M-20 650 C180 520 260 700 430 560 S720 320 890 450 S1080 610 1220 400" fill="none" stroke="#22d3ee" strokeDasharray="4 18" strokeWidth="1" />
        <path className="signal-line" d="M-20 190 C220 280 350 120 520 230 S840 400 1220 160" fill="none" stroke="#a78bfa" strokeDasharray="3 22" strokeWidth="1" />
      </svg>

      <div className="absolute bottom-28 left-5 font-mono text-[9px] uppercase tracking-[0.35em] text-cyan-200/30 sm:left-10">sector_01 // creative_grid</div>
      <div className="absolute bottom-28 right-5 font-mono text-[9px] uppercase tracking-[0.35em] text-violet-200/30 sm:right-10">signal stable // 100%</div>
    </div>
  );
};

export default DesktopBackground;
