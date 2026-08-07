import { Color } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";
import { useBackgroundShaderMaterial } from "./shared/shader";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uQuality;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
  }

  float field(vec2 p) {
    float value = noise(p);
    value += noise(p * 2.03 + 11.7) * 0.5;
    value += noise(p * 4.12 - 7.4) * 0.25;
    return value / 1.75;
  }

  float plasmaRibbon(vec2 uv, float y, float width, float scale, float drift) {
    float n = field(vec2(uv.x * scale + drift, uv.y * 1.8 - drift * 0.22));
    float center = y + (n - 0.5) * width * 2.1 + sin(uv.x * scale * 0.48 + drift) * width * 0.34;
    float ribbon = exp(-pow((uv.y - center) / width, 2.0));
    float detail = field(vec2(uv.x * scale * 1.65 - drift * 0.7, uv.y * 7.0 + drift));
    float filaments = 0.34 + 0.66 * pow(0.5 + 0.5 * sin((uv.y - center) / width * 8.0 + uv.x * scale * 1.25 + detail * 7.0), 4.0);
    return ribbon * (0.42 + detail * 0.58) * filaments;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.055;
    vec2 cursor = uPointer * 0.5 + 0.5;
    float cursorEnergy = exp(-length((uv - cursor) * vec2(0.7, 1.2)) * 4.4) * 0.055;

    float farLayer = plasmaRibbon(uv, 0.27, 0.10, 3.0, time * 0.45);
    float middleLayer = plasmaRibbon(uv, 0.20, 0.14, 2.05, -time * 0.72);
    float foreground = plasmaRibbon(uv, 0.07, 0.19, 1.25, time * 0.92);
    float breathing = 0.88 + sin(uTime * 0.22) * 0.12;
    float cleanSky = 1.0 - smoothstep(0.08, 0.56, uv.y);
    float primaryWarp = (field(vec2(uv.x * 2.1 + time * 0.8, uv.y * 1.4)) - 0.5) * 0.16;
    float secondaryWarp = (field(vec2(uv.x * 3.4 - time * 0.6, uv.y * 2.2 + 8.0)) - 0.5) * 0.09;
    float primarySheet = exp(-pow((uv.y - (0.39 + primaryWarp + sin(uv.x * 8.0 + time * 2.0) * 0.095)) / 0.012, 2.0));
    float secondarySheet = exp(-pow((uv.y - (0.25 + secondaryWarp + sin(uv.x * 9.5 - time * 1.6) * 0.065)) / 0.008, 2.0));

    vec3 voidBlue = vec3(0.006, 0.014, 0.048);
    vec3 deepCyan = vec3(0.01, 0.17, 0.28);
    vec3 turquoise = vec3(0.02, 0.72, 0.64);
    vec3 cyan = vec3(0.05, 0.82, 0.94);
    vec3 magenta = vec3(0.68, 0.06, 0.43);

    vec3 color = voidBlue;
    color += deepCyan * farLayer * 0.94 * cleanSky;
    color += turquoise * middleLayer * 0.48 * breathing * cleanSky;
    color += cyan * foreground * 0.42 * breathing * cleanSky;
    color += turquoise * pow(middleLayer, 2.0) * 0.46 * cleanSky;
    color += cyan * pow(foreground, 1.35) * 1.8 * breathing * cleanSky;
    color += turquoise * primarySheet * 0.58 * breathing * cleanSky;
    color += cyan * pow(primarySheet, 2.0) * 1.05 * breathing * cleanSky;
    color += cyan * secondarySheet * 0.58 * cleanSky;
    color += cyan * cursorEnergy * cleanSky;

    float rareMagenta = foreground * middleLayer * (0.02 + 0.035 * smoothstep(0.76, 0.96, sin(uv.x * 4.0 - time * 2.0) * 0.5 + 0.5));
    color += magenta * rareMagenta * cleanSky;

    float quietGrain = noise(uv * 170.0 + time) - 0.5;
    color += quietGrain * 0.012 * cleanSky;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const AuroraCamera = () => {
  useParallaxCamera({ position: [0, 0, 8], target: [0, 0, 0], positionParallax: [0.12, 0.05], targetParallax: [0.045, 0.02], damping: 1.15 });
  return null;
};

const AuroraFlux = ({ quality }: BackgroundSceneProps) => {
  const material = useBackgroundShaderMaterial({ vertexShader, fragmentShader }, quality);
  return <>
    <color attach="background" args={[new Color("#020616")]} />
    <AuroraCamera />
    <mesh material={material}><planeGeometry args={[28, 18]} /></mesh>
    <HolographicPostprocessing quality={quality} bloom={0.16} vignette={0.32} />
  </>;
};

export default AuroraFlux;
