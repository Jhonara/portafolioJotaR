import { Color } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";
import { useBackgroundShaderMaterial } from "./shared/shader";

const vertexShader = /* glsl */ `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragmentShader = /* glsl */ `
uniform float uTime; uniform vec2 uPointer; varying vec2 vUv;
float ring(vec2 p,float r,float w){return smoothstep(w,0.,abs(length(p)-r));}
float orbit(vec2 p,float radius,float aspect,float angle){p.x*=aspect;float a=atan(p.y,p.x)-angle;float d=abs(length(p)-radius);return smoothstep(.009,0.,d)*(0.55+.45*cos(a*2.));}
void main(){vec2 uv=vUv;vec2 p=(uv-.5)*vec2(1.78,1.);p-=vec2(0.,.18);float t=uTime*.08;float core=exp(-length(p)*15.);float o1=orbit(p,.2,1.0,t);float o2=orbit(p,.34,1.22,-t*.72+1.1);float o3=orbit(p,.48,.76,t*.48+2.2);float ticks=ring(p,.6,.003)*(0.3+.7*step(.92,abs(sin(atan(p.y,p.x)*12.))));float satellite=exp(-length(p-vec2(cos(t)*.2,sin(t)*.2)) *90.);float mouse=exp(-length(uv-(uPointer*.5+.5))*6.)*.08;vec3 base=vec3(.004,.012,.043),cyan=vec3(.04,.82,.94),teal=vec3(.02,.62,.57),pink=vec3(.72,.07,.43);vec3 c=base+teal*(o3*.3+ticks*.18)+cyan*(o1*.7+o2*.5+core*.6+satellite+mouse);c+=pink*satellite*.18;gl_FragColor=vec4(c,1.);}`;
const Camera=()=>{useParallaxCamera({position:[0,0,8],target:[0,0,0],positionParallax:[.08,.04],targetParallax:[.03,.015],damping:1.1});return null;};
const OrbitalBlueprint=({quality}:BackgroundSceneProps)=>{const material=useBackgroundShaderMaterial({vertexShader,fragmentShader},quality);return <><color attach="background" args={[new Color("#020616")]} /><Camera/><mesh material={material}><planeGeometry args={[28,18]}/></mesh><HolographicPostprocessing quality={quality} bloom={.2} vignette={.4}/></>;};
export default OrbitalBlueprint;
