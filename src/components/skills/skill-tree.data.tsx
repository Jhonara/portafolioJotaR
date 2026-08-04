import type { IconType } from "react-icons";
import { FaAngular, FaBootstrap, FaCss3Alt, FaDocker, FaGitAlt, FaGithub, FaHtml5, FaJava, FaJsSquare, FaLinux, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";
import { SiExpress, SiIntellijidea, SiJira, SiJson, SiMongodb, SiMui, SiMysql, SiNetlify, SiPostgresql, SiPostman, SiSpringboot, SiTailwindcss, SiTrello, SiTypescript, SiVite, SiXml } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// The icon library does not expose Maven under Simple Icons in this version.
const SiMaven = FaJava;
const SiVisualstudiocode = VscVscode;

export type SkillCategory = "Backend" | "Frontend" | "Data" | "Tooling";
export type SkillData = {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  experience: string;
  level: 1 | 2 | 3 | 4 | 5;
  related: string[];
  projects: string[];
  tools: string[];
  icon: IconType;
  color: string;
  position: { x: number; y: number };
};

const skill = (data: SkillData) => data;

export const skillTree: SkillData[] = [
  skill({ id: "java", name: "Java", category: "Backend", description: "Lenguaje base para servicios robustos y lógica de negocio.", experience: "2+ años", level: 5, related: ["Spring Boot", "Maven", "REST API"], projects: ["AuditPlay", "Chance Bingo"], tools: ["IntelliJ IDEA", "Maven", "Postman"], icon: FaJava, color: "#f59e0b", position: { x: 70, y: 100 } }),
  skill({ id: "maven", name: "Maven", category: "Backend", description: "Gestión de dependencias y ciclos de construcción Java.", experience: "2 años", level: 4, related: ["Java", "Spring Boot"], projects: ["AuditPlay"], tools: ["IntelliJ IDEA", "Git"], icon: SiMaven, color: "#e34f26", position: { x: 310, y: 55 } }),
  skill({ id: "spring", name: "Spring Boot", category: "Backend", description: "Servicios backend escalables con arquitectura por capas.", experience: "2+ años", level: 5, related: ["Java", "REST API", "PostgreSQL"], projects: ["AuditPlay", "Chance Bingo"], tools: ["Maven", "Postman", "Docker"], icon: SiSpringboot, color: "#73c336", position: { x: 310, y: 150 } }),
  skill({ id: "rest", name: "REST API", category: "Backend", description: "Diseño e integración de APIs claras y mantenibles.", experience: "2+ años", level: 5, related: ["Spring Boot", "JSON", "Postman"], projects: ["AuditPlay", "Chance Bingo", "Bot de WhatsApp"], tools: ["Postman", "Docker"], icon: SiJson, color: "#13AB91", position: { x: 560, y: 150 } }),
  skill({ id: "json", name: "JSON", category: "Backend", description: "Intercambio de datos entre clientes, APIs y servicios.", experience: "2+ años", level: 4, related: ["REST API", "JavaScript", "Node.js"], projects: ["Pokedex Pokémon", "Bot de WhatsApp"], tools: ["Postman", "VS Code"], icon: SiJson, color: "#facc15", position: { x: 790, y: 78 } }),
  skill({ id: "xml", name: "XML", category: "Backend", description: "Configuración e intercambio de información en ecosistemas empresariales.", experience: "1+ año", level: 3, related: ["Java", "Maven"], projects: ["AuditPlay"], tools: ["IntelliJ IDEA"], icon: SiXml, color: "#fb923c", position: { x: 790, y: 220 } }),
  skill({ id: "node", name: "Node.js", category: "Backend", description: "Runtime para automatizaciones y servicios JavaScript.", experience: "2 años", level: 4, related: ["Express.js", "MongoDB", "JavaScript"], projects: ["Bot de WhatsApp", "JotaR.OS"], tools: ["VS Code", "Postman"], icon: FaNodeJs, color: "#68a063", position: { x: 70, y: 390 } }),
  skill({ id: "express", name: "Express.js", category: "Backend", description: "Framework ligero para rutas y APIs en Node.js.", experience: "1+ año", level: 3, related: ["Node.js", "MongoDB", "REST API"], projects: ["Bot de WhatsApp"], tools: ["Postman", "VS Code"], icon: SiExpress, color: "#d1d5db", position: { x: 310, y: 390 } }),
  skill({ id: "mongo", name: "MongoDB", category: "Data", description: "Base de datos documental para flujos flexibles.", experience: "1 año", level: 3, related: ["Node.js", "Express.js", "JSON"], projects: ["Bot de WhatsApp"], tools: ["Postman", "Docker"], icon: SiMongodb, color: "#4db33d", position: { x: 560, y: 390 } }),
  skill({ id: "php", name: "PHP", category: "Backend", description: "Desarrollo y mantenimiento de soluciones web del lado del servidor.", experience: "1+ año", level: 3, related: ["MySQL", "HTML", "CSS"], projects: ["Coopcompartir v2"], tools: ["VS Code", "Git"], icon: FaPhp, color: "#a5b4fc", position: { x: 70, y: 520 } }),
  skill({ id: "javascript", name: "JavaScript", category: "Frontend", description: "Lenguaje central para interfaces y experiencias interactivas.", experience: "2+ años", level: 5, related: ["TypeScript", "React", "Node.js"], projects: ["Pokedex Pokémon", "JotaR.OS", "Bot de WhatsApp"], tools: ["VS Code", "Vite"], icon: FaJsSquare, color: "#fde047", position: { x: 70, y: 700 } }),
  skill({ id: "typescript", name: "TypeScript", category: "Frontend", description: "Tipado para interfaces más seguras y mantenibles.", experience: "1+ año", level: 4, related: ["JavaScript", "React", "Vite"], projects: ["JotaR.OS", "Finance Manager"], tools: ["VS Code", "Vite"], icon: SiTypescript, color: "#60a5fa", position: { x: 310, y: 700 } }),
  skill({ id: "react", name: "React", category: "Frontend", description: "Construcción de interfaces modulares, dinámicas y accesibles.", experience: "2+ años", level: 5, related: ["TypeScript", "Vite", "Tailwind"], projects: ["Pokedex Pokémon", "JotaR.OS", "Finance Manager"], tools: ["Vite", "VS Code", "GitHub"], icon: FaReact, color: "#67e8f9", position: { x: 560, y: 700 } }),
  skill({ id: "vite", name: "Vite", category: "Frontend", description: "Entorno ágil de desarrollo y compilación para aplicaciones web.", experience: "1+ año", level: 4, related: ["React", "TypeScript", "Tailwind"], projects: ["JotaR.OS", "Finance Manager"], tools: ["VS Code", "Git"], icon: SiVite, color: "#c084fc", position: { x: 790, y: 700 } }),
  skill({ id: "tailwind", name: "Tailwind", category: "Frontend", description: "Diseño rápido con utilidades y sistemas visuales consistentes.", experience: "1+ año", level: 4, related: ["React", "Vite", "CSS"], projects: ["JotaR.OS", "Finance Manager"], tools: ["VS Code", "Figma"], icon: SiTailwindcss, color: "#22d3ee", position: { x: 1020, y: 700 } }),
  skill({ id: "html", name: "HTML", category: "Frontend", description: "Estructura semántica para experiencias web accesibles.", experience: "3+ años", level: 5, related: ["CSS", "JavaScript", "PHP"], projects: ["Coopcompartir v2", "Pokedex Pokémon"], tools: ["VS Code", "Git"], icon: FaHtml5, color: "#fb923c", position: { x: 70, y: 870 } }),
  skill({ id: "css", name: "CSS", category: "Frontend", description: "Estilos responsivos, animaciones y sistemas de interfaz.", experience: "3+ años", level: 5, related: ["HTML", "Tailwind", "Bootstrap"], projects: ["JotaR.OS", "Coopcompartir v2", "Pokedex Pokémon"], tools: ["VS Code", "Vite"], icon: FaCss3Alt, color: "#60a5fa", position: { x: 310, y: 870 } }),
  skill({ id: "bootstrap", name: "Bootstrap", category: "Frontend", description: "Componentes rápidos para interfaces web adaptables.", experience: "1+ año", level: 4, related: ["HTML", "CSS", "Material UI"], projects: ["Coopcompartir v2"], tools: ["VS Code"], icon: FaBootstrap, color: "#c084fc", position: { x: 560, y: 850 } }),
  skill({ id: "mui", name: "Material UI", category: "Frontend", description: "Biblioteca de componentes para productos React consistentes.", experience: "1 año", level: 3, related: ["React", "Bootstrap", "CSS"], projects: ["Finance Manager"], tools: ["VS Code", "Figma"], icon: SiMui, color: "#38bdf8", position: { x: 790, y: 870 } }),
  skill({ id: "angular", name: "Angular", category: "Frontend", description: "Framework para aplicaciones web estructuradas.", experience: "1 año", level: 3, related: ["JavaScript", "TypeScript", "REST API"], projects: ["Coopcompartir v2"], tools: ["VS Code", "Git"], icon: FaAngular, color: "#fb7185", position: { x: 310, y: 1010 } }),
  skill({ id: "sql", name: "SQL", category: "Data", description: "Consultas y modelado de información relacional.", experience: "2+ años", level: 4, related: ["MySQL", "PostgreSQL", "Spring Boot"], projects: ["AuditPlay", "Chance Bingo"], tools: ["Postman", "Docker"], icon: SiMysql, color: "#facc15", position: { x: 1040, y: 130 } }),
  skill({ id: "postgres", name: "PostgreSQL", category: "Data", description: "Persistencia relacional sólida para aplicaciones de negocio.", experience: "2 años", level: 4, related: ["Spring Boot", "REST API", "SQL"], projects: ["AuditPlay", "Chance Bingo"], tools: ["Docker", "Postman"], icon: SiPostgresql, color: "#93c5fd", position: { x: 1040, y: 290 } }),
  skill({ id: "mysql", name: "MySQL", category: "Data", description: "Base de datos relacional para aplicaciones web y PHP.", experience: "1+ año", level: 3, related: ["SQL", "PHP", "Spring Boot"], projects: ["Coopcompartir v2"], tools: ["Docker", "VS Code"], icon: SiMysql, color: "#38bdf8", position: { x: 790, y: 390 } }),
  skill({ id: "git", name: "Git", category: "Tooling", description: "Control de versiones para trabajo seguro e iterativo.", experience: "3+ años", level: 5, related: ["GitHub", "VS Code", "Docker"], projects: ["JotaR.OS", "AuditPlay", "Pokedex Pokémon"], tools: ["GitHub", "Jira"], icon: FaGitAlt, color: "#fb923c", position: { x: 70, y: 1170 } }),
  skill({ id: "github", name: "GitHub", category: "Tooling", description: "Colaboración, repositorios y entregas de código.", experience: "3+ años", level: 4, related: ["Git", "Netlify", "VS Code"], projects: ["JotaR.OS", "Pokedex Pokémon"], tools: ["Git", "Netlify"], icon: FaGithub, color: "#f8fafc", position: { x: 310, y: 1170 } }),
  skill({ id: "postman", name: "Postman", category: "Tooling", description: "Pruebas y documentación de endpoints de API.", experience: "2 años", level: 4, related: ["REST API", "Spring Boot", "Express.js"], projects: ["AuditPlay", "Bot de WhatsApp"], tools: ["Docker", "JSON"], icon: SiPostman, color: "#fb923c", position: { x: 560, y: 1070 } }),
  skill({ id: "docker", name: "Docker", category: "Tooling", description: "Entornos reproducibles para servicios y bases de datos.", experience: "1+ año", level: 3, related: ["Spring Boot", "PostgreSQL", "Linux"], projects: ["AuditPlay"], tools: ["Linux", "Git"], icon: FaDocker, color: "#60a5fa", position: { x: 790, y: 1070 } }),
  skill({ id: "linux", name: "Linux", category: "Tooling", description: "Administración, diagnóstico y operación de entornos técnicos.", experience: "2 años", level: 4, related: ["Docker", "Node.js", "Git"], projects: ["AuditPlay", "JotaR.OS"], tools: ["Docker", "Git"], icon: FaLinux, color: "#facc15", position: { x: 1040, y: 1070 } }),
  skill({ id: "netlify", name: "Netlify", category: "Tooling", description: "Despliegue continuo de aplicaciones web modernas.", experience: "1 año", level: 3, related: ["React", "GitHub", "Vite"], projects: ["JotaR.OS", "Pokedex Pokémon"], tools: ["GitHub", "Vite"], icon: SiNetlify, color: "#5eead4", position: { x: 560, y: 1200 } }),
  skill({ id: "jira", name: "Jira", category: "Tooling", description: "Seguimiento de tareas y trabajo ágil de producto.", experience: "1+ año", level: 3, related: ["Trello", "Git", "GitHub"], projects: ["AuditPlay"], tools: ["Git", "GitHub"], icon: SiJira, color: "#818cf8", position: { x: 790, y: 1200 } }),
  skill({ id: "trello", name: "Trello", category: "Tooling", description: "Organización visual de tareas, prioridades y entregas.", experience: "1 año", level: 3, related: ["Jira", "GitHub"], projects: ["Coopcompartir v2", "Pokedex Pokémon"], tools: ["GitHub"], icon: SiTrello, color: "#60a5fa", position: { x: 1040, y: 1200 } }),
  skill({ id: "intellij", name: "IntelliJ IDEA", category: "Tooling", description: "Entorno de desarrollo para proyectos Java y Spring.", experience: "2 años", level: 4, related: ["Java", "Spring Boot", "Maven"], projects: ["AuditPlay", "Chance Bingo"], tools: ["Maven", "Git"], icon: SiIntellijidea, color: "#f472b6", position: { x: 70, y: 1300 } }),
  skill({ id: "vscode", name: "VS Code", category: "Tooling", description: "Editor principal para frontend, Node.js y automatizaciones.", experience: "3+ años", level: 5, related: ["React", "Node.js", "Git"], projects: ["JotaR.OS", "Bot de WhatsApp", "Pokedex Pokémon"], tools: ["Git", "Vite"], icon: SiVisualstudiocode, color: "#38bdf8", position: { x: 310, y: 1300 } }),
];

export const skillConnections: Array<[string, string]> = [
  ["java", "maven"], ["java", "spring"], ["maven", "spring"], ["spring", "rest"], ["rest", "json"], ["rest", "xml"], ["rest", "postgres"], ["sql", "postgres"], ["sql", "mysql"], ["spring", "sql"],
  ["node", "express"], ["express", "mongo"], ["node", "json"], ["php", "mysql"], ["php", "html"],
  ["javascript", "typescript"], ["typescript", "react"], ["react", "vite"], ["vite", "tailwind"], ["javascript", "node"], ["javascript", "angular"], ["typescript", "angular"], ["html", "css"], ["css", "bootstrap"], ["css", "tailwind"], ["bootstrap", "mui"], ["react", "mui"],
  ["git", "github"], ["github", "netlify"], ["linux", "docker"], ["docker", "postgres"], ["docker", "mongo"], ["postman", "rest"], ["postman", "express"], ["jira", "trello"], ["intellij", "java"], ["vscode", "react"], ["vscode", "node"],
];
