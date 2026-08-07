import { Color } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";
import { useBackgroundShaderMaterial } from "./shared/shader";

const vertexShader=/* glsl */`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragmentShader=/* glsl */`
uniform float uTime;uniform vec2 uPointer;varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float star(vec2 p,float s){return smoothstep(s,0.,length(p));}
void main(){vec2 uv=vUv;vec2 p=(uv-.5)*vec2(1.78,1.);float t=uTime*.035;float archive=0.;for(int i=0;i<3;i++){float z=float(i)+1.;vec2 q=fract(uv*(18.+z*12.)+vec2(z*17.3,z*9.1))-0.5;float seed=hash(floor(uv*(18.+z*12.)+z*9.));archive+=star(q,.012+seed*.018)*(.28+z*.15);}float rings=0.;for(int i=0;i<4;i++){float r=.18+float(i)*.13;float a=atan(p.y,p.x);rings+=smoothstep(.004,0.,abs(length(p)-r))*(.2+.8*step(.9,sin(a*(6.+float(i))*1.7+t*4.)));}float core=exp(-length(p)*11.);float cursor=exp(-length(uv-(uPointer*.5+.5))*5.)*.13;vec3 base=vec3(.004,.011,.04),cyan=vec3(.04,.82,.94),teal=vec3(.02,.58,.57),pink=vec3(.68,.06,.4);vec3 c=base+teal*archive*.18+cyan*(archive*.72+rings*.34+core*.38+cursor);c+=pink*rings*core*.09;gl_FragColor=vec4(c,1.);}`;
const Camera=()=>{useParallaxCamera({position:[0,0,8],target:[0,0,0],positionParallax:[.09,.04],targetParallax:[.035,.015],damping:1.05});return null;};
const StellarArchive=({quality}:BackgroundSceneProps)=>{const material=useBackgroundShaderMaterial({vertexShader,fragmentShader},quality);return <><color attach="background" args={[new Color("#020616")]}/><Camera/><mesh material={material}><planeGeometry args={[28,18]}/></mesh><HolographicPostprocessing quality={quality} bloom={.19} vignette={.4}/></>;};
export default StellarArchive;
