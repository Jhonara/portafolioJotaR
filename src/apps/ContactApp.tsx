import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, Mail, Send, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "../i18n/LanguageContext";
import emailjs from "@emailjs/browser";

const channels = [
  { label: "Email", value: "jhonatanstiven.ramirez@gmail.com", href: "mailto:jhonatanstiven.ramirez@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "jhonatan-ru", href: "https://www.linkedin.com/in/jhonatan-ru/", icon: FaLinkedin },
  { label: "GitHub", value: "Jhonara", href: "https://github.com/Jhonara", icon: FaGithub },
];

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;

console.log({
  serviceId,
  templateId,
  publicKey,
});

const ContactApp = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle"); const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [subject, setSubject] = useState(""); const [message, setMessage] = useState("");
  //const submit = async (event: FormEvent) => { event.preventDefault(); setStatus("sending"); try { if (!templateId) throw new Error("missing-template"); const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ service_id: serviceId, template_id: templateId, user_id: publicKey, template_params: { from_name: name, from_email: email, reply_to: email, subject, message } }) }); if (!response.ok) throw new Error("emailjs-error"); setStatus("sent"); } catch { setStatus("error"); } };
  const submit = async (event: FormEvent) => { event.preventDefault(); setStatus("sending"); try { await emailjs.send(serviceId, templateId, { from_name: name, from_email: email, reply_to: email, subject, message }, publicKey); setStatus("sent"); } catch (error) { console.error(error); setStatus("error"); } };
  return <div className="mx-auto max-w-4xl text-white"><div className="mb-6"><p className="font-mono text-sm text-cyan-300">// establish_connection</p><h2 className="mt-1 text-3xl font-bold">{t("contactTitle")}</h2><p className="mt-2 text-white/65">{t("contactDescription")}</p></div><div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]"><div className="space-y-3">{channels.map(({ label, value, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/5"><Icon className="text-cyan-300" size={22} /><span className="min-w-0"><span className="block font-bold">{label}</span><span className="block truncate text-sm text-white/45 group-hover:text-cyan-200">{value}</span></span><Send size={15} className="ml-auto text-white/25 group-hover:text-cyan-300" /></a>)}<div className="rounded-2xl border border-violet-400/20 bg-violet-400/5 p-5"><div className="flex items-center gap-2 text-violet-200"><Sparkles size={17} /> {t("responseProtocol")}</div><p className="mt-3 text-sm leading-6 text-white/55">{t("responseProtocolDescription")}</p></div></div><form onSubmit={submit} className="relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/55 p-5"><AnimatePresence mode="wait">{status === "sent" ? <motion.div key="sent" initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} className="grid min-h-64 place-items-center text-center"><CheckCircle2 size={60} className="mx-auto text-emerald-300" /><h3 className="mt-4 text-xl font-bold">{t("messageSent")}</h3><p className="mt-2 text-sm text-white/55">{t("messageSentDescription")}</p><button type="button" onClick={() => { setStatus("idle"); setMessage(""); }} className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-sm">{t("sendAnother")}</button></motion.div> : <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="mb-5 flex items-center gap-2"><Mail className="text-cyan-300" /><h3 className="font-bold">{t("newTransmission")}</h3><span className="ml-auto font-mono text-[10px] text-emerald-300">{t("secureChannel")}</span></div><div className="space-y-3"><input required value={name} onChange={(event) => setName(event.target.value)} placeholder={t("yourName")} className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300" /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t("yourEmail")} className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300" /><input required value={subject} onChange={(event) => setSubject(event.target.value)} placeholder={t("subject")} className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300" /><textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t("opportunityMessage")} rows={5} className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300" /></div>{status === "error" && <div className="mt-3 flex gap-2 rounded-lg border border-amber-300/30 bg-amber-300/10 p-3 text-xs text-amber-100"><AlertTriangle size={16} /> {t("emailError")}</div>}<button disabled={status === "sending"} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-3 font-semibold transition hover:brightness-110 disabled:opacity-60">{status === "sending" ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: .7, repeat: Infinity, ease: "linear" }}><Send size={17} /></motion.span> {t("sending")}</> : <><Send size={17} /> {t("sendSignal")}</>}</button></motion.div>}</AnimatePresence></form></div></div>;
};

export default ContactApp;
