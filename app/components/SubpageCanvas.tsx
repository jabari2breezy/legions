'use client'

'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import MacroForms from './MacroForms'

function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#2B2A8C" />

      <pointLight
        position={[3, 2, 2]}
        intensity={40}
        color="#3FE0C5"
        distance={12}
        decay={2}
      />
      <pointLight
        position={[-4, -1, 1]}
        intensity={25}
        color="#3FE0C5"
        distance={10}
        decay={2}
      />
      <pointLight
        position={[0, 3, -2]}
        intensity={15}
        color="#6366f1"
        distance={8}
        decay={2}
      />

      <spotLight
        position={[2, 4, 3]}
        angle={0.5}
        penumbra={1}
        intensity={30}
        color="#3FE0C5"
        distance={15}
        decay={2}
        castShadow={false}
      />
    </>
  )
}

function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
      <Noise opacity={0.12} blendFunction={BlendFunction.OVERLAY} />
      <Vignette offset={0.3} darkness={0.6} />
    </EffectComposer>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#15144d']} />
      <fog attach="fog" args={['#15144d', 4, 14]} />

      <Lights />

      <Float speed={0.4} rotationIntensity={0.1} floatIntensity={0.3}>
        <MacroForms />
      </Float>

      <Environment preset="night" environmentIntensity={0.3} />

      <PostProcessing />
    </>
  )
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--color-cyan)]/30 border-t-[var(--color-cyan)] rounded-full animate-spin" />
    </div>
  )
}

export default function SubpageCanvas() {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <Suspense fallback={<Loader />}>
        <Canvas
          gl={{
            antialias: false,
            alpha: false,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          camera={{
            fov: 35,
            near: 0.1,
            far: 50,
            position: [0, 0, 5],
          }}
          dpr={[1, 1.5]}
          frameloop="always"
        >
          <Scene />
        </Canvas>
      </Suspense>

      {/* Film grain overlay via CSS */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />
    </div>
  )
}
