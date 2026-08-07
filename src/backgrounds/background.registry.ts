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
  {
    id: "signal-cathedral",
    name: "Signal Cathedral",
    description: "Un umbral monumental de energía, arquitectura procedural y materia holográfica.",
    renderer: "webgl",
    accent: "turquoise",
    performance: "cinematic",
    component: lazy(() => import("./SignalCathedral")),
  },
];

export const backgroundById = new Map(backgroundRegistry.map((background) => [background.id, background]));

export const getBackground = (backgroundId: BackgroundId) => backgroundById.get(backgroundId) ?? backgroundById.get(DEFAULT_BACKGROUND_ID)!;
