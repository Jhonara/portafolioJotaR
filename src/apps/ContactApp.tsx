import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const channels = [
  { label: "Email", value: "jhonatanstiven.ramirez@gmail.com", href: "mailto:jhonatanstiven.ramirez@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "jhonatan-ru", href: "https://www.linkedin.com/in/jhonatan-ru/", icon: FaLinkedin },
  { label: "GitHub", value: "Jhonara", href: "https://github.com/Jhonara", icon: FaGithub },
];

const ContactApp = () => (
  <div className="mx-auto max-w-3xl text-white"><p className="font-mono text-sm text-cyan-300">// establish_connection</p><h2 className="mt-1 text-3xl font-bold">Conversemos</h2><p className="mt-3 text-white/65">¿Tienes una oportunidad, proyecto o idea? Elige el canal que prefieras.</p>
    <div className="mt-7 grid gap-4 sm:grid-cols-3">{channels.map(({ label, value, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/5"><Icon className="text-cyan-300" /><p className="mt-5 font-bold">{label}</p><p className="mt-1 break-all text-sm text-white/50 group-hover:text-cyan-200">{value}</p></a>)}</div>
    <a href="mailto:jhonatanstiven.ramirez@gmail.com?subject=Contacto%20desde%20JotaR.OS" className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-5 py-4 font-semibold transition hover:brightness-110"><Send size={18} /> Redactar un mensaje</a>
  </div>
);

export default ContactApp;
