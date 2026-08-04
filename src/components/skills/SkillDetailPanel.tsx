import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { SkillData } from "./skill-tree.data";

const SkillDetailPanel = ({ skill, onClose }: { skill: SkillData | null; onClose: () => void }) => <AnimatePresence>{skill && <motion.aside initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 28 }} transition={{ type: "spring", stiffness: 280, damping: 26 }} className="absolute inset-x-3 bottom-3 z-20 rounded-3xl border border-[#13AB91]/30 bg-[#071224]/97 p-5 shadow-[0_18px_60px_rgba(0,0,0,.56)] backdrop-blur-xl sm:inset-x-auto sm:right-3 sm:top-3 sm:bottom-3 sm:w-[19rem]">
  <button type="button" onClick={onClose} className="absolute right-3 top-3 rounded-lg p-2 text-white/45 transition hover:bg-white/10 hover:text-white" aria-label="Cerrar detalle"><X size={16} /></button>
  <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5"><skill.icon size={27} style={{ color: skill.color }} /></div><div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-[#13AB91]">{skill.category} node</p><h3 className="text-xl font-bold text-white">{skill.name}</h3></div></div>
  <p className="mt-5 text-sm leading-6 text-white/68">{skill.description}</p>
  <div className="mt-5"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/45">Dominio</p><div className="mt-2 flex gap-2" aria-label={`Nivel ${skill.level} de 5`}>{Array.from({ length: 5 }, (_, index) => <span key={index} className={`h-5 w-5 rounded-full border ${index < skill.level ? "border-[#13AB91] bg-[#13AB91]/30 shadow-[0_0_12px_rgba(19,171,145,.7)]" : "border-white/15 bg-white/5"}`} />)}</div><p className="mt-2 text-xs text-white/45">{skill.experience} de experiencia</p></div>
  <PanelList title="Proyectos donde la usé" items={skill.projects} /><PanelList title="Herramientas relacionadas" items={skill.tools} /><PanelList title="Conexiones del árbol" items={skill.related} accent />
</motion.aside>}</AnimatePresence>;

const PanelList = ({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) => <div className="mt-5"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/45">{title}</p><div className="mt-2 flex flex-wrap gap-1.5">{items.map((item) => <span key={item} className={`rounded-full border px-2.5 py-1 text-[11px] ${accent ? "border-[#E92D88]/35 bg-[#E92D88]/10 text-pink-100" : "border-white/10 bg-white/5 text-white/70"}`}>{item}</span>)}</div></div>;

export default SkillDetailPanel;
