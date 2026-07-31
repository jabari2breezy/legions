import { useRef, useState, useMemo } from 'react';
import type { JSX } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
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
  hoveredCardAngle: number | null;
  setHoveredCardAngle: (angle: number | null) => void;
}

const PLANE_WIDTH = 3.1;
const PLANE_HEIGHT = 2.2;
const HOVER_SCALE = 2.6;
const NEIGHBOR_SCALE = 0.5;
const NEIGHBOR_RADIUS = 1.05;
const LERP_FACTOR = 0.12;

export function ProjectPlane({
  projectIndex,
  image,
  radiusX,
  radiusZ,
  angle,
  visible,
  hoveredCardAngle,
  setHoveredCardAngle,
}: ProjectPlaneProps): JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const billboardRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const camera = useThree((state) => state.camera);
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

  const angularDist = useMemo(() => {
    if (hoveredCardAngle === null) return Infinity;
    let dist = Math.abs(angle - hoveredCardAngle);
    dist = Math.min(dist, Math.PI * 2 - dist);
    return dist;
  }, [angle, hoveredCardAngle]);

  const isHovered = hovered || isFocused;
  const proximity = Math.max(0, 1 - angularDist / NEIGHBOR_RADIUS);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const billboard = billboardRef.current;
    const mesh = meshRef.current;
    if (!group || !billboard || !mesh) return;

    const hoverLift = isHovered ? 3.2 : 0;
    const targetPosition = position.clone().add(
      new THREE.Vector3(
        Math.cos(angle) * hoverLift,
        hoverLift * 0.35,
        Math.sin(angle) * hoverLift
      )
    );

    const dockScale =
      hoveredCardAngle === null
        ? 1
        : isHovered
          ? HOVER_SCALE
          : 1 + proximity * NEIGHBOR_SCALE;

    const targetScale = visible ? dockScale : 0.001;
    const targetOpacity = visible
      ? hoveredCardAngle !== null && !isHovered && proximity <= 0
        ? 0.28
        : 1
      : 0;

    group.position.lerp(targetPosition, LERP_FACTOR);

    const worldPos = new THREE.Vector3();
    group.getWorldPosition(worldPos);
    billboard.lookAt(camera.position);

    const speed = Math.min(delta * 8, 1);
    mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), speed);

    const material = mesh.material as THREE.MeshBasicMaterial;
    material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, speed);
    material.transparent = true;
    material.depthWrite = false;

    if (isHovered) {
      material.color.setScalar(1.1);
    } else {
      material.color.lerp(new THREE.Color(1, 1, 1), speed);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={billboardRef}>
        {/* subtle backing border behind photo */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[PLANE_WIDTH + 0.06, PLANE_HEIGHT + 0.06]} />
          <meshBasicMaterial
            color={0x111111}
            transparent
            opacity={visible ? 0.6 : 0}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh
          ref={meshRef}
          position={[0, 0, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            setHoveredCardAngle(angle);
          }}
          onPointerOut={() => {
            setHovered(false);
            setHoveredCardAngle(null);
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
    </group>
  );
}
