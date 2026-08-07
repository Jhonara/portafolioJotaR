import { Color } from "three";
import type { BackgroundSceneProps } from "./background.types";
import { useParallaxCamera } from "./shared/camera";
import HolographicPostprocessing from "./shared/HolographicPostprocessing";
import { useBackgroundShaderMaterial } from "./shared/shader";

const vertexShader=/* glsl */`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragmentShader=/* glsl */`
uniform float uTime;uniform vec2 uPointer;varying vec2 vUv;
float hash(float n){return fract(sin(n)*43758.5453);}float line(float x,float w){return smoothstep(w,0.,abs(fract(x)-.5));}
void main(){vec2 uv=vUv;vec2 p=(uv-.5)*vec2(1.78,1.);float horizon=.38;float city=0.;for(int i=0;i<19;i++){float n=float(i);float x=(n/18.-.5)*1.8;float width=.025+hash(n)*.05;float h=.08+hash(n+13.)*.34;float b=smoothstep(width,width-.008,abs(p.x-x));float top=smoothstep(h,h-.012,p.y-horizon);float base=smoothstep(-.48,-.44,p.y);city+=b*top*base;float windows=line((p.y-horizon)/(h+.01)*12.+n, .08)*b*top;city+=windows*.18;}float road=smoothstep(.012,0.,abs(p.y-(horizon-.16)))*smoothstep(horizon-.07,-.5,p.y);float scan=.5+.5*sin(uTime*.45+p.x*4.);float cursor=exp(-length(uv-(uPointer*.5+.5))*5.)*.09;vec3 base=vec3(.004,.011,.04),cyan=vec3(.04,.8,.93),teal=vec3(.02,.57,.56),pink=vec3(.7,.06,.43);vec3 c=base+teal*city*.23+cyan*(city*.34+road*.38*scan+cursor);c+=pink*road*.035;gl_FragColor=vec4(c,1.);}`;
const Camera=()=>{useParallaxCamera({position:[0,0,8],target:[0,0,0],positionParallax:[.08,.03],targetParallax:[.03,.012],damping:1.1});return null;};
const NeonMetropolis=({quality}:BackgroundSceneProps)=>{const material=useBackgroundShaderMaterial({vertexShader,fragmentShader},quality);return <><color attach="background" args={[new Color("#020616")]}/><Camera/><mesh material={material}><planeGeometry args={[28,18]}/></mesh><HolographicPostprocessing quality={quality} bloom={.18} vignette={.42}/></>;};
export default NeonMetropolis;
