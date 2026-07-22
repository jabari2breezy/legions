'use client'

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 300;

export function AmbientParticles({ scrollVelocity = 0 }: { scrollVelocity?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const spd = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1600;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 900;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 400;
      spd[i] = 0.02 + Math.random() * 0.06;
    }
    return [pos, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3 + 1] += speeds[i] * (1 + Math.abs(scrollVelocity) * 0.5);
      if (arr[i * 3 + 1] > 450) arr[i * 3 + 1] = -450;
      arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.01;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={2.2}
        color="#ffffff"
        transparent
        opacity={0.18}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
