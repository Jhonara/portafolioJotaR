import type { ComponentType, LazyExoticComponent } from "react";

export const DEFAULT_BACKGROUND_ID = "default-grid";

export type BackgroundRenderer = "dom" | "webgl";
export type BackgroundId = string;
export type BackgroundQuality = "high" | "reduced";
export type BackgroundSceneProps = { quality: BackgroundQuality };

export type BackgroundDefinition = {
  id: BackgroundId;
  name: string;
  description: string;
  renderer: BackgroundRenderer;
  accent: "cyan" | "turquoise" | "magenta";
  performance: "light" | "balanced" | "cinematic";
  component: LazyExoticComponent<ComponentType<BackgroundSceneProps>>;
};
