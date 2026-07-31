export type Achievement = { id: string; title: string; description: string; icon: string; category: "Profesional" | "Académico" | "Tech" | "Gamer" | "Sistema" | "Meta"; baseUnlocked?: boolean; event?: string };

export const achievements: Achievement[] = [
  { id: "first-job", title: "Primer empleo", description: "La primera misión profesional fue completada.", icon: "/achievements/primer-empleo.png", category: "Profesional", baseUnlocked: true },
  { id: "big-project", title: "Proyecto de alto nivel", description: "Participación en soluciones para operación real.", icon: "/achievements/proyecto-grande.png", category: "Profesional", baseUnlocked: true },
  { id: "systems-engineer", title: "Ingeniería de Sistemas", description: "Título profesional desbloqueado.", icon: "/achievements/ingenieria.png", category: "Académico", baseUnlocked: true },
  { id: "spring-boot", title: "Spring Boot online", description: "Servicios y APIs REST listos para producción.", icon: "/achievements/spring-boot.png", category: "Tech", baseUnlocked: true },
  { id: "react", title: "React Mastery", description: "Interfaces modernas y flujos interactivos.", icon: "/achievements/react.png", category: "Tech", baseUnlocked: true },
  { id: "full-stack", title: "Full Stack Developer", description: "Frontend, backend y datos en una sola build.", icon: "/achievements/full-stack.png", category: "Tech", baseUnlocked: true },
  { id: "business-integration", title: "Integración empresarial", description: "Tecnología conectada con necesidades reales.", icon: "/achievements/integracion.png", category: "Profesional", baseUnlocked: true },
  { id: "automation", title: "Automatización activada", description: "Procesos convertidos en soluciones más eficientes.", icon: "/achievements/automatizacion.png", category: "Profesional", baseUnlocked: true },
  { id: "support-hero", title: "Soporte de campo", description: "POS, redes, hardware y usuarios: misión cumplida.", icon: "/achievements/soporte.png", category: "Profesional", baseUnlocked: true },
  { id: "kanto", title: "Campeón de Kanto", description: "Una región clásica conquistada.", icon: "/achievements/kanto.png", category: "Gamer", baseUnlocked: true },
  { id: "johto", title: "Campeón de Johto", description: "La Liga de Johto cayó ante Jhonara.", icon: "/achievements/johto.png", category: "Gamer", baseUnlocked: true },
  { id: "hoenn", title: "Campeón de Hoenn", description: "Otra liga para la colección.", icon: "/achievements/hoenn.png", category: "Gamer", baseUnlocked: true },
  { id: "gamer-hours", title: "1000+ horas de juego", description: "La experiencia también se gana con controles en mano.", icon: "/achievements/gamer.png", category: "Gamer", baseUnlocked: true },
  { id: "css-survivor", title: "Sobrevivir al CSS", description: "Nadie sabe exactamente cómo, pero funciona.", icon: "/achievements/css.png", category: "Sistema", baseUnlocked: true },
  { id: "coffee-code", title: "Café + Código", description: "Combustible oficial del pair programming.", icon: "/achievements/cafe.png", category: "Sistema", baseUnlocked: true },
  { id: "first-visitor", title: "Sistema iniciado", description: "Exploraste JotaR.OS por primera vez.", icon: "/achievements/inicio.png", category: "Sistema", event: "desktop" },
  { id: "terminal-discovered", title: "Terminal desbloqueada", description: "Abriste el canal de comandos del sistema.", icon: "/achievements/terminal.png", category: "Sistema", event: "terminal" },
  { id: "project-explorer", title: "Explorador de proyectos", description: "Visitaste el repositorio de misiones.", icon: "/achievements/proyectos.png", category: "Sistema", event: "projects" },
  { id: "profile-read", title: "Perfil verificado", description: "Consultaste la ficha principal del sistema.", icon: "/achievements/perfil.png", category: "Sistema", event: "about" },
  { id: "nexo-friend", title: "Amigo de Nexo", description: "Conversaste lo suficiente con la mascota del sistema.", icon: "/achievements/nexo.png", category: "Sistema", event: "nexo" },
  { id: "pokemon-challenge", title: "Entrenador retador", description: "Entraste a la arena para desafiar al campeón.", icon: "/achievements/reto-pokemon.png", category: "Gamer", event: "pokemon" },
  { id: "salary-goal", title: "Nivel salarial: 3.5M+", description: "Meta futura en progreso. El sistema confía en el próximo parche.", icon: "/achievements/salario.png", category: "Meta" },
  { id: "microservices", title: "Arquitecto de microservicios", description: "Meta futura: servicios independientes y muy bien orquestados.", icon: "/achievements/microservicios.png", category: "Meta" },
  { id: "senior", title: "Senior Developer", description: "Meta futura: la siguiente evolución profesional.", icon: "/achievements/senior.png", category: "Meta" },
  { id: "national-dex", title: "Pokédex Nacional", description: "Meta futura: completar cada registro conocido.", icon: "/achievements/pokedex.png", category: "Meta" },
];

export const achievementByEvent = (event: string) => achievements.find((achievement) => achievement.event === event);
