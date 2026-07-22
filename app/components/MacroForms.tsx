'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { MeshTransmissionMaterial } from '@react-three/drei'

function GlassTorus() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.1 + 0.3
    ref.current.rotation.y = t * 0.08
    ref.current.rotation.z = Math.cos(t * 0.1) * 0.05
  })

  return (
    <mesh ref={ref} position={[0, 0.2, -0.5]} scale={1.8}>
      <torusGeometry args={[1, 0.45, 64, 128]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        resolution={512}
        transmission={0.95}
        roughness={0.25}
        thickness={0.8}
        ior={1.5}
        chromaticAberration={0.04}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.3}
        temporalDistortion={0.15}
        color="#c8f0ea"
        attenuationColor="#3FE0C5"
        attenuationDistance={1.2}
      />
    </mesh>
  )
}

function ChromeSphere() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t * 0.05
    ref.current.rotation.y = Math.cos(t * 0.12) * 0.2
    ref.current.position.y = Math.sin(t * 0.2) * 0.15 - 0.3
  })

  return (
    <mesh ref={ref} position={[0.8, -0.3, 0.2]} scale={1.1}>
      <sphereGeometry args={[0.7, 64, 64]} />
      <meshStandardMaterial
        color="#e0e0e0"
        metalness={1}
        roughness={0.08}
        envMapIntensity={2}
      />
    </mesh>
  )
}

function LiquidCylinder() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = Math.sin(t * 0.18) * 0.15 + 0.5
    ref.current.rotation.z = t * 0.06
    ref.current.position.x = Math.cos(t * 0.15) * 0.1 - 0.9
  })

  return (
    <mesh ref={ref} position={[-0.9, 0.1, -0.3]} scale={[0.8, 1.4, 0.8]}>
      <cylinderGeometry args={[0.5, 0.5, 1.2, 64, 32]} />
      <meshStandardMaterial
        color="#d4d4d8"
        metalness={1}
        roughness={0.05}
        envMapIntensity={2.5}
      />
    </mesh>
  )
}

function GlassDroplet() {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    ref.current.rotation.x = t * 0.04
    ref.current.rotation.y = Math.sin(t * 0.1) * 0.3
    ref.current.position.y = Math.cos(t * 0.15) * 0.1 + 0.5
  })

  return (
    <mesh ref={ref} position={[-0.5, 0.5, 0.4]} scale={0.9}>
      <sphereGeometry args={[0.6, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        resolution={256}
        transmission={0.9}
        roughness={0.35}
        thickness={0.5}
        ior={1.45}
        chromaticAberration={0.03}
        color="#e8fcf7"
        attenuationColor="#3FE0C5"
        attenuationDistance={2}
      />
    </mesh>
  )
}

export default function MacroForms() {
  const groupRef = useRef<THREE.Group>(null!)
  const { pointer } = useThree()
  const scrollProgress = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    const targetRotX = pointer.y * 0.3 + scrollProgress.current * 1.2
    const targetRotY = pointer.x * 0.4

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetRotX,
      2,
      delta
    )
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotY,
      2,
      delta
    )

    groupRef.current.position.z = THREE.MathUtils.damp(
      groupRef.current.position.z,
      -scrollProgress.current * 2,
      2,
      delta
    )
  })

  return (
    <group ref={groupRef}>
      <GlassTorus />
      <ChromeSphere />
      <LiquidCylinder />
      <GlassDroplet />
    </group>
  )
}
