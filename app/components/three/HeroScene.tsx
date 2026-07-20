'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { liquidGlassDefaults } from './LiquidGlassMaterial';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function HeroMesh({ mousePosition, reducedMotion }: { mousePosition: { x: number; y: number }; reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene, camera } = useThree();

  // Create geometry on mount
  useEffect(() => {
    if (!meshRef.current) return;
    // Icosahedron with high detail for smooth blob
    const geometry = new THREE.IcosahedronGeometry(1.2, 6);
    meshRef.current.geometry = geometry;
  }, []);

  // Mouse-reactive tilt with lerp
  useFrame(() => {
    if (!meshRef.current || reducedMotion) return;

    const targetRotationX = mousePosition.y * 0.15; // Cap at ±0.15 rad
    const targetRotationY = mousePosition.x * 0.15;

    meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.05;

    // Subtle floating animation
    meshRef.current.position.y = Math.sin(performance.now() * 0.0005) * 0.05;
  });

  return (
    <group ref={meshRef}>
      <mesh
        castShadow
        receiveShadow
        geometry={new THREE.IcosahedronGeometry(1.2, 6)}
      >
        <meshTransmissionMaterial
          {...liquidGlassDefaults}
          color="#4DE8D4"
        />
      </mesh>
      {/* Inner glow mesh */}
      <mesh
        geometry={new THREE.IcosahedronGeometry(1.15, 6)}
      >
        <meshBasicMaterial
          color="#4DE8D4"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function HeroLights() {
  return (
    <>
      {/* Key light - top left warm */}
      <directionalLight
        position={[5, 10, 7]}
        intensity={2.5}
        color="#FFF8E7"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* Rim light - opposite side cool */}
      <directionalLight
        position={[-5, 5, -7]}
        intensity={1.5}
        color="#4DE8D4"
      />
      {/* Fill light - bottom */}
      <directionalLight
        position={[0, -5, 0]}
        intensity={0.5}
        color="#2B1B7A"
      />
      {/* Ambient */}
      <ambientLight intensity={0.3} color="#1A1147" />
    </>
  );
}

function HeroSceneCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const mousePosition = useMousePosition();

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      shadows
    >
      <Environment
        preset="city"
        background={false}
        ground={false}
      />
      <HeroLights />
      <HeroMesh mousePosition={mousePosition} reducedMotion={reducedMotion} />
      <OrbitControls
        enableRotate={!reducedMotion}
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
      />
    </Canvas>
  );
}

export function HeroScene() {
  const [reducedMotion] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      setLoaded(true); // Skip to fallback
      return;
    }
    setLoaded(true);
  }, []);

  // Use reduced motion from hook
  const shouldReduceMotion = prefersReducedMotion;

  // If reduced motion or not loaded, show static image fallback
  if (shouldReduceMotion || !loaded) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/hero-reference.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'heroZoom 28s linear infinite alternate',
        }}
      >
        <style jsx global>{`
          @keyframes heroZoom {
            from { transform: scale(1); }
            to { transform: scale(1.08); }
          }
        `}</style>
      </div>
    );
  }

  return <HeroSceneCanvas reducedMotion={shouldReduceMotion} />;
}