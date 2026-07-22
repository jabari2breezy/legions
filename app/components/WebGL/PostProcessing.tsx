'use client'

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useSmoothScroll } from "../Providers/SmoothScroll";
import * as THREE from "three";

export function PostProcessing() {
  const { velocity } = useSmoothScroll();
  const aberrationRef = useRef(new THREE.Vector2(0.0005, 0.0005));

  useFrame(() => {
    const target = 0.0005 + Math.min(Math.abs(velocity) * 0.00004, 0.004);
    aberrationRef.current.lerp(new THREE.Vector2(target, target), 0.08);
  });

  return (
    <EffectComposer multisampling={4}>
      <Bloom intensity={0.35} luminanceThreshold={0.85} luminanceSmoothing={0.2} mipmapBlur />
      <ChromaticAberration
        offset={aberrationRef.current}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={true}
        modulationOffset={0.3}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.6} />
    </EffectComposer>
  );
}
