import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Mail, Send, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const channels = [
  { label: "Email", value: "jhonatanstiven.ramirez@gmail.com", href: "mailto:jhonatanstiven.ramirez@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "jhonatan-ru", href: "https://www.linkedin.com/in/jhonatan-ru/", icon: FaLinkedin },
  { label: "GitHub", value: "Jhonara", href: "https://github.com/Jhonara", icon: FaGithub },
];

const ContactApp = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1400);
  };

  return <div className="mx-auto max-w-4xl text-white"><div className="mb-6"><p className="font-mono text-sm text-cyan-300">// establish_connection</p><h2 className="mt-1 text-3xl font-bold">Conversemos</h2><p className="mt-2 text-white/65">Envía una señal al sistema. Si la oportunidad encaja, responderé personalmente.</p></div><div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"><div className="space-y-3">{channels.map(({ label, value, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/5"><Icon className="text-cyan-300" size={22} /><span className="min-w-0"><span className="block font-bold">{label}</span><span className="block truncate text-sm text-white/45 group-hover:text-cyan-200">{value}</span></span><Send size={15} className="ml-auto text-white/25 group-hover:text-cyan-300" /></a>)}<div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5"><div className="flex items-center gap-2 text-violet-200"><Sparkles size={17} /> Response protocol</div><p className="mt-3 text-sm leading-6 text-white/55">Normalmente respondo dentro de 24 horas. Las ideas interesantes reciben prioridad en el canal creativo.</p></div></div><form onSubmit={submit} className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/55 p-5"><AnimatePresence mode="wait">{status === "sent" ? <motion.div key="sent" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-64 place-items-center text-center"><motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 1.1, repeat: 2 }}><CheckCircle2 size={60} className="mx-auto text-emerald-300" /></motion.div><h3 className="mt-4 text-xl font-bold">Mensaje preparado</h3><p className="mt-2 text-sm text-white/55">Tu cliente de correo se abrirá para completar el envío.</p><a href={`mailto:jhonatanstiven.ramirez@gmail.com?subject=Contacto de ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`} className="mt-5 rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-slate-950">Abrir correo</a></motion.div> : <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="mb-5 flex items-center gap-2"><Mail className="text-cyan-300" /><h3 className="font-bold">Nueva transmisión</h3><span className="ml-auto font-mono text-[10px] text-emerald-300">CHANNEL SECURE</span></div><div className="space-y-3"><input required value={name} onChange={(event) => setName(event.target.value)} placeholder="Tu nombre" className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/35 focus:border-cyan-300" /><input required type="email" placeholder="Tu email" className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/35 focus:border-cyan-300" /><textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Cuéntame sobre la oportunidad..." rows={5} className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none transition placeholder:text-white/35 focus:border-cyan-300" /></div><button disabled={status === "sending"} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 font-semibold transition hover:brightness-110 disabled:opacity-60">{status === "sending" ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: .7, repeat: Infinity, ease: "linear" }}><Send size={17} /></motion.span> Transmitting...</> : <><Send size={17} /> Enviar señal</>}</button></motion.div>}</AnimatePresence></form></div></div>;
};

export default ContactApp;
