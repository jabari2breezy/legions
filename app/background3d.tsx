"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function AnimatedParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 20;
      vel[i3] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const array = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      array[i3] += velocities[i3];
      array[i3 + 1] += velocities[i3 + 1];
      array[i3 + 2] += velocities[i3 + 2];
      if (Math.abs(array[i3]) > 10) velocities[i3] *= -1;
      if (Math.abs(array[i3 + 1]) > 10) velocities[i3 + 1] *= -1;
      if (Math.abs(array[i3 + 2]) > 10) velocities[i3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0003;
    pointsRef.current.rotation.x += 0.0001;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.6}
        color="#11C7CA"
      />
    </points>
  );
}

function FloatingRing({
  radius,
  speed,
  color,
}: {
  radius: number;
  speed: number;
  color: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    const t = clock.getElapsedTime() * speed;
    ringRef.current.rotation.x = Math.sin(t * 0.5) * 0.3;
    ringRef.current.rotation.y = t;
    ringRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#11C7CA" />
      <pointLight position={[-5, -3, 3]} intensity={0.3} color="#3E5DE0" />

      <AnimatedParticles />
      <FloatingRing radius={3} speed={0.3} color="#11C7CA" />
      <FloatingRing radius={4.5} speed={0.2} color="#3E5DE0" />
      <FloatingRing radius={6} speed={0.15} color="#41EFE7" />
    </>
  );
}

export function Background3D() {
  return (
    <div className="fixed inset-0 -z-10" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
