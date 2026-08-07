import type { IconType } from "react-icons";
import { FaAngular, FaCode, FaCss3Alt, FaDocker, FaGitAlt, FaGithub, FaHtml5, FaJava, FaJsSquare, FaLinux, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";
import { SiExpress, SiIntellijidea, SiJira, SiMongodb, SiMui, SiMysql, SiNetlify, SiPostgresql, SiPostman, SiSpringboot, SiTailwindcss, SiTypescript, SiVite } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export type TalentBranch = "backend" | "tools" | "frontend";

export type SkillData = {
  id: string;
  name: string;
  category: "Backend" | "Frontend" | "Data & Tools";
  description: string;
  experience: string;
  level: 1 | 2 | 3 | 4 | 5;
  related: string[];
  projects: string[];
  tools: string[];
  icon: IconType;
  color: string;
  known: boolean;
  branch: TalentBranch;
};

type SkillDefinition = Omit<SkillData, "id" | "related" | "projects" | "tools">;

const slug = (name: string) => name.toLowerCase().replaceAll(".", "").replaceAll(" ", "-");

const buildSkill = (name: string, branch: TalentBranch, icon: IconType, known = true, overrides: Partial<SkillDefinition> = {}): SkillData => {
  const category = branch === "backend" ? "Backend" : branch === "frontend" ? "Frontend" : "Data & Tools";
  const experience = known ? (branch === "tools" ? "2+ años" : "1+ año") : "Próximamente";
  return {
    id: slug(name), name, category, icon, known, branch, experience,
    level: known ? 4 : 1,
    color: branch === "backend" ? "#13AB91" : branch === "frontend" ? "#E92D88" : "#f4c95d",
    description: known ? `${name} forma parte de mi ruta de trabajo como desarrollador Full Stack.` : `${name} está en mi ruta de aprendizaje y aún no forma parte del stack activo.`,
    projects: known ? [branch === "backend" ? "AuditPlay" : branch === "frontend" ? "JotaR.OS" : "Proyectos Full Stack"] : ["En exploración"],
    tools: branch === "backend" ? ["Postman", "Git"] : branch === "frontend" ? ["VS Code", "Git"] : ["Docker", "GitHub"],
    related: [],
    ...overrides,
  };
};

const backend = [
  buildSkill("Java", "backend", FaJava, true, { experience: "3+ años", level: 5, description: "Lenguaje base para servicios robustos y lógica de negocio." }),
  buildSkill("Spring Boot", "backend", SiSpringboot, true, { experience: "3+ años", level: 5, description: "Servicios backend escalables con arquitectura por capas." }),
  buildSkill("REST API", "backend", FaCode, true, { experience: "3+ años", level: 5, description: "Diseño e integración de APIs claras y mantenibles." }),
  buildSkill("JPA", "backend", FaCode, true, { description: "Persistencia y acceso a datos para servicios Java." }),
  buildSkill("Maven", "backend", FaJava, true, {experience: "3+ años", description: "Gestión de dependencias y construcción de proyectos Java." }),
  buildSkill("PHP", "backend", FaPhp, true, {experience: "3+ años", description: "Desarrollo y mantenimiento de soluciones web del lado del servidor." }),
  buildSkill("Node.js", "backend", FaNodeJs, true, { experience: "1+ años", level: 2, description: "Runtime para automatizaciones y servicios JavaScript." }),
  buildSkill("Express", "backend", SiExpress, true, { level: 2, description: "Framework ligero para rutas y APIs en Node.js." }),
  buildSkill("NestJS", "backend", FaNodeJs, false),
  buildSkill("Laravel", "backend", FaPhp, false),
];

const frontend = [
  buildSkill("HTML", "frontend", FaHtml5, true, { experience: "3+ años", level: 5, description: "Estructura semántica para experiencias web accesibles." }),
  buildSkill("CSS", "frontend", FaCss3Alt, true, { experience: "3+ años", level: 4, description: "Estilos responsivos, animaciones y sistemas de interfaz." }),
  buildSkill("JavaScript", "frontend", FaJsSquare, true, { experience: "2+ años", level: 5, description: "Lenguaje central para interfaces y experiencias interactivas." }),
  buildSkill("TypeScript", "frontend", SiTypescript, true, {  level: 3, description: "Tipado para interfaces más seguras y mantenibles." }),
  buildSkill("React", "frontend", FaReact, true, { experience: "2+ años", level: 5, description: "Construcción de interfaces modulares, dinámicas y accesibles." }),
  buildSkill("Vite", "frontend", SiVite, true, { description: "Entorno ágil de desarrollo y compilación web." }),
  buildSkill("Tailwind", "frontend", SiTailwindcss, true, { description: "Sistema de utilidades para interfaces consistentes." }),
  buildSkill("Material UI", "frontend", SiMui, true, { description: "Biblioteca de componentes para productos React." }),
  buildSkill("Angular", "frontend", FaAngular, true, {  level: 3, description: "Framework para aplicaciones web estructuradas." }),
  buildSkill("Next.js", "frontend", FaReact, false),
  buildSkill("Vue", "frontend", FaCode, false),
  buildSkill("Svelte", "frontend", FaCode, false),
];

const tools = [
  buildSkill("SQL", "tools", SiMysql, true, { experience: "2+ años", description: "Consultas y modelado de información relacional." }),
  buildSkill("PostgreSQL", "tools", SiPostgresql, true, { description: "Persistencia relacional sólida para aplicaciones de negocio." }),
  buildSkill("MySQL", "tools", SiMysql, true, { description: "Base de datos relacional para aplicaciones web." }),
  buildSkill("MongoDB", "tools", SiMongodb, true, { description: "Base de datos documental para flujos flexibles." }),
  buildSkill("Git", "tools", FaGitAlt, true, { experience: "3+ años", level: 5, description: "Control de versiones para trabajo seguro e iterativo." }),
  buildSkill("GitHub", "tools", FaGithub, true, { experience: "3+ años", description: "Colaboración, repositorios y entregas de código." }),
  buildSkill("Docker", "tools", FaDocker, true, { description: "Entornos reproducibles para servicios y bases de datos." }),
  buildSkill("Linux", "tools", FaLinux, true, { description: "Operación y diagnóstico de entornos técnicos." }),
  buildSkill("Postman", "tools", SiPostman, true, { description: "Pruebas y documentación de endpoints de API." }),
  buildSkill("Jira", "tools", SiJira, true, { description: "Seguimiento de tareas y trabajo ágil de producto." }),
  buildSkill("VS Code", "tools", VscVscode, true, { experience: "3+ años", level: 5, description: "Editor principal para frontend, Node.js y automatizaciones." }),
  buildSkill("IntelliJ", "tools", SiIntellijidea, true, { description: "Entorno de desarrollo para proyectos Java y Spring." }),
  buildSkill("Netlify", "tools", SiNetlify, true, { description: "Despliegue continuo de aplicaciones web modernas." }),
  buildSkill("Redis", "tools", SiMongodb, false), buildSkill("RabbitMQ", "tools", FaCode, false), buildSkill("Kafka", "tools", FaCode, false), buildSkill("Elasticsearch", "tools", FaCode, false), buildSkill("Grafana", "tools", FaCode, false), buildSkill("Prometheus", "tools", FaCode, false), buildSkill("AWS", "tools", FaCode, false), buildSkill("Kubernetes", "tools", FaCode, false), buildSkill("Jenkins", "tools", FaCode, false), buildSkill("Terraform", "tools", FaCode, false), buildSkill("n8n", "tools", FaNodeJs, false),
];

export const skillTree = [...backend, ...tools, ...frontend];
export const branches: Record<TalentBranch, SkillData[]> = { backend, tools, frontend };
export const skillById = new Map(skillTree.map((skill) => [skill.id, skill]));
