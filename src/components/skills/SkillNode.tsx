import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";
import type { CSSProperties } from "react";
import type { SkillData } from "./skill-tree.data";

type Props = { skill: SkillData; x: number; y: number; index: number; active: boolean; dimmed: boolean; onHover: (id: string | null) => void; onSelect: (id: string) => void };

const SkillNode = ({ skill, x, y, index, active, dimmed, onHover, onSelect }: Props) => {
  const Icon = skill.icon;
  return <motion.button
    type="button"
    initial={{ opacity: 0, scale: 0.2 }}
    animate={{ opacity: dimmed ? 0.22 : 1, scale: 1 }}
    transition={{ delay: .8 + index * .035, type: "spring", stiffness: 260, damping: 18 }}
    whileHover={skill.known ? { scale: 1.16 } : undefined}
    onMouseEnter={() => skill.known && onHover(skill.id)}
    onMouseLeave={() => onHover(null)}
    onFocus={() => skill.known && onHover(skill.id)}
    onBlur={() => onHover(null)}
    onClick={() => onSelect(skill.id)}
    className={`talent-node absolute grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 transition ${skill.known ? "cursor-pointer" : "talent-node--locked cursor-default"} ${active ? "border-[#13AB91] shadow-[0_0_24px_rgba(19,171,145,.95)]" : skill.known ? "border-cyan-100/45 shadow-[0_0_13px_rgba(19,171,145,.35)]" : "border-slate-400/35"}`}
    style={{ left: x, top: y, "--node-color": skill.color } as CSSProperties}
    aria-label={`Ver detalles de ${skill.name}`}
  >
    <span className="absolute inset-[3px] rounded-full border border-white/10 bg-[#071224]" />
    <Icon size={23} className="relative" style={{ color: skill.known ? skill.color : "#718096" }} />
    {!skill.known && <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-slate-400/50 bg-[#071224] text-slate-300"><LockKeyhole size={10} /></span>}
    <span className="pointer-events-none absolute left-1/2 top-[calc(100%+7px)] w-24 -translate-x-1/2 text-center font-mono text-[9px] font-semibold tracking-wide text-white/75">{skill.name}</span>
  </motion.button>;
};

export default SkillNode;
