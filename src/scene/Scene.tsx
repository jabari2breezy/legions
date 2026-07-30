import { Suspense } from 'react';
import type { JSX } from 'react';
import { Canvas } from '@react-three/fiber';
import { Ring } from './Ring';
import { CameraRig } from './CameraRig';

export function Scene(): JSX.Element {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-white">
      <Canvas
        camera={{
          position: [0, 8, 28],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={null}>
          <Ring />
        </Suspense>
        <CameraRig />
      </Canvas>
    </div>
  );
}
