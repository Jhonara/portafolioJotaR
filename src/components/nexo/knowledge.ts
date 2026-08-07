import type { Language } from "../../i18n/LanguageContext";
import type { NexoIntent, NexoMessage } from "./types";

type Topic = "greeting" | "identity" | "technologies" | "projects" | "experience" | "education" | "contact" | "easterEggs" | "nexo" | "farewell" | "comfort";

export const portfolioKnowledge = {
  person: { name: "Jhonatan Ramírez Useche", role: "Ingeniero de Sistemas y desarrollador Full Stack", location: "Cali, Colombia" },
  technologies: { frontend: ["React", "TypeScript"], backend: ["Java", "Spring Boot", "APIs REST"], data: ["SQL", "NoSQL"], workflow: ["Git", "Scrum"] },
  projects: ["Pokedex Pokémon","Coopcompartir v2", "Coopcompartir v1", "Proyecto de finanzas", "Bot de WhatsApp", "JotaR.OS", "Mi primer portafolio"],
  experience: ["desarrollo de software en Playtechnologies", "soporte de hardware, POS, redes y Linux", "auxiliar de sistemas en Zagacol"],
  education: ["Tecnología en Análisis y Desarrollo de Sistemas de Información", "Ingeniería de Sistemas"],
  contact: { email: "jhonatanstiven.ramirez@gmail.com", linkedin: "linkedin.com/in/jhonatan-ru", github: "github.com/Jhonara" },
  easterEggs: ["la terminal responde al comando help", "hay modos matrix, night y neon", "también hay una liga Pokémon escondida"],
} as const;

const normalize = (text: string) => text.toLocaleLowerCase("es").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const join = (items: readonly string[]) => items.join(", ").replace(/, ([^,]*)$/, " y $1");
const chooseFresh = (items: readonly string[], history: NexoMessage[]) => {
  const recent = history.filter((message) => message.role === "nexo").slice(-3).map((message) => message.text);
  return items.find((item) => !recent.some((answer) => answer.includes(item))) ?? items[Math.floor(Math.random() * items.length)];
};

const detectTopic = (question: string, history: NexoMessage[]): Topic | null => {
  const query = normalize(question);
  const rules: [Topic, string[]][] = [
    ["greeting", ["hola", "buenas", "hello", "hi"]], ["farewell", ["adios", "chao", "hasta luego", "bye"]],
    ["identity", ["quien eres", "quien es jhonatan", "who are you", "sobre ti"]], ["technologies", ["tecnolog", "stack", "java", "spring", "react", "favorita", "favorite"]],
    ["projects", ["proyecto", "project", "auditplay"]], ["experience", ["experiencia", "trabaj", "work", "playtechnologies", "zagacol"]],
    ["education", ["estudi", "educacion", "universidad", "titulo", "degree"]], ["contact", ["contact", "correo", "email", "linkedin", "github", "redes"]],
    ["easterEggs", ["easter", "secreto", "oculto", "terminal", "help", "matrix"]], ["nexo", ["nexo", "mascota", "asistente"]],
    ["comfort", ["triste", "mal", "cansado", "sad", "tired"]],
  ];
  const found = rules.find(([, keywords]) => keywords.some((keyword) => query.includes(keyword)))?.[0];
  if (found) return found;
  if (/(cual|cuál|favorita|favorite|esa|eso)/.test(query)) return detectTopic(history.filter((message) => message.role === "user").slice(-1)[0]?.text ?? "", []);
  return null;
};

const localAnswer = (topic: Topic, language: Language, history: NexoMessage[]): NexoIntent => {
  const es = language === "es";
  const p = portfolioKnowledge;
  const answer = (texts: readonly string[], mood: NexoIntent["mood"], open?: NexoIntent["open"]): NexoIntent => ({ answer: chooseFresh(texts, history), mood, open });
  if (topic === "greeting") return answer(es ? ["¡Hola! Soy Nexo, el compañero de JotaR.OS. ¿Qué te gustaría conocer primero?", "¡Qué bueno verte por aquí! Puedo guiarte por los proyectos, la experiencia o las habilidades de Jhonatan."] : ["Hi! I'm Nexo, JotaR.OS's companion. What would you like to discover first?", "Nice to see you here! I can guide you through Jhonatan's projects, experience, or skills."], "waving");
  if (topic === "identity") return answer(es ? [`Jhonatan Ramírez Useche es ${p.person.role} y trabaja desde ${p.person.location}. Yo estoy aquí para que puedas conocer su recorrido sin perderte entre ventanas.`, `Jhonatan es ${p.person.role} en ${p.person.location}. Si quieres, abro su perfil y te cuento los detalles importantes.`] : [`${p.person.name} is a Systems Engineer and Full Stack developer based in Cali, Colombia. I'm here to help you explore his work.`, `${p.person.name} is a Systems Engineer and Full Stack developer in Cali, Colombia. I can open his profile if you'd like the full picture.`], "happy", "about");
  if (topic === "technologies") return answer(es ? [`Su base combina ${join(p.technologies.frontend)} para la interfaz, ${join(p.technologies.backend)} para el backend y ${join([...p.technologies.data, ...p.technologies.workflow])} para datos y trabajo en equipo. Java y Spring Boot son puntos fuertes.`, `Trabaja con ${join(p.technologies.frontend)} en el frente y ${join(p.technologies.backend)} detrás de escena. También se mueve con soltura entre bases de datos, Git y Scrum.`] : [`His stack combines ${join(p.technologies.frontend)} for interfaces, ${join(p.technologies.backend)} for backend work, and ${join([...p.technologies.data, ...p.technologies.workflow])} for data and teamwork. Java and Spring Boot are key strengths.`, `He works with ${join(p.technologies.frontend)} on the frontend and ${join(p.technologies.backend)} behind the scenes, alongside databases, Git, and Scrum.`], "celebrating", "skills");
  if (topic === "projects") return answer(es ? [`Puedes encontrar ${join(p.projects)}. Hay proyectos de interfaz, automatización y experiencias interactivas; cada uno muestra una parte distinta de su forma de construir.`, `Entre sus proyectos están ${join(p.projects)}. Si abro la carpeta de proyectos, puedes verlos con calma y elegir por cuál empezar.`] : [`You can find ${join(p.projects)}. They cover interfaces, automation, and interactive experiences, each showing a different side of his work.`, `His projects include ${join(p.projects)}. I can open the projects folder so you can explore them at your own pace.`], "celebrating", "projects");
  if (topic === "experience") return answer(es ? [`Su recorrido mezcla ${join(p.experience)}. Esa combinación le da una mirada práctica: entiende el software y también lo que ocurre cuando llega a operación.`, `Ha pasado por ${join(p.experience)}. Por eso su experiencia no se queda solo en el código; también conoce el soporte y la operación técnica.`] : [`His path combines ${join(p.experience)}. That gives him a practical perspective on both software and what happens once it reaches operations.`, `He has worked in ${join(p.experience)}. His experience goes beyond code into support and technical operations.`], "thinking", "experience");
  if (topic === "education") return answer(es ? [`Su formación incluye ${join(p.education)}. Esa base se complementa con la práctica de construir y mantener productos de software.`, `Cursó ${join(p.education)}. Es una preparación que ha ido reforzando con experiencia real en desarrollo y soporte.`] : [`His education includes ${join(p.education)}. It is a foundation reinforced by hands-on experience building and maintaining software.`, `He studied ${join(p.education)}, then strengthened that background through real development and support work.`], "happy", "about");
  if (topic === "contact") return answer(es ? [`Puedes escribirle a ${p.contact.email}; también está en LinkedIn como jhonatan-ru y en GitHub como Jhonara. Te abro la sección de contacto para que lo tengas a mano.`, `La vía más directa es ${p.contact.email}. Si prefieres revisar su perfil o código, busca jhonatan-ru en LinkedIn y Jhonara en GitHub.`] : [`You can reach him at ${p.contact.email}; he is also on LinkedIn as jhonatan-ru and GitHub as Jhonara. I'll open the contact section for you.`, `The most direct route is ${p.contact.email}. You can also find his profile on LinkedIn as jhonatan-ru and code on GitHub as Jhonara.`], "happy", "contact");
  if (topic === "easterEggs") return answer(es ? [`Pista de Nexo: ${chooseFresh(p.easterEggs, history)}. Abrí la terminal para que puedas probarlo.`, `Te dejo una pista: ${chooseFresh(p.easterEggs, history)}. La terminal es un buen lugar para empezar a explorar.`] : [`Nexo hint: ${chooseFresh(p.easterEggs, history)}. I opened the terminal so you can try it.`, `Here's a clue: ${chooseFresh(p.easterEggs, history)}. The terminal is a good place to start exploring.`], "surprised", "terminal");
  if (topic === "nexo") return answer(es ? ["Soy la mascota y guía de JotaR.OS. Mi trabajo es hacerte compañía y ayudarte a recorrer el portafolio de una forma más cercana.", "Soy Nexo: una pequeña guía del sistema. Puedo conversar contigo, señalarte secciones y dejarte algunas pistas escondidas."] : ["I'm JotaR.OS's mascot and guide. I'm here to keep you company and help you explore the portfolio in a more personal way.", "I'm Nexo, a small system guide. I can chat with you, point you to sections, and leave a few hidden clues."], "happy");
  if (topic === "comfort") return answer(es ? ["Lo siento, suena como un momento pesado. Tómate un respiro; yo me quedo por aquí cuando quieras distraerte o explorar algo.", "Entiendo. No hace falta resolverlo todo ahora mismo; podemos dar una vuelta por el sistema o simplemente quedarnos tranquilos un momento."] : ["I'm sorry, that sounds like a heavy moment. Take a breath; I'll stay nearby whenever you want a distraction or something to explore.", "I understand. You don't have to solve everything right now; we can explore the system or just take a quiet moment."], "sad");
  return answer(es ? ["Me gustó acompañarte. Me quedo cerca por si quieres seguir explorando.", "Aquí estaré cuando quieras volver a recorrer el sistema o hacer otra pregunta."] : ["I enjoyed helping. I'll stay nearby in case you want to keep exploring.", "I'll be here whenever you want to explore more or ask another question."], "waving");
};

export const getPortfolioAnswer = (question: string, language: Language, history: NexoMessage[] = []) => {
  const topic = detectTopic(question, history);
  return topic ? localAnswer(topic, language, history) : null;
};

export const getFallbackAnswer = (question: string, language: Language, history: NexoMessage[] = []) => {
  const known = getPortfolioAnswer(question, language, history);
  if (known) return known;
  return language === "es"
    ? { answer: chooseFresh(["No quiero inventarte una respuesta. Puedo ayudarte con proyectos, experiencia, tecnologías, estudios, contacto o secretos del sistema.", "No tengo esa información todavía, pero sí puedo contarte sobre el trabajo de Jhonatan, sus proyectos y las pistas escondidas de JotaR.OS."], history), mood: "thinking" as const }
    : { answer: chooseFresh(["I don't want to make up an answer. I can help with projects, experience, technologies, education, contact, or system secrets.", "I don't have that detail yet, but I can tell you about Jhonatan's work, projects, and JotaR.OS's hidden clues."], history), mood: "thinking" as const };
};

export const getAmbientMessages = (language: Language) => language === "es"
  ? ["¿Ya exploraste la terminal? Tengo una pista guardada allí.", "Si quieres, te muestro un proyecto que vale la pena mirar.", "Estoy cerca por si quieres conocer el recorrido de Jhonatan.", "Hay pequeños secretos repartidos por el sistema. ¿Te doy una pista?"]
  : ["Have you explored the terminal? I left a hint there.", "If you'd like, I can show you a project worth a look.", "I'm nearby if you want to learn about Jhonatan's path.", "There are small secrets around the system. Want a hint?"];

export const knowledgeSummary = JSON.stringify(portfolioKnowledge);
