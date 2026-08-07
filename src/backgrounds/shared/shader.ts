import { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Vector2 } from "three";
import type { BackgroundQuality } from "../background.types";

/* R3F animation deliberately mutates shader uniforms inside useFrame. */
/* eslint-disable react-hooks/immutability */

type ShaderDefinition = { vertexShader: string; fragmentShader: string };

/** Creates the standard JotaR.OS shader contract: time, cursor and quality uniforms. */
export const useBackgroundShaderMaterial = ({ vertexShader, fragmentShader }: ShaderDefinition, quality: BackgroundQuality) => {
  const material = useMemo(() => new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uPointer: { value: new Vector2() },
      uQuality: { value: 1 },
    },
  }), [fragmentShader, vertexShader]);

  useEffect(() => () => material.dispose(), [material]);
  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uQuality.value = quality === "high" ? 1 : 0;
  });

  return material;
};

/** Smoothly feeds a scene-space pointer into the shared shader contract. */
export const usePointerUniform = (material: ShaderMaterial, pointer: Vector2, damping = 3.2) => {
  useFrame((_, delta) => material.uniforms.uPointer.value.lerp(pointer, 1 - Math.exp(-delta * damping)));
};
