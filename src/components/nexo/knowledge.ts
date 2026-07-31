import type { Language } from "../../i18n/LanguageContext";
import type { NexoIntent, NexoMessage } from "./types";

type Topic = "greeting" | "identity" | "technologies" | "projects" | "experience" | "education" | "contact" | "easterEggs" | "nexo" | "farewell";

export const portfolioKnowledge = {
  person: { name: "Jhonatan Ramírez Useche", role: "Ingeniero de Sistemas y desarrollador Full Stack", location: "Cali, Colombia" },
  technologies: { frontend: ["React", "TypeScript"], backend: ["Java", "Spring Boot", "APIs REST"], data: ["SQL", "NoSQL"], workflow: ["Git", "Scrum"] },
  projects: ["Pokedex Pokémon", "Coopcompartir v2", "Bot de WhatsApp", "JotaR.OS"],
  experience: ["Desarrollo de software en Playtechnologies", "Soporte de hardware, POS, redes y Linux", "Auxiliar de sistemas en Zagacol"],
  education: ["Tecnólogo en Análisis y Desarrollo de Sistemas de Información", "Ingeniería de Sistemas"],
  contact: { email: "jhonatanstiven.ramirez@gmail.com", linkedin: "linkedin.com/in/jhonatan-ru", github: "github.com/Jhonara" },
  easterEggs: ["la terminal responde al comando help", "hay modos matrix, night y neon", "también hay una liga Pokémon escondida"],
} as const;

const normalize = (text: string) => text.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const choose = <T,>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];
const join = (items: readonly string[]) => items.join(", ").replace(/, ([^,]*)$/, " y $1");
const opening = (language: Language) => choose(language === "es" ? ["Claro.", "Buena pregunta.", "Con gusto.", "Eso sí lo conozco."] : ["Sure.", "Good question.", "Glad you asked.", "I know that one."]);
const closing = (language: Language) => choose(language === "es" ? ["", " Si quieres, te llevo a esa sección.", " Puedo mostrarte más desde el sistema."] : ["", " I can take you to that section.", " I can show you more in the system."]);

const detectTopic = (question: string, history: NexoMessage[]): Topic | null => {
  const query = normalize(question);
  const rules: [Topic, string[]][] = [
    ["greeting", ["hola", "buenas", "hello", "hi"]], ["farewell", ["adios", "chao", "hasta luego", "bye"]],
    ["identity", ["quien eres", "quien es jhonatan", "who are you", "sobre ti"]], ["technologies", ["tecnolog", "stack", "java", "spring", "react", "favorita", "favorite"]],
    ["projects", ["proyecto", "project", "auditplay"]], ["experience", ["experiencia", "trabaj", "work", "playtechnologies", "zagacol"]],
    ["education", ["estudi", "educacion", "universidad", "titulo", "degree"]], ["contact", ["contact", "correo", "email", "linkedin", "github", "redes"]],
    ["easterEggs", ["easter", "secreto", "oculto", "terminal", "help", "matrix"]], ["nexo", ["nexo", "mascota", "asistente"]],
  ];
  const found = rules.find(([, keywords]) => keywords.some((keyword) => query.includes(keyword)))?.[0];
  if (found) return found;
  if (/(cual|cuál|favorita|favorite|esa|eso)/.test(query)) return detectTopic(history.filter((message) => message.role === "user").slice(-1)[0]?.text ?? "", []);
  return null;
};

const localAnswer = (topic: Topic, language: Language): NexoIntent => {
  const es = language === "es"; const p = portfolioKnowledge;
  const reply = (text: string, mood: NexoIntent["mood"], open?: NexoIntent["open"]): NexoIntent => ({ answer: `${opening(language)} ${text}${closing(language)}`, mood, open });
  if (topic === "greeting") return reply(es ? "Soy Nexo, el compañero de JotaR.OS. ¿Qué te gustaría descubrir hoy?" : "I'm Nexo, JotaR.OS's companion. What would you like to discover today?", "waving");
  if (topic === "identity") return reply(es ? `${p.person.name} es ${p.person.role} en ${p.person.location}. Yo estoy aquí para guiarte por su portafolio.` : `${p.person.name} is a Systems Engineer and Full Stack developer in Cali, Colombia. I'm here to guide you through the portfolio.`, "happy", "about");
  if (topic === "technologies") return reply(es ? `Su stack combina ${join(p.technologies.frontend)} en interfaz; ${join(p.technologies.backend)} en backend; y ${join([...p.technologies.data, ...p.technologies.workflow])} para datos y trabajo en equipo. Java y Spring Boot son una fortaleza especial.` : `His stack combines ${join(p.technologies.frontend)} on the frontend; ${join(p.technologies.backend)} on the backend; plus ${join([...p.technologies.data, ...p.technologies.workflow])}. Java and Spring Boot are particular strengths.`, "celebrating", "skills");
  if (topic === "projects") return reply(es ? `Entre sus proyectos están ${join(p.projects)}. Hay aplicaciones en React, automatización y experiencias interactivas.` : `His projects include ${join(p.projects)}. They cover React apps, automation and interactive experiences.`, "celebrating", "projects");
  if (topic === "experience") return reply(es ? `Su recorrido reúne ${join(p.experience)}. Esa mezcla le permite entender tanto el producto como la operación técnica.` : `His path includes ${join(p.experience)}. That mix helps him understand both product work and technical operations.`, "thinking", "experience");
  if (topic === "education") return reply(es ? `Su formación incluye ${join(p.education)}; es una base que complementa su práctica profesional construyendo software.` : `His education includes ${join(p.education)}; it complements hands-on experience building software.`, "happy", "about");
  if (topic === "contact") return reply(es ? `Puedes escribir a ${p.contact.email}, encontrarlo en LinkedIn como jhonatan-ru o revisar su código en GitHub como Jhonara.` : `You can write to ${p.contact.email}, find him on LinkedIn as jhonatan-ru, or review his code on GitHub as Jhonara.`, "happy", "contact" as NexoIntent["open"]);
  if (topic === "easterEggs") return reply(es ? `Pista desbloqueada: ${choose(p.easterEggs)}. Abro la terminal para que explores.` : `Unlocked hint: ${choose(p.easterEggs)}. I'll open the terminal so you can explore.`, "surprised", "terminal");
  if (topic === "nexo") return reply(es ? "Soy la mascota y guía de JotaR.OS: un compañero para hacer esta experiencia más cercana, no una ventana de chat más." : "I'm JotaR.OS's mascot and guide: a companion that makes this experience feel more personal, not just another chat window.", "happy");
  return reply(es ? "Fue un gusto ayudarte. Aquí seguiré si quieres explorar algo más." : "It was great helping you. I'll be here if you want to explore anything else.", "waving");
};

export const getPortfolioAnswer = (question: string, language: Language, history: NexoMessage[] = []) => {
  const topic = detectTopic(question, history);
  return topic ? localAnswer(topic, language) : null;
};

export const getFallbackAnswer = (question: string, language: Language, history: NexoMessage[] = []) => getPortfolioAnswer(question, language, history) ?? {
  answer: language === "es" ? "Déjame pensar... puedo ayudarte con proyectos, experiencia, tecnologías, estudios, contacto o los Easter Eggs." : "Let me think... I can help with projects, experience, technologies, education, contact, or Easter Eggs.", mood: "thinking" as const,
};

export const getAmbientMessages = (language: Language) => language === "es" ? ["¿Ya viste la terminal? Tengo pistas escondidas allí.", "Tengo varios Easter Eggs escondidos.", "Puedes preguntarme sobre los proyectos de Jhonatan.", "¿Quieres conocer su experiencia? Yo te llevo."] : ["Have you seen the terminal? I hid a few hints there.", "I have several Easter Eggs hidden around here.", "You can ask me about Jhonatan's projects.", "Want to learn about his experience? I can take you there."];

export const knowledgeSummary = JSON.stringify(portfolioKnowledge);
