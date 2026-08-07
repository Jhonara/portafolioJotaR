import { Color } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import { usePlanePointer } from "./shared/interaction";
import { useBackgroundShaderMaterial, usePointerUniform } from "./shared/shader";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uQuality;
  varying vec2 vGridPosition;
  varying float vEnergy;

  void main() {
    vGridPosition = position.xy;
    float distanceToPointer = length(position.xy - uPointer);
    float pointerWave = sin(distanceToPointer * 2.2 - uTime * 2.1) * exp(-distanceToPointer * 0.34) * 0.26;
    float ambientWave = sin(position.x * 0.22 + uTime * 0.24) * sin(position.y * 0.18 - uTime * 0.17) * 0.055;
    float pulse = exp(-pow((position.y - (fract(uTime * 0.032) * 58.0 - 29.0)) * 0.42, 2.0));
    vEnergy = pointerWave + pulse;

    vec3 displaced = position;
    displaced.z += pointerWave + ambientWave + pulse * 0.12;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uQuality;
  varying vec2 vGridPosition;
  varying float vEnergy;

  float line(float coordinate, float width) {
    float cell = abs(fract(coordinate) - 0.5);
    return 1.0 - smoothstep(width, width + fwidth(coordinate) * 1.65, cell);
  }

  void main() {
    vec2 field = vGridPosition;
    float fineGrid = max(line(field.x, 0.017), line(field.y, 0.017));
    float majorGrid = max(line(field.x / 5.0, 0.012), line(field.y / 5.0, 0.012));

    float pointerDistance = length(field - uPointer);
    float pointerHalo = exp(-pointerDistance * 0.36) * (0.55 + 0.45 * sin(uTime * 2.1 - pointerDistance * 2.2));
    float travel = exp(-pow((field.y - (fract(uTime * 0.032) * 58.0 - 29.0)) * 0.36, 2.0));
    float edgeFade = smoothstep(42.0, 7.0, length(field * vec2(0.72, 0.52)));

    vec3 deepBlue = vec3(0.009, 0.028, 0.075);
    vec3 cyan = vec3(0.03, 0.88, 0.94);
    vec3 turquoise = vec3(0.04, 0.72, 0.62);
    vec3 magenta = vec3(0.78, 0.08, 0.48);

    float gridStrength = fineGrid * 0.09 + majorGrid * 0.31;
    vec3 color = deepBlue;
    color += turquoise * gridStrength * edgeFade;
    color += cyan * (majorGrid * 0.1 + pointerHalo * 0.09 + travel * (fineGrid * 0.58 + majorGrid * 0.86));
    color += magenta * travel * majorGrid * 0.055;
    color += cyan * max(vEnergy, 0.0) * 0.16;

    float atmosphere = 0.035 * (0.5 + 0.5 * sin(uTime * 0.12 + field.x * 0.09));
    color += vec3(0.0, 0.12, 0.19) * atmosphere;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const QuantumCamera = () => { useParallaxCamera({ position: [0, 2.35, 8.2], target: [0, -0.42, -12], positionParallax: [0.32, 0.1], targetParallax: [0.12, 0.04], damping: 1.55 }); return null; };

const QuantumField = ({ quality }: BackgroundSceneProps) => {
  const material = useBackgroundShaderMaterial({ vertexShader, fragmentShader }, quality);
  const pointer = usePlanePointer();
  usePointerUniform(material, pointer);

  return <mesh rotation-x={-Math.PI / 2} material={material}>
    <planeGeometry args={[76, 76, quality === "high" ? 180 : 96, quality === "high" ? 180 : 96]} />
  </mesh>;
};

const QuantumGrid = ({ quality }: BackgroundSceneProps) => <>
  <color attach="background" args={[new Color("#030817")]} />
  <QuantumCamera />
  <QuantumField quality={quality} />
  <HolographicPostprocessing quality={quality} />
</>;

export default QuantumGrid;
