import { useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useGlobalPointer } from "./interaction";

/* R3F animation deliberately mutates the camera inside useFrame. */
/* eslint-disable react-hooks/immutability */

type ParallaxCameraOptions = {
  position: [number, number, number];
  target: [number, number, number];
  positionParallax?: [number, number];
  targetParallax?: [number, number];
  damping?: number;
};

/** Fixed cinematic camera with restrained, mouse-driven parallax. */
export const useParallaxCamera = ({
  position,
  target: targetPosition,
  positionParallax = [0.25, 0.1],
  targetParallax = [0.1, 0.04],
  damping = 1.5,
}: ParallaxCameraOptions) => {
  const { camera } = useThree();
  const pointer = useGlobalPointer();
  const target = useMemo(() => new Vector3(), []);

  useFrame((_, delta) => {
    const smoothing = 1 - Math.exp(-delta * damping);
    camera.position.x += (position[0] + pointer.x * positionParallax[0] - camera.position.x) * smoothing;
    camera.position.y += (position[1] - pointer.y * positionParallax[1] - camera.position.y) * smoothing;
    camera.position.z += (position[2] - camera.position.z) * smoothing;
    target.set(targetPosition[0] + pointer.x * targetParallax[0], targetPosition[1] + pointer.y * targetParallax[1], targetPosition[2]);
    camera.lookAt(target);
  });
};
