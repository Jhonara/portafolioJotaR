import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { useDesktopStore } from "../store/desktop.store";

const help = "Comandos: help, whoami, about, projects, java, coffee, pokemon, matrix, sudo hire jhonatan, clear.";
const responses: Record<string, string> = {
  whoami: "Jhonatan Ramírez Useche — Ingeniero de Sistemas y Full Stack Developer.",
  java: "☕ Java detectado: Spring Boot power unlocked.",
  coffee: "☕ Compilando energía… listo. +10 productividad.",
  pokemon: "⚡ Pikachu usó Thunderbolt. La Pokédex está disponible en Projects.",
  matrix: "Wake up, Jhonatan… the portfolio has you.",
  "sudo hire jhonatan": "Acceso concedido. Excelente decisión. 🚀",
};

const TerminalApp = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(["JotaR.OS v1.0.0", "Type 'help' to discover the system.", "Status: all creative modules online."]);
  const [matrix, setMatrix] = useState(false);
  const openWindow = useDesktopStore((state) => state.openWindow);

  const runCommand = (event: FormEvent) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    setInput("");
    if (command === "clear") { setOutput([]); return; }
    if (command === "help") { setOutput((lines) => [...lines, help]); return; }
    if (command === "about" || command === "projects") {
      openWindow({ id: command, title: command === "about" ? "About" : "Projects" });
      setOutput((lines) => [...lines, `Opening ${command}.app…`]);
      return;
    }
    if (command === "matrix") setMatrix((active) => !active);
    setOutput((lines) => [...lines, responses[command] ?? `command not found: ${command}. Try 'help'.`]);
  };

  return (
    <div className="relative h-full overflow-hidden bg-[#030a08] p-5 font-mono text-sm text-emerald-300">
      {matrix && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.16 }} className="pointer-events-none absolute inset-0 overflow-hidden break-all text-xs leading-4 text-emerald-300">{Array.from({ length: 900 }, (_, index) => String.fromCharCode(0x30A0 + (index % 96))).join("")}</motion.div>}
      <motion.div animate={{ y: [0, 420, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="pointer-events-none absolute inset-x-0 top-0 h-px bg-emerald-300/30 shadow-[0_0_18px_rgba(110,231,183,.8)]" />
      <div className="relative mb-5 flex items-center justify-between border-b border-emerald-400/15 pb-3 text-xs text-emerald-300/60"><span>guest@jotar-os:~</span><span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />CONNECTED</span></div>
      <div className="relative space-y-2">{output.map((line, index) => <p key={`${line}-${index}`}><span className="mr-2 text-cyan-300">›</span>{line}</p>)}</div>
      <form className="relative mt-4 flex items-center gap-2 text-white" onSubmit={runCommand}><span className="shrink-0 text-cyan-300">guest@jotar-os:~$</span><input autoFocus value={input} onChange={(event) => setInput(event.target.value)} className="min-w-0 flex-1 bg-transparent outline-none" aria-label="Terminal command" /><span className="h-4 w-2 animate-pulse bg-emerald-300" aria-label="cursor parpadeante" /></form>
    </div>
  );
};

export default TerminalApp;
