import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useDesktopStore } from "../../store/desktop.store";
import { useLanguage } from "../../i18n/LanguageContext";
import { askNexoAI } from "./ai";
import NexoCharacter from "./NexoCharacter";
import NexoChat from "./NexoChat";
import { getAmbientMessages, getFallbackAnswer, getPortfolioAnswer } from "./knowledge";
import type { NexoMessage, NexoMood } from "./types";
import { useAchievementsStore } from "../../store/achievements.store";

const welcome = { es: "¡Hola! Soy Nexo. Puedo contarte sobre Jhonatan, mostrarte sus proyectos o ayudarte a navegar por el sistema.", en: "Hi! I'm Nexo. I can tell you about Jhonatan, show you his projects, or help you navigate the system." };
const prompts = { es: ["¿Quién eres?", "¿Qué tecnologías manejas?", "¿Qué proyectos hiciste?", "¿Qué experiencia tienes con Java?"], en: ["Who are you?", "What technologies do you use?", "What projects have you built?", "What Java experience do you have?"] };

const NexoAssistant = () => {
  const { language } = useLanguage();
  const { openWindow } = useDesktopStore();
  const unlock = useAchievementsStore((state) => state.unlock);
  const [open, setOpen] = useState(false); const [bubble, setBubble] = useState(welcome[language]);
  const [mood, setMood] = useState<NexoMood>("idle"); const [messages, setMessages] = useState<NexoMessage[]>([]);
  const [input, setInput] = useState(""); const [isTyping, setIsTyping] = useState(false); const [onLeft, setOnLeft] = useState(false);
  const [lookAt, setLookAt] = useState({ x: 0, y: 0 }); const lastAmbient = useRef(-1); const lastInteraction = useRef(Date.now());
  const copy = useMemo(() => language === "es" ? { title: "Nexo · guía del sistema", placeholder: "Pregúntale algo a Nexo...", quick: "Preguntas rápidas", close: "Cerrar conversación", send: "Enviar", typing: "Nexo está escribiendo...", welcome: welcome.es } : { title: "Nexo · system guide", placeholder: "Ask Nexo something...", quick: "Quick questions", close: "Close conversation", send: "Send", typing: "Nexo is typing...", welcome: welcome.en }, [language]);

  useEffect(() => { setBubble(welcome[language]); setMessages([]); }, [language]);
  useEffect(() => { if (messages.filter((message) => message.role === "user").length >= 3) unlock("nexo-friend"); }, [messages, unlock]);
  useEffect(() => { const track = (event: MouseEvent) => { lastInteraction.current = Date.now(); setMood((current) => current === "sleepy" ? "happy" : current); setLookAt({ x: Math.max(-3, Math.min(3, (event.clientX / window.innerWidth - .5) * 6)), y: Math.max(-2, Math.min(2, (event.clientY / window.innerHeight - .5) * 4)) }); }; window.addEventListener("mousemove", track, { passive: true }); window.addEventListener("keydown", track as unknown as EventListener); return () => { window.removeEventListener("mousemove", track); window.removeEventListener("keydown", track as unknown as EventListener); }; }, []);
  useEffect(() => { if (open) return; const timer = window.setInterval(() => { const items = getAmbientMessages(language); let index = Math.floor(Math.random() * items.length); if (items.length > 1 && index === lastAmbient.current) index = (index + 1) % items.length; lastAmbient.current = index; setBubble(items[index]); setMood(["happy", "thinking", "surprised"][index % 3] as NexoMood); }, 26000); return () => window.clearInterval(timer); }, [language, open]);
  useEffect(() => { if (open) return; const timer = window.setInterval(() => { setOnLeft((current) => !current); }, 84000); return () => window.clearInterval(timer); }, [open]);
  useEffect(() => { if (open || isTyping) return; const timer = window.setInterval(() => { if (Date.now() - lastInteraction.current > 60000) { setMood("sleepy"); return; } const actions: NexoMood[] = ["idle", "happy", "thinking", "waving"]; setMood(actions[Math.floor(Math.random() * actions.length)]); }, 7000); return () => window.clearInterval(timer); }, [open, isTyping]);

  const showWindow = (id: NonNullable<ReturnType<typeof getFallbackAnswer>["open"]>) => { const labels = { about: language === "es" ? "Sobre mí" : "About me", projects: language === "es" ? "Proyectos" : "Projects", skills: language === "es" ? "Habilidades" : "Skills", experience: language === "es" ? "Experiencia" : "Experience", contact: language === "es" ? "Contacto" : "Contact", terminal: "Terminal" }; openWindow({ id, title: labels[id] }); };
  const send = async (question: string) => { const clean = question.trim(); if (!clean || isTyping) return; lastInteraction.current = Date.now(); const userMessage = { id: crypto.randomUUID(), role: "user" as const, text: clean }; const nextMessages = [...messages, userMessage].slice(-20); setMessages(nextMessages); setInput(""); setIsTyping(true); setMood("typing"); const known = getPortfolioAnswer(clean, language, messages); try { const aiAnswer = known ? null : await askNexoAI(nextMessages, language); const result = known ?? (aiAnswer ? { answer: aiAnswer, mood: "happy" as NexoMood } : getFallbackAnswer(clean, language, messages)); if (!known && !aiAnswer) await new Promise((resolve) => window.setTimeout(resolve, 520)); if (result.open) showWindow(result.open); setMood(result.mood); setBubble(result.answer); setMessages((current) => [...current, { id: crypto.randomUUID(), role: "nexo" as const, text: result.answer }].slice(-20)); } catch { const result = getFallbackAnswer(clean, language, messages); setMood(result.mood); setBubble(result.answer); setMessages((current) => [...current, { id: crypto.randomUUID(), role: "nexo" as const, text: result.answer }].slice(-20)); } finally { setIsTyping(false); } };

  return <motion.aside layout animate={{ left: onLeft ? 28 : "auto", right: onLeft ? "auto" : 28 }} transition={{ type: "spring", stiffness: 75, damping: 16 }} className="pointer-events-none absolute bottom-28 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col items-end sm:bottom-7"><AnimatePresence>{!open && <motion.button type="button" onClick={() => setOpen(true)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="pointer-events-auto mb-1 max-w-64 rounded-2xl rounded-br-sm border border-cyan-200/20 bg-slate-950/85 px-4 py-3 text-left text-xs leading-5 text-cyan-50 shadow-[0_12px_36px_rgba(0,0,0,.34)] backdrop-blur-xl hover:border-cyan-200/50"><span className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-cyan-300"><Sparkles size={12} /> Nexo</span>{bubble}</motion.button>}</AnimatePresence><NexoChat open={open} messages={messages} input={input} isTyping={isTyping} onInput={setInput} onSubmit={() => send(input)} onClose={() => setOpen(false)} onPrompt={send} prompts={prompts[language]} copy={copy} /><NexoCharacter mood={mood} lookAt={lookAt} open={open} onClick={() => setOpen((current) => !current)} />{!open && <span className="mt-1 flex items-center gap-1 self-center text-[10px] text-white/45">habla con Nexo <ChevronDown size={12} /></span>}</motion.aside>;
};

export default NexoAssistant;
