import { Suspense, useState, type ComponentType } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import type { BackgroundQuality, BackgroundSceneProps } from "./background.types";

type Props = { Scene: ComponentType<BackgroundSceneProps> };

const AdaptiveScene = ({ Scene }: Props) => {
  const [quality, setQuality] = useState<BackgroundQuality>("high");
  return <>
    <PerformanceMonitor onDecline={() => setQuality("reduced")} onIncline={() => setQuality("high")} />
    <AdaptiveDpr />
    <Suspense fallback={null}><Scene quality={quality} /></Suspense>
  </>;
};

/** Shared WebGL host. It is lazy-loaded and only mounted by future 3D backgrounds. */
const WebGLBackgroundCanvas = ({ Scene }: Props) => <Canvas
  className="pointer-events-none absolute inset-0"
  dpr={[1, 1.5]}
  shadows="soft"
  gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
  camera={{ fov: 48, position: [0, 0, 8] }}
>
  <AdaptiveScene Scene={Scene} />
</Canvas>;

export default WebGLBackgroundCanvas;
