import { useRef, useState, useMemo } from 'react';
import type { JSX } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRingStore } from '@/store/useRingStore';

interface ProjectPlaneProps {
  projectIndex: number;
  image: string;
  radiusX: number;
  radiusZ: number;
  angle: number;
  visible: boolean;
  anyHovered: boolean;
  setAnyHovered: (hovered: boolean) => void;
}

const PLANE_WIDTH = 1.6;
const PLANE_HEIGHT = 1.1;

export function ProjectPlane({
  projectIndex,
  image,
  radiusX,
  radiusZ,
  angle,
  visible,
  anyHovered,
  setAnyHovered,
}: ProjectPlaneProps): JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const setFocusedIndex = useRingStore((state) => state.setFocusedIndex);
  const focusedIndex = useRingStore((state) => state.focusedIndex);
  const isFocused = focusedIndex === projectIndex;

  const texture = useTexture(image);
  texture.colorSpace = THREE.SRGBColorSpace;

  const position = useMemo(() => {
    return new THREE.Vector3(
      radiusX * Math.cos(angle),
      0,
      radiusZ * Math.sin(angle)
    );
  }, [radiusX, radiusZ, angle]);

  const rotationY = useMemo(() => angle + Math.PI / 2, [angle]);
  const tiltX = useMemo(() => Math.sin(angle * 3) * 0.08 + 0.05, [angle]);
  const tiltZ = useMemo(() => Math.cos(angle * 5) * 0.05, [angle]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    const targetScale = visible ? (hovered || isFocused ? 1.12 : 1) : 0.001;
    const targetOpacity = visible ? (anyHovered && !hovered && !isFocused ? 0.35 : 1) : 0;

    group.position.lerp(position, 0.1);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, rotationY, 0.1);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, tiltX, 0.1);
    group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, tiltZ, 0.1);

    const speed = Math.min(delta * 8, 1);
    mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), speed);

    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, speed);
    material.transparent = true;
    material.depthWrite = false;

    if (hovered) {
      material.color.setScalar(1.08);
    } else {
      material.color.lerp(new THREE.Color(1, 1, 1), speed);
    }
  });

  return (
    <group ref={groupRef}>
      {/* White border backing */}
      <mesh position={[0, 0, 0.01]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[PLANE_WIDTH + 0.05, PLANE_HEIGHT + 0.05]} />
        <meshBasicMaterial
          color={0xffffff}
          transparent
          opacity={visible ? 1 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Soft shadow */}
      <mesh position={[0.03, -0.03, 0.005]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[PLANE_WIDTH + 0.05, PLANE_HEIGHT + 0.05]} />
        <meshBasicMaterial
          color={0x000000}
          transparent
          opacity={visible ? 0.06 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        rotation={[0, Math.PI, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setAnyHovered(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          setAnyHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          setFocusedIndex(projectIndex);
        }}
      >
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent
          opacity={visible ? 1 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
