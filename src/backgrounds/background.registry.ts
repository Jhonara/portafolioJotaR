import { lazy } from "react";
import { DEFAULT_BACKGROUND_ID, type BackgroundDefinition, type BackgroundId } from "./background.types";

export const backgroundRegistry: BackgroundDefinition[] = [
  {
    id: DEFAULT_BACKGROUND_ID,
    name: "Default Grid",
    description: "La escena original de JotaR.OS: señales, grid táctico y energía ambiente.",
    renderer: "dom",
    accent: "cyan",
    performance: "light",
    component: lazy(() => import("./DefaultGrid")),
  },
  {
    id: "quantum-grid",
    name: "Quantum Grid",
    description: "Un campo energético holográfico: pulsos de sistema, ondas suaves y profundidad cinemática.",
    renderer: "webgl",
    accent: "turquoise",
    performance: "balanced",
    component: lazy(() => import("./QuantumGrid")),
  },
  {
    id: "aurora-flux",
    name: "Aurora Flux",
    description: "Plasma computacional procedural que respira bajo la superficie del sistema.",
    renderer: "webgl",
    accent: "turquoise",
    performance: "balanced",
    component: lazy(() => import("./AuroraFlux")),
  },
  { id: "constellation-field", name: "Constellation Field", description: "Cartografía de nodos luminosos y rutas de señal.", renderer: "webgl", accent: "cyan", performance: "balanced", component: lazy(() => import("./ConstellationField")) },
  { id: "orbital-blueprint", name: "Orbital Blueprint", description: "Un núcleo táctico de órbitas y trayectorias holográficas.", renderer: "webgl", accent: "turquoise", performance: "balanced", component: lazy(() => import("./OrbitalBlueprint")) },
  { id: "neural-pulse", name: "Neural Pulse", description: "Sinapsis digitales que transmiten impulsos de energía.", renderer: "webgl", accent: "cyan", performance: "balanced", component: lazy(() => import("./NeuralPulse")) },
  { id: "stellar-archive", name: "Stellar Archive", description: "Un archivo cósmico de anillos, señales y cartografía estelar.", renderer: "webgl", accent: "cyan", performance: "balanced", component: lazy(() => import("./StellarArchive")) },
  { id: "glass-monoliths", name: "Glass Monoliths", description: "Monolitos de vidrio holográfico suspendidos en silencio.", renderer: "webgl", accent: "turquoise", performance: "balanced", component: lazy(() => import("./GlassMonoliths")) },
  { id: "neon-metropolis", name: "Neon Metropolis", description: "Una metrópolis abstracta trazada por señales de luz.", renderer: "webgl", accent: "cyan", performance: "balanced", component: lazy(() => import("./NeonMetropolis")) },
];

export const backgroundById = new Map(backgroundRegistry.map((background) => [background.id, background]));

export const getBackground = (backgroundId: BackgroundId) => backgroundById.get(backgroundId) ?? backgroundById.get(DEFAULT_BACKGROUND_ID)!;
