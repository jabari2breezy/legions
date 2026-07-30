import { Suspense } from 'react';
import type { JSX } from 'react';
import { Canvas } from '@react-three/fiber';
import { Ring } from './Ring';
import { CameraRig } from './CameraRig';

export function Scene(): JSX.Element {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen bg-[#050507]">
      <Canvas
        camera={{
          position: [0, 0, 18],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#050507']} />
        <fog attach="fog" args={['#050507', 10, 40]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.3} />
        <Suspense fallback={null}>
          <Ring />
        </Suspense>
        <CameraRig />
      </Canvas>
    </div>
  );
}
