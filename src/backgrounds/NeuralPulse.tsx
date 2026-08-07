import { Color } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";
import { useBackgroundShaderMaterial } from "./shared/shader";

const vertexShader = /* glsl */ `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragmentShader = /* glsl */ `
uniform float uTime;uniform vec2 uPointer;varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*14537.2);} float line(vec2 p,vec2 a,vec2 b){vec2 ba=b-a;return length(p-a-ba*clamp(dot(p-a,ba)/dot(ba,ba),0.,1.));}
void main(){vec2 uv=vUv;vec2 grid=uv*vec2(7.,4.);vec2 cell=floor(grid),f=fract(grid);float links=0.,nodes=0.,pulse=0.;for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 c=cell+vec2(float(x),float(y));vec2 a=vec2(x,y)+vec2(hash(c),hash(c+8.));vec2 b=vec2(x+1,y)+vec2(hash(c+vec2(1.,0.)),hash(c+vec2(1.,0.)+8.));float d=line(f,a,b);links+=smoothstep(.013,0.,d)*.42;nodes+=smoothstep(.045,0.,length(f-a));float phase=fract(uTime*.16+hash(c)*3.);pulse+=smoothstep(.08,0.,abs(length(f-a)-phase))*smoothstep(.02,.1,phase)*.38;}float cursor=exp(-length(uv-(uPointer*.5+.5))*5.)*.2;float veil=1.-smoothstep(.36,.94,uv.y);vec3 base=vec3(.004,.012,.045),cyan=vec3(.04,.83,.94),teal=vec3(.03,.65,.57),pink=vec3(.72,.06,.43);vec3 c=base+teal*links*.22*veil+cyan*(nodes*.65+links*.12+pulse+cursor)*veil;c+=pink*pulse*nodes*.08;gl_FragColor=vec4(c,1.);}`;
const Camera=()=>{useParallaxCamera({position:[0,0,8],target:[0,0,0],positionParallax:[.1,.04],targetParallax:[.04,.02],damping:1.1});return null;};
const NeuralPulse=({quality}:BackgroundSceneProps)=>{const material=useBackgroundShaderMaterial({vertexShader,fragmentShader},quality);return <><color attach="background" args={[new Color("#020616")]} /><Camera/><mesh material={material}><planeGeometry args={[28,18]}/></mesh><HolographicPostprocessing quality={quality} bloom={.2} vignette={.35}/></>;};
export default NeuralPulse;
