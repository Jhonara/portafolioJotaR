import { useMemo, useState } from "react";
import {
  Archive,
  ChevronLeft,
  Clock3,
  Inbox,
  Mail,
  MoreHorizontal,
  Paperclip,
  Reply,
  Search,
  Send,
  Star,
  Trash2,
  UserRound,
} from "lucide-react";

type Folder = "inbox" | "starred" | "sent" | "trash";

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  body: string[];
  date: string;
  initials: string;
  accent: string;
  unread?: boolean;
  starred?: boolean;
}

const emails: Email[] = [
  { id: "offer", from: "Recruiter", subject: "Oferta laboral - Full Stack Developer", preview: "Tu experiencia en Java, Spring Boot y React puede aportar mucho...", body: ["Hola Jhonatan,", "Hemos revisado tu perfil y creemos que tu experiencia en Java, Spring Boot y React puede aportar mucho a nuestro equipo.", "Nos gustaría agendar una entrevista.", "Saludos."], date: "Hoy, 10:24", initials: "R", accent: "from-cyan-400 to-blue-500", unread: true, starred: true },
  { id: "interview", from: "Recursos Humanos", subject: "Entrevista técnica", preview: "Tu entrevista quedó programada para el jueves a las 9:00 AM.", body: ["Hola.", "Tu entrevista quedó programada para el jueves a las 9:00 AM.", "Recuerda tener preparado tu entorno de desarrollo.", "¡Mucha suerte!"], date: "Ayer", initials: "RH", accent: "from-violet-400 to-fuchsia-500", unread: true },
  { id: "project", from: "Cliente", subject: "Proyecto finalizado", preview: "El proyecto fue entregado exitosamente y cumplió todas las expectativas.", body: ["Hola Jhonatan,", "Queremos agradecerte por el excelente trabajo realizado.", "El proyecto fue entregado exitosamente y cumplió todas las expectativas.", "Gracias."], date: "28 jul.", initials: "C", accent: "from-emerald-400 to-teal-500", unread: true, starred: true },
  { id: "playtech", from: "Playtech", subject: "Bienvenido al equipo", preview: "Nos complace informarte que has sido seleccionado para el equipo.", body: ["Hola Jhonatan,", "Nos complace informarte que has sido seleccionado para formar parte del equipo de desarrollo.", "Te damos la bienvenida."], date: "24 jul.", initials: "P", accent: "from-amber-400 to-orange-500", unread: true },
  { id: "degree", from: "Universidad", subject: "Ingeniería finalizada", preview: "Has culminado exitosamente tus estudios como Ingeniero de Sistemas.", body: ["Felicitaciones.", "Has culminado exitosamente tus estudios como Ingeniero de Sistemas."], date: "18 jul.", initials: "U", accent: "from-blue-400 to-indigo-500", unread: true },
  { id: "docker", from: "Docker Academy", subject: "Curso completado", preview: "Has completado satisfactoriamente el curso de Docker.", body: ["Hola Jhonatan,", "Has completado satisfactoriamente el curso de Docker.", "¡Sigue aprendiendo!"], date: "12 jul.", initials: "D", accent: "from-sky-400 to-blue-600", unread: true },
  { id: "github", from: "GitHub", subject: "Contribution Streak", preview: "¡Llevas varios días contribuyendo a tus repositorios!", body: ["¡Llevas varios días contribuyendo a tus repositorios!", "Continúa así."], date: "08 jul.", initials: "GH", accent: "from-slate-500 to-slate-700", unread: true, starred: true },
  { id: "portfolio", from: "JotaR Analytics", subject: "Nuevo visitante", preview: "Alguien acaba de visitar tu portafolio desde Colombia.", body: ["Alguien acaba de visitar tu portafolio desde Colombia.", "Tiempo de navegación: 06:14 minutos."], date: "03 jul.", initials: "JA", accent: "from-cyan-400 to-violet-500", unread: true },
  { id: "system", from: "JotaR.OS", subject: "Actualización instalada", preview: "Versión 2.0 · Nueva IA · Nuevos proyectos · Mejor rendimiento.", body: ["Versión 2.0", "✔ Nueva IA", "✔ Nuevos proyectos", "✔ Corrección de errores", "✔ Mejor rendimiento"], date: "30 jun.", initials: "OS", accent: "from-fuchsia-400 to-pink-500" },
  { id: "future", from: "Yo del futuro", subject: "Sigue construyendo.", preview: "Nunca dejes de aprender. Todo el esfuerzo valdrá la pena.", body: ["Nunca dejes de aprender.", "Todo el esfuerzo valdrá la pena."], date: "01 ene.", initials: "JF", accent: "from-rose-400 to-orange-400", starred: true },
];

const folders: { id: Folder; label: string; icon: typeof Inbox }[] = [
  { id: "inbox", label: "Inbox", icon: Inbox },
  { id: "starred", label: "Destacados", icon: Star },
  { id: "sent", label: "Enviados", icon: Send },
  { id: "trash", label: "Papelera", icon: Trash2 },
];

export default function MailApp() {
  const [folder, setFolder] = useState<Folder>("inbox");
  const [selectedId, setSelectedId] = useState(emails[0].id);
  const [query, setQuery] = useState("");
  const [mobileList, setMobileList] = useState(true);
  const selected = emails.find((email) => email.id === selectedId) ?? emails[0];
  const visibleEmails = useMemo(() => emails.filter((email) => (folder === "inbox" || (folder === "starred" && email.starred)) && `${email.from} ${email.subject}`.toLowerCase().includes(query.toLowerCase())), [folder, query]);

  const chooseEmail = (id: string) => { setSelectedId(id); setMobileList(false); };
  const chooseFolder = (id: Folder) => { setFolder(id); setMobileList(true); };

  return <div className="flex h-full min-h-[420px] overflow-hidden rounded-xl border border-white/10 bg-[#07101f] text-slate-100 shadow-inner">
    <aside className="flex w-16 shrink-0 flex-col border-r border-white/10 bg-[#091525] px-2 py-3 sm:w-48 sm:px-3">
      <div className="mb-5 flex items-center gap-2 px-1 text-cyan-200"><span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 text-slate-950"><Mail size={17} /></span><span className="hidden text-sm font-bold sm:block">JotaR Mail</span></div>
      <nav className="space-y-1">{folders.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => chooseFolder(id)} className={`flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-sm transition ${folder === id ? "bg-cyan-400/15 text-cyan-100" : "text-white/55 hover:bg-white/5 hover:text-white"}`}><Icon size={17} className={id === "starred" ? "text-amber-300" : ""} fill={id === "starred" && folder === "starred" ? "currentColor" : "none"} /><span className="hidden sm:block">{label}</span>{id === "inbox" && <span className="ml-auto hidden rounded-full bg-cyan-300/15 px-2 py-0.5 text-[10px] font-bold text-cyan-200 sm:block">8</span>}</button>)}</nav>
      <div className="mt-auto hidden border-t border-white/10 pt-3 text-xs text-white/35 sm:block"><p className="flex items-center gap-2"><UserRound size={14} /> jhonatan@jotar.dev</p><p className="mt-2 pl-5 text-[10px] text-emerald-300">● Conectado</p></div>
    </aside>

    <section className={`flex min-w-0 flex-1 flex-col border-r border-white/10 ${mobileList ? "max-md:flex" : "max-md:hidden"} md:max-w-[42%]`}>
      <div className="border-b border-white/10 p-3"><div className="flex items-center justify-between"><div><h2 className="text-base font-bold">{folder === "inbox" ? "Inbox" : folders.find((item) => item.id === folder)?.label}</h2><p className="text-xs text-white/40">{folder === "inbox" ? "8 sin leer" : `${visibleEmails.length} mensajes`}</p></div><button className="rounded-lg p-2 text-white/45 hover:bg-white/5 hover:text-white"><MoreHorizontal size={18} /></button></div><label className="mt-3 flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white/45 focus-within:border-cyan-300/60"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar correo" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" /></label></div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {folder === "sent" || folder === "trash" ? <EmptyFolder folder={folder} /> : visibleEmails.map((email) => (
          <button key={email.id} onClick={() => chooseEmail(email.id)} className={`group relative flex w-full gap-3 border-b border-white/[.07] px-3 py-3 text-left transition hover:bg-cyan-400/[.07] ${selected.id === email.id ? "bg-cyan-400/[.12]" : ""}`}>
            <span className={`mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br ${email.accent} text-[10px] font-bold text-slate-950`}>{email.initials}</span>
            <span className="min-w-0 flex-1"><span className="flex items-center gap-2"><span className={`truncate text-sm ${email.unread ? "font-bold text-white" : "text-white/70"}`}>{email.from}</span><span className="ml-auto shrink-0 text-[10px] text-white/35">{email.date}</span></span><span className={`mt-0.5 block truncate text-xs ${email.unread ? "font-semibold text-white/85" : "text-white/60"}`}>{email.subject}</span><span className="mt-1 block truncate text-[11px] text-white/40">{email.preview}</span></span>
            {email.starred && <Star size={14} fill="currentColor" className="absolute bottom-3 right-3 text-amber-300/80" />}
          </button>
        ))}
        {visibleEmails.length === 0 && <p className="p-6 text-center text-sm text-white/40">No encontramos correos.</p>}
      </div>
    </section>

    <article className={`min-w-0 flex-1 flex-col ${mobileList ? "max-md:hidden" : "max-md:flex"} md:flex`}>
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3"><button onClick={() => setMobileList(true)} className="mr-2 rounded-lg p-1 text-white/50 md:hidden"><ChevronLeft size={21} /></button><div className="flex gap-1"><ActionButton label="Archivar"><Archive size={16} /></ActionButton><ActionButton label="Eliminar"><Trash2 size={16} /></ActionButton><ActionButton label="Destacar"><Star size={16} /></ActionButton></div><button className="rounded-lg p-2 text-white/50 hover:bg-white/5"><MoreHorizontal size={18} /></button></header>
      <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7"><div className="mx-auto max-w-2xl"><div className="flex items-start justify-between gap-3"><h1 className="text-xl font-bold leading-snug sm:text-2xl">{selected.subject}</h1><Star size={20} fill={selected.starred ? "currentColor" : "none"} className={selected.starred ? "shrink-0 text-amber-300" : "shrink-0 text-white/30"} /></div><div className="mt-6 flex items-center gap-3 border-b border-white/10 pb-5"><span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${selected.accent} text-xs font-bold text-slate-950`}>{selected.initials}</span><div className="min-w-0"><p className="font-semibold">{selected.from}</p><p className="truncate text-xs text-white/45">para jhonatan@jotar.dev</p></div><div className="ml-auto flex items-center gap-2 text-xs text-white/40"><Clock3 size={13} /><span>{selected.date}</span></div></div><div className="space-y-5 py-7 text-sm leading-7 text-white/80">{selected.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="flex flex-wrap gap-2 border-t border-white/10 pt-5"><button className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-cyan-100"><Reply size={14} /> Responder</button><button className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-cyan-300/50 hover:text-cyan-100"><Paperclip size={14} /> Reenviar</button></div></div></div>
    </article>
  </div>;
}

const ActionButton = ({ label, children }: { label: string; children: React.ReactNode }) => <button aria-label={label} className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-cyan-100">{children}</button>;

const EmptyFolder = ({ folder }: { folder: "sent" | "trash" }) => <div className="grid h-full place-items-center p-6 text-center"><div><span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/5 text-white/35">{folder === "sent" ? <Send size={20} /> : <Trash2 size={20} />}</span><p className="mt-3 text-sm font-medium text-white/65">{folder === "sent" ? "Aún no hay correos enviados" : "La papelera está vacía"}</p><p className="mt-1 text-xs text-white/35">Tu bandeja está al día.</p></div></div>;
