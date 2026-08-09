import { useEffect, useRef } from "react";
import { Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import type { NexoMessage } from "./types";

type Props = { open: boolean; messages: NexoMessage[]; input: string; isTyping: boolean; onInput: (value: string) => void; onSubmit: () => void; onClose: () => void; onPrompt: (value: string) => void; prompts: string[]; copy: { title: string; placeholder: string; quick: string; close: string; send: string; typing: string; welcome: string; online: string } };

const NexoChat = ({ open, messages, input, isTyping, onInput, onSubmit, onClose, onPrompt, prompts, copy }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, isTyping]);
  return <AnimatePresence>{open && <motion.section initial={{ opacity: 0, y: 18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .96 }} transition={{ type: "spring", stiffness: 320, damping: 26 }} className="pointer-events-auto mb-3 w-[min(24rem,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-cyan-200/20 bg-[#071224]/95 shadow-[0_24px_90px_rgba(0,0,0,.55)] backdrop-blur-2xl">
    <header className="flex items-center justify-between border-b border-white/10 bg-white/[.03] px-4 py-3"><div className="flex items-center gap-2"><Sparkles size={17} className="text-cyan-300" /><div><p className="text-sm font-semibold text-white">{copy.title}</p><p className="text-[10px] text-emerald-300">● {copy.online}</p></div></div><button type="button" onClick={onClose} aria-label={copy.close} className="rounded-lg p-2 text-white/45 hover:bg-white/10 hover:text-white"><X size={17} /></button></header>
    <div aria-live="polite" className="max-h-64 min-h-30 space-y-3 overflow-y-auto p-4">{messages.length ? messages.map((message) => <p key={message.id} className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-5 ${message.role === "user" ? "ml-auto rounded-tr-sm bg-violet-400/15 text-violet-50" : "rounded-tl-sm bg-cyan-400/10 text-cyan-50"}`}>{message.text}</p>) : <p className="rounded-2xl rounded-tl-sm bg-cyan-400/10 px-3 py-2 text-sm leading-5 text-cyan-50">{copy.welcome}</p>}{isTyping && <div className="flex items-center gap-2 text-xs text-cyan-100/65"><span className="nexo-typing-dots"><i /><i /><i /></span>{copy.typing}</div>}<div ref={bottomRef} /></div>
    {!messages.length && <div className="border-t border-white/8 px-4 py-3"><p className="mb-2 text-[10px] font-mono uppercase tracking-[.16em] text-white/35">{copy.quick}</p><div className="flex flex-wrap gap-1.5">{prompts.slice(0, 4).map((prompt) => <button key={prompt} type="button" onClick={() => onPrompt(prompt)} className="rounded-full border border-white/10 bg-white/[.03] px-2.5 py-1.5 text-left text-[11px] text-cyan-100/75 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">{prompt}</button>)}</div></div>}
    <form onSubmit={(event) => { event.preventDefault(); onSubmit(); }} className="flex gap-2 border-t border-white/8 p-3"><input value={input} onChange={(event) => onInput(event.target.value)} disabled={isTyping} placeholder={copy.placeholder} className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-white/30 disabled:opacity-50" /><button disabled={isTyping} aria-label={copy.send} className="rounded-xl bg-cyan-300 p-2 text-slate-950 transition hover:bg-cyan-200 disabled:opacity-45"><Send size={16} /></button></form>
  </motion.section>}</AnimatePresence>;
};

export default NexoChat;
