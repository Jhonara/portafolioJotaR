import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Move, Sparkles } from "lucide-react";
import SkillDetailPanel from "../components/skills/SkillDetailPanel";
import SkillNode from "../components/skills/SkillNode";
import { branches, skillById, type SkillData, type TalentBranch } from "../components/skills/skill-tree.data";

type Point = { x: number; y: number };
type TalentNode = SkillData & Point & { branchIndex: number };
type TalentEdge = { id: string; branch: TalentBranch; from: Point; to: Point; index: number };

const STAGE = { width: 1500, height: 1400, core: { x: 750, y: 1160 } };
const branchStyle: Record<TalentBranch, { label: string; color: string }> = {
  backend: { label: "BACKEND", color: "#13AB91" },
  tools: { label: "DATA & TOOLS", color: "#f4c95d" },
  frontend: { label: "FRONTEND", color: "#E92D88" },
};

const backendPoints: Point[] = [
  { x: 610, y: 1325 }, { x: 470, y: 1220 }, { x: 330, y: 1110 }, { x: 180, y: 985 }, { x: 125, y: 835 },
  { x: 205, y: 680 }, { x: 345, y: 575 }, { x: 485, y: 465 }, { x: 575, y: 310 }, { x: 470, y: 165 },
];
const frontendPoints: Point[] = [
  { x: 890, y: 1325 }, { x: 1030, y: 1220 }, { x: 1170, y: 1110 }, { x: 1320, y: 985 }, { x: 1375, y: 835 }, { x: 1295, y: 680 },
  { x: 1155, y: 575 }, { x: 1015, y: 465 }, { x: 925, y: 310 }, { x: 1030, y: 165 }, { x: 1175, y: 105 }, { x: 1320, y: 70 },
];
const elevate = (point: Point): Point => ({ ...point, y: Math.max(60, point.y - 200) });
const toolPoint = (index: number): Point => ({
  x: 750 + Math.sin(index * 1.65) * (index % 3 === 0 ? 105 : 65),
  y: 1065 - index * 43,
});

const pathBetween = (from: Point, to: Point) => {
  const bend = Math.max(55, Math.abs(from.y - to.y) * .52);
  return `M ${from.x} ${from.y} C ${from.x} ${from.y - bend}, ${to.x} ${to.y + bend}, ${to.x} ${to.y}`;
};

const makeTree = (): { nodes: TalentNode[]; edges: TalentEdge[] } => {
  const pointSets: Record<TalentBranch, Point[]> = { backend: backendPoints.map(elevate), frontend: frontendPoints.map(elevate), tools: branches.tools.map((_, index) => toolPoint(index)) };
  const nodes: TalentNode[] = [];
  const edges: TalentEdge[] = [];
  (Object.keys(branches) as TalentBranch[]).forEach((branch) => {
    let parent = STAGE.core;
    branches[branch].forEach((skill, index) => {
      const point = pointSets[branch][index];
      nodes.push({ ...skill, ...point, branchIndex: index });
      edges.push({ id: `${branch}-${skill.id}`, branch, from: parent, to: point, index });
      parent = point;
    });
  });
  return { nodes, edges };
};

const TalentTree = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { nodes, edges } = useMemo(makeTree, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const positionTree = () => { viewport.scrollLeft = Math.max(0, (STAGE.width - viewport.clientWidth) / 2); viewport.scrollTop = Math.max(0, STAGE.height - viewport.clientHeight); };
    const frame = window.requestAnimationFrame(positionTree);
    const timer = window.setTimeout(positionTree, 120);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer); };
  }, []);

  const hovered = hoveredId ? nodes.find((node) => node.id === hoveredId) : undefined;
  const activePath = useMemo(() => {
    if (!hovered) return new Set<string>();
    return new Set(branches[hovered.branch].slice(0, hovered.branchIndex + 1).map((skill) => skill.id));
  }, [hovered]);
  const selectedSkill = selectedId ? skillById.get(selectedId) ?? null : null;

  return <div className="talent-tree-shell relative overflow-hidden rounded-3xl border border-white/10 bg-[#030813] shadow-[0_0_55px_rgba(19,171,145,.11)]">
    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_92%,rgba(19,171,145,.11),transparent_27%),radial-gradient(circle_at_10%_42%,rgba(19,171,145,.06),transparent_25%),radial-gradient(circle_at_90%_42%,rgba(233,45,136,.07),transparent_25%)]" />
    <div ref={viewportRef} className="talent-tree-viewport relative h-[min(610px,calc(100vh-250px))] min-h-[410px] overflow-auto">
      <div className="talent-tree-stage relative" style={{ width: STAGE.width, height: STAGE.height }}>
        <svg className="pointer-events-none absolute inset-0 overflow-visible" width={STAGE.width} height={STAGE.height} viewBox={`0 0 ${STAGE.width} ${STAGE.height}`} aria-hidden="true">
          {edges.map((edge) => {
            const pathActive = hovered?.branch === edge.branch && edge.index <= hovered.branchIndex;
            return <motion.path key={edge.id} d={pathBetween(edge.from, edge.to)} fill="none" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: pathActive ? 1 : .32 }} transition={{ pathLength: { delay: .25 + edge.index * .06, duration: .55, ease: "easeOut" }, opacity: { duration: .22 } }} stroke={pathActive ? branchStyle[edge.branch].color : "#63748d"} strokeWidth={pathActive ? 3.2 : 1.45} style={{ filter: pathActive ? `drop-shadow(0 0 5px ${branchStyle[edge.branch].color})` : undefined }} />;
          })}
        </svg>

        <motion.div initial={{ opacity: 0, scale: .35 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 170, damping: 17 }} className="talent-core absolute grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#13AB91] bg-[#071224] shadow-[0_0_38px_rgba(19,171,145,.65)]" style={{ left: STAGE.core.x, top: STAGE.core.y }}>
          <span className="absolute inset-2 rounded-full border border-[#13AB91]/30" />
          <Sparkles size={28} className="text-[#13AB91]" />
          <span className="absolute -bottom-9 w-44 text-center font-mono text-xs font-bold tracking-[.17em] text-cyan-50">DEVELOPER CORE</span>
        </motion.div>

        {(Object.keys(branchStyle) as TalentBranch[]).map((branch) => <span key={branch} className="pointer-events-none absolute font-mono text-xs font-bold tracking-[.3em]" style={{ color: branchStyle[branch].color, left: branch === "backend" ? 100 : branch === "tools" ? 675 : 1210, top: branch === "backend" || branch === "frontend" ? 1100 : 995 }}>{branchStyle[branch].label}</span>)}

        {nodes.map((node, index) => <SkillNode key={node.id} skill={node} x={node.x} y={node.y} index={index} active={activePath.has(node.id)} dimmed={Boolean(hovered && !activePath.has(node.id))} onHover={setHoveredId} onSelect={setSelectedId} />)}
      </div>
    </div>
    <div className="pointer-events-none absolute bottom-4 right-5 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-[#071224]/90 px-3 py-1.5 font-mono text-[10px] text-white/50 md:flex"><Move size={12} /> DESPLAZA EL ÁRBOL · HOVER PARA ILUMINAR LA RUTA</div>
    <SkillDetailPanel skill={selectedSkill} onClose={() => setSelectedId(null)} />
  </div>;
};

const SkillsApp = () => <div className="text-white">
  <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
    <div><p className="font-mono text-xs tracking-[.2em] text-[#13AB91]">// TALENT_TREE.SYS</p><h2 className="mt-1 text-3xl font-bold tracking-tight">Árbol de habilidades</h2><p className="mt-2 max-w-2xl text-sm text-white/55">Un mapa de talentos vivo: tres caminos, conexiones únicas y el siguiente nivel todavía por desbloquear.</p></div>
    <p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/45">{skillById.size} talentos · 3 rutas maestras</p>
  </div>
  <TalentTree />
</div>;

export default SkillsApp;
