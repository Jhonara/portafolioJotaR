import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import type { BackgroundQuality } from "../background.types";

type Props = { quality: BackgroundQuality; bloom?: number; vignette?: number };

/** Reserved, selective glow for scenes that use emissive holographic energy. */
const HolographicPostprocessing = ({ quality, bloom = 0.28, vignette = 0.38 }: Props) => {
  if (quality === "reduced") return null;
  return <EffectComposer multisampling={0} resolutionScale={0.72}>
    <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.38} intensity={bloom} mipmapBlur />
    <Vignette offset={0.22} darkness={vignette} />
  </EffectComposer>;
};

export default HolographicPostprocessing;
