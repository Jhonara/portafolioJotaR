import { lazy, Suspense } from "react";
import { useDesktopStore } from "../store/desktop.store";
import DesktopBackground from "../components/desktop/DesktopBackground";
import { getBackground } from "./background.registry";

const WebGLBackgroundCanvas = lazy(() => import("./WebGLBackgroundCanvas"));

/**
 * The only desktop-facing background component. It loads and mounts one scene
 * at a time, keeping inactive scenes out of the render tree.
 */
const BackgroundEngine = () => {
  const backgroundId = useDesktopStore((state) => state.backgroundId);
  const background = getBackground(backgroundId);
  const Background = background.component;

  if (background.renderer === "webgl") {
    return <Suspense fallback={<DesktopBackground />}><WebGLBackgroundCanvas Scene={Background} /></Suspense>;
  }

  // The fallback is the original scene, so initial load remains visually identical.
  return <Suspense fallback={<DesktopBackground />}><Background quality="high" /></Suspense>;
};

export default BackgroundEngine;
