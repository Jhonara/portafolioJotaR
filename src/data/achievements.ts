export type Achievement = { id: string; title: string; description: string; icon: string; category: "Profesional" | "Académico" | "Tech" | "Gamer" | "Sistema" | "Meta"; baseUnlocked?: boolean; event?: string };

export const achievements: Achievement[] = [
  { id: "first-job", title: "Primer empleo", description: "La primera misión profesional fue completada.", icon: "/images/logros/primer-empleo.png", category: "Profesional", baseUnlocked: true },
  { id: "big-project", title: "Proyecto de alto nivel", description: "Participación en soluciones para operación real.", icon: "/images/logros/proyecto-grande.png", category: "Profesional", baseUnlocked: true },
  { id: "systems-engineer", title: "Ingeniería de Sistemas", description: "Título profesional desbloqueado.", icon: "/images/logros/ingenieria.png", category: "Académico", baseUnlocked: true },
  { id: "senior", title: "Senior Developer", description: "Meta futura: la siguiente evolución profesional.", icon: "/images/logros/senior.png", category: "Meta" },
  { id: "spring-boot", title: "Spring Boot online", description: "Servicios y APIs REST listos para producción.", icon: "/images/logros/spring-boot.png", category: "Tech", baseUnlocked: true },
  { id: "react", title: "React Mastery", description: "Interfaces modernas y flujos interactivos.", icon: "/images/logros/react.png", category: "Tech", baseUnlocked: true },
  { id: "salary-goal", title: "Nivel salarial: 3.5M+", description: "Meta futura en progreso. El sistema confía en el próximo parche.", icon: "/images/logros/salario.png", category: "Meta" },
  { id: "full-stack", title: "Full Stack Developer", description: "Frontend, backend y datos en una sola build.", icon: "/images/logros/full-stack.png", category: "Tech", baseUnlocked: true },
  { id: "idk", title: "Si funciona, no lo toques", description: "No sabes como funciono, pero funciona.", icon: "/images/logros/idk.png", category: "Profesional", baseUnlocked: true },
  { id: "business-integration", title: "Integración empresarial", description: "Tecnología conectada con necesidades reales.", icon: "/images/logros/integracion.png", category: "Profesional", baseUnlocked: true },
  { id: "work", title: "Activo fijo", description: "Trabaja más de 5 años en una empresa.", icon: "/images/logros/goat.png", category: "Profesional", baseUnlocked: true },
  { id: "automation", title: "Automatización activada", description: "Procesos convertidos en soluciones más eficientes.", icon: "/images/logros/automatizacion.png", category: "Profesional", baseUnlocked: true },
  { id: "capa8", title: "Es un capa 8", description: "El problema está entre la silla y el teclado.", icon: "/images/logros/capa8.png", category: "Profesional", baseUnlocked: true },
  { id: "support-hero", title: "Soporte de campo", description: "POS, redes, hardware y usuarios: misión cumplida.", icon: "/images/logros/soporte.png", category: "Profesional", baseUnlocked: true },
  { id: "profile-read", title: "Perfil verificado", description: "Consultaste la ficha principal del sistema.", icon: "/images/logros/perfil.png", category: "Sistema", event: "about" },
  { id: "kanto", title: "Campeón de Kanto", description: "Una región clásica conquistada.", icon: "/images/logros/kanto.png", category: "Gamer", baseUnlocked: true },
  { id: "johto", title: "Campeón de Johto", description: "La Liga de Johto cayó ante Jhonara.", icon: "/images/logros/johto.png", category: "Gamer", baseUnlocked: true },
  { id: "hoenn", title: "Campeón de Hoenn", description: "Otra liga para la colección.", icon: "/images/logros/hoenn.png", category: "Gamer", baseUnlocked: true },
  { id: "gamer-hours", title: "1000+ horas de juego", description: "La experiencia también se gana con controles en mano.", icon: "/images/logros/gamer.png", category: "Gamer", baseUnlocked: true },
  { id: "css-survivor", title: "Sobrevivir al CSS", description: "Nadie sabe exactamente cómo, pero funciona.", icon: "/images/logros/css.png", category: "Sistema", baseUnlocked: true },
  { id: "coffee-code", title: "Café + Código", description: "Combustible oficial del pair programming.", icon: "/images/logros/cafe.png", category: "Sistema", baseUnlocked: true },
  { id: "first-visitor", title: "Sistema iniciado", description: "Exploraste JotaR.OS por primera vez.", icon: "/images/logros/inicio.png", category: "Sistema", event: "desktop" },
  { id: "terminal-discovered", title: "Terminal desbloqueada", description: "Abriste el canal de comandos del sistema.", icon: "/images/logros/terminal.png", category: "Sistema", event: "terminal" },
  { id: "project-explorer", title: "Explorador de proyectos", description: "Visitaste el repositorio de misiones.", icon: "/images/logros/proyectos.png", category: "Sistema", event: "projects" },
  { id: "nexo-friend", title: "Amigo de Nexo", description: "Conversaste lo suficiente con la mascota del sistema.", icon: "/images/logros/nexo.png", category: "Sistema", event: "nexo" },
  { id: "pokemon-challenge", title: "Entrenador retador", description: "Entraste a la arena para desafiar al campeón.", icon: "/images/logros/reto-pokemon.png", category: "Gamer", event: "pokemon" },
  { id: "microservices", title: "Arquitecto de microservicios", description: "Meta futura: servicios independientes y muy bien orquestados.", icon: "/images/logros/microservicios.png", category: "Meta" },
  { id: "national-dex", title: "El dueño de las 9 regiones", description: "Completar la Pokédex Nacional.", icon: "/images/logros/pokedex.png", category: "Gamer", baseUnlocked: true },
];

export const achievementByEvent = (event: string) => achievements.find((achievement) => achievement.event === event);
