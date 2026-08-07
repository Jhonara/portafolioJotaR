# Background Engine

`BackgroundEngine` is the only component rendered by the desktop. It resolves the selected entry from `background.registry.ts` and mounts exactly one background.

## Add a DOM background

1. Create a component in this directory that fills its absolute parent and uses `pointer-events-none`.
2. Add an entry to `backgroundRegistry` with `renderer: "dom"` and `component: lazy(() => import("./YourBackground"))`.

## Add a WebGL background

1. Create a React Three Fiber scene component in this directory.
2. Register it with `renderer: "webgl"`.
3. Keep the scene self-contained. `WebGLBackgroundCanvas` owns the shared Canvas, DPR limits and performance monitoring.

WebGL scenes receive a `quality` prop. Use it to reduce geometry segments, texture samples or postprocessing for modest hardware.

## Shared primitives

Use `shared/interaction` for the global cursor and plane projection, `shared/camera` for fixed parallax cameras, `shared/shader` for the standard `uTime`, `uPointer`, and `uQuality` shader uniforms, and `shared/HolographicPostprocessing` for restrained glow. A new scene should normally contain only its shader, visual parameters, and composition.

Never render another background alongside the active one. Keep per-frame mutations inside R3F's render loop, reuse materials/geometries, and use instancing for repeated objects.

The chosen id is persisted through `background.preference.ts`. Unknown or removed ids automatically fall back to `default-grid`.
