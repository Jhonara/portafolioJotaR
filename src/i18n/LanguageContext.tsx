import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Language = "es" | "en";
type Dictionary = Record<string, string>;
const dictionaries: Record<Language, Dictionary> = {
  es: {
    about: "Sobre mí", projects: "Proyectos", skills: "Habilidades", experience: "Experiencia", contact: "Contacto", terminal: "Terminal", chooseLanguage: "Elige tu idioma", spanish: "Español", english: "English", secureBoot: "ARRANQUE SEGURO", initializing: "iniciando command deck", online: "EN LÍNEA", champion: "Campeón", challenge: "Retar al campeón", choosePokemon: "Elige tu Pokémon", attack: "Atacar", restart: "Reiniciar", chooseAnother: "Elegir otro Pokémon", send: "Enviar señal", close: "Cerrar",
    profile: "Perfil", timeline: "Línea de tiempo", systemProfile: "Perfil del sistema", technicalConstellation: "Constelación técnica", skillsDescription: "Tecnologías organizadas por misión. Pasa el cursor para activar cada señal.", careerMap: "Mapa de trayectoria", careerDescription: "Selecciona un nodo para explorar cada misión profesional.", projectsExplorer: "Explorador de proyectos", newTransmission: "Nueva transmisión", messageSent: "Señal enviada", chooseRetainer: "Elige tu Pokémon retador",
    systemProfileFile: "system_profile.json",
    availableForWork: "DISPONIBLE PARA TRABAJAR",

    aboutDescription1:
      "Ingeniero de Sistemas y desarrollador Full Stack. Diseño aplicaciones web sólidas de extremo a extremo: interfaces claras en React, servicios con Java y Spring Boot, APIs REST y datos bien modelados.",

    aboutDescription2:
      "Me gusta convertir necesidades reales en productos escalables, mantenibles y bien documentados. Aporto experiencia práctica en despliegues, bases de datos, trabajo ágil y mejora continua.",

    location: "Cali, Colombia",

    verifiedProfile:
      "Perfil verificado · Código, creatividad y aprendizaje continuo.",

    live: "EN VIVO",

    stack: "Stack",
    fullStack: "Full Stack",

    backend: "Backend",
    backendValue: "Java + Spring",

    database: "Datos",
    databaseValue: "SQL + NoSQL",

    workflow: "Flujo",
    workflowValue: "Git + Scrum",

    milestone2015:
      "Primer contacto profesional con la programación de software.",

    milestone2022:
      "Tecnólogo en Análisis y Desarrollo de Sistemas de Información.",

    milestone2024:
      "Ingeniería de Sistemas y evolución hacia desarrollo Full Stack.",

    milestoneNow:
      "Construyendo productos y experiencias digitales con JotaR.OS.",
  },
  en: {
    about: "About me", projects: "Projects", skills: "Skills", experience: "Experience", contact: "Contact", terminal: "Terminal", chooseLanguage: "Choose your language", spanish: "Español", english: "English", secureBoot: "SECURE BOOT", initializing: "initializing command deck", online: "ONLINE", champion: "Champion", challenge: "Challenge champion", choosePokemon: "Choose your Pokémon", attack: "Attack", restart: "Restart", chooseAnother: "Choose another Pokémon", send: "Send signal", close: "Close",
    profile: "Profile", timeline: "Timeline", systemProfile: "System profile", technicalConstellation: "Technical constellation", skillsDescription: "Technologies organized by mission. Hover to activate each signal.", careerMap: "Career map", careerDescription: "Select a node to explore each professional mission.", projectsExplorer: "Project explorer", newTransmission: "New transmission", messageSent: "Signal sent", chooseRetainer: "Choose your challenger Pokémon",
    systemProfileFile: "system_profile.json",

    availableForWork: "AVAILABLE FOR WORK",

    aboutDescription1:
      "Systems Engineer and Full Stack Developer. I build end-to-end web applications using React, Java, Spring Boot, REST APIs, and well-structured databases.",

    aboutDescription2:
      "I enjoy turning real-world needs into scalable, maintainable, and well-documented software. I have practical experience with deployments, databases, agile development, and continuous improvement.",

    location: "Cali, Colombia",

    verifiedProfile:
      "Verified profile · Code, creativity and continuous learning.",

    live: "LIVE",

    stack: "Stack",
    fullStack: "Full Stack",

    backend: "Backend",
    backendValue: "Java + Spring",

    database: "Data",
    databaseValue: "SQL + NoSQL",

    workflow: "Workflow",
    workflowValue: "Git + Scrum",

    milestone2015:
      "First professional contact with software development.",

    milestone2022:
      "Associate Degree in Systems Analysis and Development.",

    milestone2024:
      "Systems Engineering degree and transition into Full Stack development.",

    milestoneNow:
      "Building digital products and experiences with JotaR.OS.",
  },
};

type LanguageContextValue = { language: Language; setLanguage: (language: Language) => void; t: (key: string) => string };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem("jotar-language") as Language) || "es");
  const setLanguage = (next: Language) => { setLanguageState(next); localStorage.setItem("jotar-language", next); document.documentElement.lang = next; };
  const value = useMemo(() => ({ language, setLanguage, t: (key: string) => dictionaries[language][key] ?? key }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};




export const useLanguage = () => { const context = useContext(LanguageContext); if (!context) throw new Error("useLanguage must be used inside LanguageProvider"); return context; };
