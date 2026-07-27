import { Languages } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  return <div className="fixed right-5 top-12 z-30 flex items-center gap-1 rounded-full border border-white/10 bg-slate-950/70 p-1 text-[10px] backdrop-blur-xl"><Languages size={13} className="mx-1 text-cyan-300" /><button onClick={() => setLanguage("es")} className={`rounded-full px-2 py-1 ${language === "es" ? "bg-cyan-400/20 text-cyan-100" : "text-white/40"}`}>ES</button><button onClick={() => setLanguage("en")} className={`rounded-full px-2 py-1 ${language === "en" ? "bg-cyan-400/20 text-cyan-100" : "text-white/40"}`}>EN</button></div>;
};

export default LanguageSwitcher;
