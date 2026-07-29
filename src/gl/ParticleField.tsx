import { useRef, useMemo } from 'react';
import type { JSX } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScrollStore } from '@/store/useScrollStore';

const INSTANCE_COUNT = 16;

export function ParticleField(): JSX.Element {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positionsRef = useRef<Float32Array>(
    new Float32Array(INSTANCE_COUNT * 3)
  );
  const lerpFactors = useMemo(() => {
    return Array.from({ length: INSTANCE_COUNT }, (_, i) =>
      Math.max(0.02, 0.12 - i * 0.006)
    );
  }, []);

  useFrame(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const { cursorX, cursorY } = useScrollStore.getState();
    const ndcX = (cursorX / window.innerWidth) * 2 - 1;
    const ndcY = -(cursorY / window.innerHeight) * 2 + 1;

    const positions = positionsRef.current;

    for (let i = 0; i < INSTANCE_COUNT; i++) {
      const ix = i * 3;
      const factor = lerpFactors[i];
      const prevX = positions[ix];
      const prevY = positions[ix + 1];
      const prevZ = positions[ix + 2];

      const targetX = i === 0 ? ndcX : positions[(i - 1) * 3];
      const targetY = i === 0 ? ndcY : positions[(i - 1) * 3 + 1];

      positions[ix] = prevX + (targetX - prevX) * factor;
      positions[ix + 1] = prevY + (targetY - prevY) * factor;
      positions[ix + 2] = prevZ + (0 - prevZ) * factor;

      dummy.position.set(positions[ix], positions[ix + 1], positions[ix + 2]);
      const scale = 1 - i * 0.04;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, INSTANCE_COUNT]}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshBasicMaterial
        color={0x00f0ff}
        toneMapped={false}
        transparent
        opacity={0.9}
      />
    </instancedMesh>
  );
}
