import type { Language } from "../../i18n/LanguageContext";
import type { NexoIntent } from "./types";

const normalize = (text: string) => text.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const fallback = (language: Language): NexoIntent => ({
  answer: language === "es"
    ? "Todavía estoy aprendiendo esa parte. Puedo contarte sobre proyectos, Java, tecnologías, experiencia o la terminal."
    : "I'm still learning that part. I can tell you about projects, Java, technologies, experience, or the terminal.",
  mood: "thinking",
});

export const getPortfolioAnswer = (question: string, language: Language): NexoIntent | null => {
  const query = normalize(question);
  const es = language === "es";
  if (query.includes("quien eres") || query.includes("who are you")) return { answer: es ? "Soy Nexo, el compañero de JotaR.OS. Hago que explorar el perfil de Jhonatan se sienta más como descubrir un mundo que leer una hoja de vida." : "I'm Nexo, JotaR.OS's companion. I make exploring Jhonatan's profile feel more like discovering a world than reading a résumé.", mood: "happy" };
  if (query.includes("tecnolog") || query.includes("technolog") || query.includes("stack")) return { answer: es ? "Jhonatan trabaja Full Stack: React y TypeScript en interfaz; Java, Spring Boot y APIs REST en backend; además de SQL, NoSQL, Git y Scrum." : "Jhonatan works Full Stack: React and TypeScript for interfaces; Java, Spring Boot and REST APIs on the backend; plus SQL, NoSQL, Git and Scrum.", mood: "celebrating", open: "skills" };
  if (query.includes("proyecto") || query.includes("project") || query.includes("auditplay")) return { answer: es ? "Hay proyectos en React, automatización y experiencias interactivas. Abrí el explorador para ver Pokedex, Coopcompartir, el bot de WhatsApp y JotaR.OS." : "There are projects in React, automation, and interactive experiences. I opened the explorer so you can see Pokedex, Coopcompartir, the WhatsApp bot, and JotaR.OS.", mood: "celebrating", open: "projects" };
  if (query.includes("trabaj") || query.includes("work") || query.includes("experiencia") || query.includes("experience")) return { answer: es ? "Su recorrido une desarrollo de software, soporte de hardware y operación de sistemas. Cada etapa aportó práctica real para construir soluciones de punta a punta." : "His path combines software development, hardware support and systems operations. Each stage added hands-on experience for building end-to-end solutions.", mood: "thinking", open: "experience" };
  if (query.includes("java") || query.includes("spring")) return { answer: es ? "Java es una de sus fortalezas de backend: servicios con Spring Boot, APIs REST, integración de datos y lógica de negocio sólida." : "Java is one of his backend strengths: Spring Boot services, REST APIs, data integration and solid business logic.", mood: "celebrating", open: "skills" };
  if (query.includes("aprend") || query.includes("learning")) return { answer: es ? "Nexo detecta una curiosidad constante: seguir profundizando en producto Full Stack, arquitectura de servicios y experiencias web que se sientan vivas, como esta." : "Nexo detects constant curiosity: going deeper into Full Stack product work, service architecture, and web experiences that feel alive, like this one.", mood: "thinking" };
  if (query.includes("terminal") || query.includes("help") || query.includes("easter")) return { answer: es ? "Excelente elección. Abrí la terminal: escribe help y el sistema te contará sus comandos disponibles." : "Great choice. I opened the terminal: type help and the system will show you its available commands.", mood: "surprised", open: "terminal" };
  return null;
};

export const getFallbackAnswer = (question: string, language: Language) => getPortfolioAnswer(question, language) ?? fallback(language);

export const getAmbientMessages = (language: Language) => language === "es" ? [
  "¿Ya viste la terminal? Tengo pistas escondidas allí.",
  "Tengo varios Easter Eggs escondidos.",
  "Puedes preguntarme sobre los proyectos de Jhonatan.",
  "¿Quieres conocer su experiencia? Yo te llevo.",
] : [
  "Have you seen the terminal? I hid a few hints there.",
  "I have several Easter Eggs hidden around here.",
  "You can ask me about Jhonatan's projects.",
  "Want to learn about his experience? I can take you there.",
];

export const knowledgeSummary = "Jhonatan Ramírez Useche is a Systems Engineer and Full Stack developer in Cali, Colombia. He uses React, TypeScript, Java, Spring Boot, REST APIs, SQL, NoSQL, Git and Scrum. Portfolio projects include Pokedex Pokémon, Coopcompartir v2, a WhatsApp bot and JotaR.OS. Keep answers concise, warm and in the selected language.";
