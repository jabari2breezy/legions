'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;

  float wave(vec3 p) {
    return sin(p.x * 4.5 + uTime * 0.8) * 0.05
      + sin(p.y * 5.0 - uTime * 0.65) * 0.04
      + sin(p.z * 4.2 + uTime * 0.55) * 0.03;
  }

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec3 displaced = position + normal * wave(position);
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;

  vec3 palette(vec3 a, vec3 b, float t) {
    return mix(a, b, t);
  }

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(normal, viewDir)), 2.4);
    float glow = smoothstep(0.0, 1.0, fresnel);
    float sweep = smoothstep(-0.2, 0.8, sin((vUv.x + vUv.y * 0.65 + uTime * 0.12) * 6.2831));
    float wobble = sin((uPointer.x + uPointer.y) * 0.002 + uTime * 0.4) * 0.05;

    vec3 deep = vec3(0.08, 0.18, 0.44);
    vec3 glass = vec3(0.00, 0.66, 0.63);
    vec3 rim = vec3(0.00, 0.96, 0.83);
    vec3 base = mix(deep, glass, 0.58 + wobble);
    base = mix(base, vec3(0.22, 0.18, 0.52), 0.16);

    float alpha = 0.26 + glow * 0.42 + sweep * 0.03;
    vec3 color = base + rim * (glow * 0.95);
    color += vec3(0.02, 0.04, 0.04) * fresnel;
    gl_FragColor = vec4(color, alpha);
  }
`

function Orb() {
  const orb = useRef<THREE.Group>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))

  useFrame((state, delta) => {
    if (orb.current) {
      orb.current.rotation.x += delta * 0.15
      orb.current.rotation.y += delta * 0.21
      orb.current.rotation.z += delta * 0.05
      orb.current.position.x += (pointer.current.x * 0.18 - orb.current.position.x) * 0.05
      orb.current.position.y += (pointer.current.y * 0.14 - orb.current.position.y) * 0.05
    }

    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.getElapsedTime()
      material.current.uniforms.uPointer.value.lerp(pointer.current, 0.12)
    }
  })

  return (
    <group ref={orb} scale={1.15}>
      <mesh>
        <icosahedronGeometry args={[1.15, 5]} />
        <shaderMaterial
          ref={material}
          transparent
          depthWrite={false}
          uniforms={{
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2(0, 0) },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
      <mesh scale={1.08}>
        <icosahedronGeometry args={[1.18, 3]} />
        <meshPhysicalMaterial
          color="#00A896"
          roughness={0.04}
          transmission={0.82}
          thickness={1.35}
          ior={1.28}
          clearcoat={1}
          clearcoatRoughness={0.08}
          transparent
          opacity={0.22}
        />
      </mesh>
    </group>
  )
}

export default function HeroOrbScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#00F5D4" />
      <Suspense fallback={null}>
        <Orb />
      </Suspense>
    </Canvas>
  )
}
