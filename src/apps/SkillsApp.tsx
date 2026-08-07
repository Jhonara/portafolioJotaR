import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { motion } from "framer-motion";
import { Move, Sparkles } from "lucide-react";
import SkillDetailPanel from "../components/skills/SkillDetailPanel";
import SkillNode from "../components/skills/SkillNode";
import { branches, skillById, type SkillData, type TalentBranch } from "../components/skills/skill-tree.data";

type Point = { x: number; y: number };
type TalentNode = SkillData & Point & { branchIndex: number };
type TalentEdge = { id: string; branch: TalentBranch; from: Point; to: Point; index: number };

// El árbol se dibuja en un lienzo virtual y se escala al ancho disponible.
// Así conserva sus proporciones sin necesitar desplazamiento horizontal.
const STAGE = { width: 1500, height: 1800, core: { x: 750, y: 1550 } };
const branchStyle: Record<TalentBranch, { label: string; color: string }> = {
  backend: { label: "BACKEND", color: "#13AB91" },
  tools: { label: "DATA & TOOLS", color: "#f4c95d" },
  frontend: { label: "FRONTEND", color: "#E92D88" },
};

const backendPoints: Point[] = [
  { x: 620, y: 1390 }, // Java
  { x: 520, y: 1260 }, // Spring Boot
  { x: 400, y: 1130 }, // REST
  { x: 290, y: 990 },  // JPA
  { x: 200, y: 840 },  // Maven
  { x: 250, y: 670 },  // PHP
  { x: 380, y: 550 },  // Node
  { x: 320, y: 400 },  // Express
  { x: 250, y: 220 },  // Nest
  { x: 380, y: 80 },   // Laravel
];

const frontendPoints: Point[] = [
  { x: 880, y: 1390 }, // HTML
  { x: 980, y: 1260 }, // CSS
  { x: 1100, y: 1130 }, // JS
  { x: 1210, y: 990 }, // TS
  { x: 1310, y: 840 }, // React
  { x: 1260, y: 670 }, // Vite
  { x: 1160, y: 500 }, // Tailwind
  { x: 1200, y: 360 }, // MUI
  { x: 1340, y: 300 },  // Angular
  { x: 1300, y: 200 },  // Next
  { x: 1170, y: 130 },  // Vue
  { x: 1280, y: 70 }, // Svelte
];
const elevate = (point: Point): Point => point;
const toolPoints: Point[] = [

  { x: 750, y: 1420 }, // SQL

  { x: 680, y: 1300 }, // PostgreSQL
  { x: 820, y: 1280 }, // MySQL

  { x: 610, y: 1210 }, // Mongo
  { x: 890, y: 1210 }, // Git

  { x: 560, y: 1070 }, // GitHub
  { x: 940, y: 1070 }, // Docker

  { x: 610, y: 920 },  // Linux
  { x: 890, y: 920 },  // Postman

  { x: 670, y: 760 },  // Jira
  { x: 830, y: 760 },  // VSCode

  { x: 600, y: 600 },  // IntelliJ
  { x: 890, y: 600 },  // Netlify

  // FUTURAS

  { x: 590, y: 450 }, // Redis
  { x: 710, y: 450 }, // Rabbit
  { x: 830, y: 450 }, // Kafka
  { x: 950, y: 450 }, // Elasticsearch

  { x: 560, y: 300 }, // Grafana
  { x: 690, y: 300 }, // Prometheus
  { x: 840, y: 300 }, // AWS
  { x: 990, y: 300 }, // Kubernetes

  { x: 610, y: 150 }, // Jenkins
  { x: 750, y: 80 },  // Terraform
  { x: 890, y: 150 }, // n8n
];

const pathBetween = (from: Point, to: Point) => {
  const bend = Math.max(55, Math.abs(from.y - to.y) * .52);
  return `M ${from.x} ${from.y} C ${from.x} ${from.y - bend}, ${to.x} ${to.y + bend}, ${to.x} ${to.y}`;
};

const makeTree = (): { nodes: TalentNode[]; edges: TalentEdge[] } => {
  const pointSets: Record<TalentBranch, Point[]> = { backend: backendPoints.map(elevate), frontend: frontendPoints.map(elevate), tools: toolPoints };
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
  const dragRef = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const { nodes, edges } = useMemo(() => makeTree(), []);
  const scale = viewportWidth ? Math.min(1, viewportWidth / STAGE.width) : 1;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const positionTree = () => {
      setViewportWidth(viewport.clientWidth);
      viewport.scrollTop = Math.max(0, STAGE.height * Math.min(1, viewport.clientWidth / STAGE.width) - viewport.clientHeight);
    };
    const frame = window.requestAnimationFrame(positionTree);
    const timer = window.setTimeout(positionTree, 120);
    const observer = new ResizeObserver(positionTree);
    observer.observe(viewport);
    return () => { window.cancelAnimationFrame(frame); window.clearTimeout(timer); observer.disconnect(); };
  }, []);

  const hovered = hoveredId ? nodes.find((node) => node.id === hoveredId) : undefined;
  const activePath = hovered
    ? new Set(branches[hovered.branch].slice(0, hovered.branchIndex + 1).map((skill) => skill.id))
    : new Set<string>();
  const selectedSkill = selectedId ? skillById.get(selectedId) ?? null : null;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, left: 0, top: viewport.scrollTop };
  };
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragRef.current) return;
    viewport.scrollTop = dragRef.current.top - (event.clientY - dragRef.current.y);
  };
  const stopDragging = () => { dragRef.current = null; };

  return <div className="talent-tree-shell relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#030813] shadow-[0_0_55px_rgba(19,171,145,.11)]">
    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_92%,rgba(19,171,145,.11),transparent_27%),radial-gradient(circle_at_10%_42%,rgba(19,171,145,.06),transparent_25%),radial-gradient(circle_at_90%_42%,rgba(233,45,136,.07),transparent_25%)]" />
    <div ref={viewportRef} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={stopDragging} onPointerCancel={stopDragging} className="talent-tree-viewport relative h-full min-h-0 overflow-x-hidden overflow-y-auto">
      <div className="talent-tree-stage relative" style={{ width: "100%", height: STAGE.height * scale }}>
        <div className="relative origin-top-left" style={{ width: STAGE.width, height: STAGE.height, transform: `scale(${scale})` }}>
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

        {(Object.keys(branchStyle) as TalentBranch[]).map((branch) => <span key={branch} className="pointer-events-none absolute font-mono text-xs font-bold tracking-[.3em]" style={{ color: branchStyle[branch].color, left: branch === "backend" ? 100 : branch === "tools" ? 675 : 1210, top: branch === "backend" || branch === "frontend" ? 1375 : 1350 }}>{branchStyle[branch].label}</span>)}

        {nodes.map((node, index) => <SkillNode key={node.id} skill={node} x={node.x} y={node.y} index={index} active={activePath.has(node.id)} dimmed={Boolean(hovered && !activePath.has(node.id))} onHover={setHoveredId} onSelect={setSelectedId} />)}
        </div>
      </div>
    </div>
    <div className="pointer-events-none absolute bottom-4 right-5 z-20 hidden items-center gap-2 rounded-full border border-white/10 bg-[#071224]/90 px-3 py-1.5 font-mono text-[10px] text-white/50 md:flex"><Move size={12} /> DESPLAZA EL ÁRBOL · HOVER PARA ILUMINAR LA RUTA</div>
    <SkillDetailPanel skill={selectedSkill} onClose={() => setSelectedId(null)} />
  </div>;
};

const SkillsApp = () => <div className="flex h-full min-h-0 flex-col text-white">
  <div className="mb-5 shrink-0 flex flex-wrap items-end justify-between gap-4">
    <div><p className="font-mono text-xs tracking-[.2em] text-[#13AB91]">// TALENT_TREE.SYS</p><h2 className="mt-1 text-3xl font-bold tracking-tight">Árbol de habilidades</h2><p className="mt-2 max-w-2xl text-sm text-white/55">Un mapa de talentos vivo: tres caminos, conexiones únicas y el siguiente nivel todavía por desbloquear.</p></div>
    <p className="font-mono text-[10px] uppercase tracking-[.16em] text-white/45">{skillById.size} talentos · 3 rutas maestras</p>
  </div>
  <TalentTree />
</div>;

export default SkillsApp;
