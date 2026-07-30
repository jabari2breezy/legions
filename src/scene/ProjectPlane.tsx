import { useRef, useState, useMemo } from 'react';
import type { JSX } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useRingStore } from '@/store/useRingStore';
import type { Project } from '@/data/projects';

interface ProjectPlaneProps {
  project: Project;
  index: number;
  radius: number;
  angle: number;
  visible: boolean;
  anyHovered: boolean;
  setAnyHovered: (hovered: boolean) => void;
}

const PLANE_WIDTH = 3.2;
const PLANE_HEIGHT = 2;

export function ProjectPlane({
  project,
  index,
  radius,
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
  const isFocused = focusedIndex === index;

  const texture = useTexture(project.images[0] ?? '/og-card.png');
  texture.colorSpace = THREE.SRGBColorSpace;

  const position = useMemo(() => {
    return new THREE.Vector3(
      radius * Math.cos(angle),
      0,
      radius * Math.sin(angle)
    );
  }, [radius, angle]);

  const rotationY = useMemo(() => angle + Math.PI / 2, [angle]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const mesh = meshRef.current;
    if (!group || !mesh) return;

    const targetScale = visible ? (hovered || isFocused ? 1.05 : 1) : 0.001;
    const targetOpacity = visible ? (anyHovered && !hovered && !isFocused ? 0.5 : 1) : 0;

    group.position.lerp(position, 0.1);
    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, rotationY, 0.1);

    const speed = Math.min(delta * 8, 1);
    mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), speed);

    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, speed);
    material.transparent = true;
    material.depthWrite = false;

    if (hovered) {
      material.color.setScalar(1.15);
    } else {
      material.color.lerp(new THREE.Color(1, 1, 1), speed);
    }
  });

  return (
    <group ref={groupRef}>
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
          setFocusedIndex(index);
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
      <mesh position={[0, 0, 0.02]} rotation={[0, Math.PI, 0]} visible={false}>
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
      </mesh>
    </group>
  );
}
