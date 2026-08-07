import { Color } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";
import { useBackgroundShaderMaterial } from "./shared/shader";

const vertexShader=/* glsl */`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragmentShader=/* glsl */`
uniform float uTime;uniform vec2 uPointer;varying vec2 vUv;
float box(vec2 p,vec2 b){vec2 d=abs(p)-b;return length(max(d,0.))+min(max(d.x,d.y),0.);}float glass(vec2 p,vec2 pos,vec2 size,float tilt){p-=pos;p.x+=p.y*tilt;float edge=smoothstep(.012,0.,abs(box(p,size)));float body=smoothstep(.01,-.04,box(p,size));return edge+body*.12;}
void main(){vec2 uv=vUv;vec2 p=(uv-.5)*vec2(1.78,1.);float t=uTime*.09;float m1=glass(p,vec2(-.42,.02+sin(t)*.03),vec2(.13,.38),-.12);float m2=glass(p,vec2(.06,-.13+cos(t*.8)*.025),vec2(.18,.51),.09);float m3=glass(p,vec2(.48,.08+sin(t*.7)*.03),vec2(.11,.32),-.16);float floorGlow=exp(-pow(p.y+.48,2.)*18.);float cursor=exp(-length(uv-(uPointer*.5+.5))*5.)*.1;vec3 base=vec3(.005,.013,.045),cyan=vec3(.04,.82,.94),teal=vec3(.03,.61,.59),pink=vec3(.68,.06,.42);vec3 c=base+teal*(m1*.28+m2*.32+m3*.25+floorGlow*.1)+cyan*(m1*.2+m2*.25+m3*.18+cursor);c+=pink*m2*.035;gl_FragColor=vec4(c,1.);}`;
const Camera=()=>{useParallaxCamera({position:[0,0,8],target:[0,0,0],positionParallax:[.07,.035],targetParallax:[.025,.012],damping:1.0});return null;};
const GlassMonoliths=({quality}:BackgroundSceneProps)=>{const material=useBackgroundShaderMaterial({vertexShader,fragmentShader},quality);return <><color attach="background" args={[new Color("#020616")]}/><Camera/><mesh material={material}><planeGeometry args={[28,18]}/></mesh><HolographicPostprocessing quality={quality} bloom={.16} vignette={.42}/></>;};
export default GlassMonoliths;
