import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Plane, Vector2, Vector3 } from "three";

const screenPointer = new Vector2();
let subscribers = 0;

const updatePointer = (event: MouseEvent) => {
  screenPointer.set((event.clientX / window.innerWidth - 0.5) * 2, (event.clientY / window.innerHeight - 0.5) * 2);
};

/** A single, passive mouse listener shared by every active WebGL background primitive. */
export const useGlobalPointer = () => {
  useEffect(() => {
    if (subscribers++ === 0) window.addEventListener("mousemove", updatePointer, { passive: true });
    return () => {
      subscribers -= 1;
      if (subscribers === 0) window.removeEventListener("mousemove", updatePointer);
    };
  }, []);
  return screenPointer;
};

/** Projects the global pointer onto the world XZ plane and returns plane-local coordinates. */
export const usePlanePointer = () => {
  const pointer = useGlobalPointer();
  const { camera, raycaster } = useThree();
  const plane = useMemo(() => new Plane(new Vector3(0, 1, 0), 0), []);
  const intersection = useMemo(() => new Vector3(), []);
  const localPointer = useMemo(() => new Vector2(), []);

  useFrame(() => {
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(plane, intersection)) localPointer.set(intersection.x, -intersection.z);
  });

  return localPointer;
};
