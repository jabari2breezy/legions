import { useRef, useMemo, useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRingStore } from '@/store/useRingStore';
import { projectsMatchingFilters, projects } from '@/data/projects';
import { ProjectPlane } from './ProjectPlane';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RADIUS_X = 11;
const RADIUS_Z = 11;
const ROTATION_PER_WHEEL = 0.05;

interface PhotoCard {
  projectIndex: number;
  imageIndex: number;
  image: string;
  projectId: string;
}

export function Ring(): JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const prefersReduced = useReducedMotion();
  const targetRotation = useRingStore((state) => state.targetRotation);
  const addTargetRotation = useRingStore((state) => state.addTargetRotation);
  const activeFilters = useRingStore((state) => state.activeFilters);
  const [anyHovered, setAnyHovered] = useState(false);

  const cards = useMemo<PhotoCard[]>(() => {
    return projects.flatMap((project, projectIndex) =>
      project.images.map((image, imageIndex) => ({
        projectIndex,
        imageIndex,
        image,
        projectId: project.id,
      }))
    );
  }, []);

  const visibleCards = useMemo(() => {
    const filteredProjects = projectsMatchingFilters(activeFilters);
    const filteredIds = new Set(filteredProjects.map((p) => p.id));
    return cards
      .map((card, index) => (filteredIds.has(card.projectId) ? index : -1))
      .filter((index) => index !== -1);
  }, [cards, activeFilters]);

  const angles = useMemo(() => {
    const count = visibleCards.length;
    const map = new Map<number, number>();
    visibleCards.forEach((cardIndex, localIndex) => {
      const angle = count > 0 ? (localIndex / count) * Math.PI * 2 : 0;
      map.set(cardIndex, angle);
    });
    return map;
  }, [visibleCards]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (prefersReduced) {
      group.rotation.y = targetRotation;
    } else {
      const lerp = Math.min(delta * 3, 1);
      const { currentRotation, targetRotation: target } = useRingStore.getState();
      const next = currentRotation + (target - currentRotation) * lerp;
      useRingStore.setState({ currentRotation: next });
      group.rotation.y = next;
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    const onWheel = (e: WheelEvent): void => {
      e.preventDefault();
      addTargetRotation(e.deltaY * ROTATION_PER_WHEEL * 0.01);
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      canvas.removeEventListener('wheel', onWheel);
    };
  }, [gl, addTargetRotation]);

  // Drag rotation via a full-screen invisible plane behind the photos
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const onPointerDown = (e: { stopPropagation: () => void; clientX: number }): void => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const onPointerMove = (e: { clientX: number }): void => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 1) {
      addTargetRotation(delta * 0.004);
      dragStartX.current = e.clientX;
    }
  };

  const onPointerUp = (): void => {
    setIsDragging(false);
  };

  return (
    <group ref={groupRef}>
      <mesh
        position={[0, 0, -2]}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {cards.map((card, index) => (
        <ProjectPlane
          key={`${card.projectId}-${card.imageIndex}`}
          projectIndex={card.projectIndex}
          image={card.image}
          radiusX={RADIUS_X}
          radiusZ={RADIUS_Z}
          angle={angles.get(index) ?? 0}
          visible={visibleCards.includes(index)}
          anyHovered={anyHovered}
          setAnyHovered={setAnyHovered}
        />
      ))}
    </group>
  );
}
