import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Cpu, Move, Network } from "lucide-react";
import SkillDetailPanel from "../components/skills/SkillDetailPanel";
import SkillNode, { type SkillFlowNode } from "../components/skills/SkillNode";
import { skillConnections, skillTree, type SkillData } from "../components/skills/skill-tree.data";

const nodeTypes = { skill: SkillNode };

const SkillsApp = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsScanning(false), 1000);
    return () => window.clearTimeout(timer);
  }, []);

  const connectedIds = useMemo(() => {
    if (!hoveredId) return new Set<string>();
    return new Set(skillConnections.filter(([from, to]) => from === hoveredId || to === hoveredId).flat());
  }, [hoveredId]);

  const nodes = useMemo<SkillFlowNode[]>(() => skillTree.map((skill) => ({
    id: skill.id,
    type: "skill",
    position: skill.position,
    data: {
      ...skill,
      active: connectedIds.has(skill.id),
      dimmed: Boolean(hoveredId && !connectedIds.has(skill.id)),
      onHover: setHoveredId,
      onSelect: setSelectedId,
    },
  })), [connectedIds, hoveredId]);

  const edges = useMemo<Edge[]>(() => skillConnections.map(([source, target]) => {
    const related = Boolean(hoveredId && (source === hoveredId || target === hoveredId));
    return {
      id: `${source}-${target}`,
      source,
      target,
      type: "smoothstep",
      animated: related,
      markerEnd: { type: MarkerType.ArrowClosed, width: 14, height: 14 },
      className: related ? "skill-tree-edge skill-tree-edge--active" : "skill-tree-edge",
    };
  }), [hoveredId]);

  const selectedSkill: SkillData | null = selectedId ? skillTree.find((skill) => skill.id === selectedId) ?? null : null;

  return (
    <div className="text-white">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs tracking-[.2em] text-[#13AB91]">// TECH_SKILL_TREE.EXE</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">Árbol de habilidades</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/55">Explora las tecnologías, sus conexiones y las misiones en las que las he utilizado.</p>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em] text-white/45">
          <span className="flex items-center gap-1.5"><Network size={13} className="text-[#E92D88]" /> {skillTree.length} nodos</span>
          <span className="flex items-center gap-1.5"><Move size={13} className="text-[#13AB91]" /> arrastra para explorar</span>
        </div>
      </div>

      <div className="skill-tree-canvas relative h-[min(680px,calc(100vh-210px))] min-h-[500px] overflow-hidden rounded-3xl border border-white/10 bg-[#040a17] shadow-[0_0_48px_rgba(19,171,145,.12)]">
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_25%_15%,rgba(19,171,145,.1),transparent_28%),radial-gradient(circle_at_75%_75%,rgba(233,45,136,.09),transparent_32%)]" />
        {isScanning ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-30 grid place-items-center bg-[#040a17]/96 backdrop-blur-sm">
            <div className="text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.25, repeat: Infinity, ease: "linear" }} className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#13AB91]/45 border-t-[#E92D88] shadow-[0_0_30px_rgba(19,171,145,.26)]"><Cpu className="text-[#13AB91]" size={24} /></motion.div>
              <p className="mt-5 font-mono text-sm tracking-[.22em] text-cyan-50">SCANNING SKILLS<span className="scan-dots">...</span></p>
              <div className="mt-3 h-px w-56 overflow-hidden bg-white/10"><motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: .85, repeat: Infinity, ease: "easeInOut" }} className="h-full w-2/5 bg-gradient-to-r from-transparent via-[#13AB91] to-[#E92D88]" /></div>
            </div>
          </motion.div>
        ) : (
          <ReactFlow<SkillFlowNode>
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            fitViewOptions={{ padding: 0.18, maxZoom: 0.92 }}
            minZoom={0.25}
            maxZoom={1.3}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            onNodeClick={(_, node) => setSelectedId(node.id)}
            proOptions={{ hideAttribution: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(114, 235, 220, .14)" />
            <Controls showInteractive={false} className="!bottom-4 !left-4 !border-white/10 !bg-[#071224]/90 [&>button]:!border-white/10 [&>button]:!bg-transparent [&>button]:!fill-white/65 [&>button:hover]:!bg-white/10" />
          </ReactFlow>
        )}
        {!isScanning && <p className="pointer-events-none absolute bottom-4 right-5 z-10 hidden rounded-full border border-white/10 bg-[#071224]/85 px-3 py-1.5 font-mono text-[10px] text-white/45 md:block">HOVER · ANALIZAR &nbsp; CLICK · ABRIR REGISTRO</p>}
        <SkillDetailPanel skill={selectedSkill} onClose={() => setSelectedId(null)} />
      </div>
    </div>
  );
};

export default SkillsApp;
