import { memo, type CSSProperties } from "react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import type { SkillData } from "./skill-tree.data";

export type SkillNodeData = SkillData & { active?: boolean; dimmed?: boolean; onHover: (id: string | null) => void; onSelect: (id: string) => void };
export type SkillFlowNode = Node<SkillNodeData, "skill">;

const SkillNode = ({ data }: NodeProps<SkillFlowNode>) => {
  const Icon = data.icon;
  return <div onMouseEnter={() => data.onHover(data.id)} onMouseLeave={() => data.onHover(null)} onFocus={() => data.onHover(data.id)} onBlur={() => data.onHover(null)}>
    <Handle type="target" position={Position.Left} className="!h-2 !w-2 !border-0 !bg-transparent" />
    <button type="button" onClick={() => data.onSelect(data.id)} className={`skill-tree-node group relative grid h-[5.5rem] w-[5.5rem] place-items-center rounded-[1.4rem] border bg-[#071224]/95 transition duration-300 ${data.active ? "border-[#13AB91] shadow-[0_0_28px_rgba(19,171,145,.55)]" : "border-white/15"} ${data.dimmed ? "opacity-30" : "opacity-100"}`} style={{ "--skill-color": data.color } as CSSProperties} aria-label={`Ver detalles de ${data.name}`}>
      <span className="absolute inset-2 rounded-[1rem] border border-white/5 bg-gradient-to-br from-white/8 to-transparent" />
      <Icon className="relative z-10" size={30} style={{ color: data.color }} />
      <span className="absolute -bottom-6 left-1/2 w-[7.5rem] -translate-x-1/2 truncate text-center font-mono text-[10px] font-medium tracking-wide text-cyan-50/85">{data.name}</span>
      <span className="skill-tree-tooltip pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-50 w-[14.5rem] -translate-x-1/2 rounded-2xl border border-[#13AB91]/30 bg-[#071224]/98 p-3 text-left opacity-0 shadow-[0_14px_42px_rgba(0,0,0,.48)] transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <span className="block text-sm font-semibold text-white">{data.name}</span><span className="mt-1 block text-xs leading-4 text-white/65">{data.description}</span><span className="mt-2 block font-mono text-[10px] uppercase tracking-wider text-[#13AB91]">{data.experience} de experiencia</span><span className="mt-2 block text-[10px] text-white/45">Conecta con: {data.related.slice(0, 3).join(" · ")}</span>
      </span>
    </button>
    <Handle type="source" position={Position.Right} className="!h-2 !w-2 !border-0 !bg-transparent" />
  </div>;
};

export default memo(SkillNode);
