---
type: bug
topic: Vite production build hangs when importing 3D ring scene
date: 2026-07-30
tags: [vite, build, react-three-fiber, gsap, zustand]
---

## Summary
The Vite production build (`npx vite build`) hung at the `transforming...` stage whenever `src/pages/ProjectPage.tsx` imported the 3D ring scene. The root cause was in `src/scene/Ring.tsx`: calling `gsap.context()` + `gsap.fromTo(group.rotation, ...)` and simultaneously calling `useRingStore.getState().tickRotation(lerp)` inside `useFrame` caused the bundler/transformer to hang.

## Context
We were building a CLOU Architects-style interactive 3D ring project index page using React Three Fiber, GSAP, and Zustand. The build succeeded without the scene, but froze as soon as the real `Ring` component was imported.

## Decision / Finding
Removed the `gsap.context` rotation tween from `Ring.tsx` and replaced the `tickRotation` store action call in `useFrame` with a direct `useRingStore.setState({ currentRotation: next })` update. The `useFrame` lerp now drives rotation directly, which is sufficient and avoids the hang.

Anti-pattern to avoid:
```tsx
// Do NOT do this inside a R3F useFrame
useRingStore.getState().tickRotation(lerp);

// And do NOT tween a THREE Euler with gsap.context inside the component
gsap.context(() => {
  gsap.fromTo(group.rotation, { y: group.rotation.y }, { y: targetRotation, ... });
});
```

Working pattern:
```tsx
useFrame((_, delta) => {
  const group = groupRef.current;
  if (!group) return;
  const lerp = Math.min(delta * 3, 1);
  const { currentRotation, targetRotation } = useRingStore.getState();
  const next = currentRotation + (targetRotation - currentRotation) * lerp;
  useRingStore.setState({ currentRotation: next });
  group.rotation.y = next;
});
```

## Rationale
Both GSAP context on a Three.js Euler and store action invocation inside `useFrame` are individually risky; together they triggered a Vite transform/SWC infinite loop during production bundling. The lerp-based `useFrame` approach provides the same smooth rotation without external tweening or action dispatch.

## Consequences
- Rotation smoothing is now frame-driven only.
- Filter transitions still animate smoothly because `ProjectPlane` lerps its own position/scale each frame.
- If GSAP is needed for camera transitions in `CameraRig.tsx`, keep it scoped to primitive React refs/values, not Three.js objects inside contexts.

## References
- `src/scene/Ring.tsx`
- `src/scene/ProjectPlane.tsx`
- Commit `95bf926`
