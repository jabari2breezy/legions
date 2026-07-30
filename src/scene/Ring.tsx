import { useRef, useEffect, useMemo, useState } from 'react';
import type { JSX } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRingStore } from '@/store/useRingStore';
import { projectsMatchingFilters, projects } from '@/data/projects';
import { ProjectPlane } from './ProjectPlane';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RADIUS = 8;
const ROTATION_PER_WHEEL = 0.15;

export function Ring(): JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const { gl } = useThree();
  const prefersReduced = useReducedMotion();
  const targetRotation = useRingStore((state) => state.targetRotation);
  const addTargetRotation = useRingStore((state) => state.addTargetRotation);
  const activeFilters = useRingStore((state) => state.activeFilters);
  const [anyHovered, setAnyHovered] = useState(false);

  const filteredProjects = useMemo(
    () => projectsMatchingFilters(activeFilters),
    [activeFilters]
  );

  const visibleIndices = useMemo(() => {
    return projects
      .map((project, index) =>
        filteredProjects.some((p) => p.id === project.id) ? index : -1
      )
      .filter((index) => index !== -1);
  }, [filteredProjects]);

  const angles = useMemo(() => {
    const count = visibleIndices.length;
    const map = new Map<number, number>();
    visibleIndices.forEach((globalIndex, localIndex) => {
      const angle = count > 0 ? (localIndex / count) * Math.PI * 2 : 0;
      map.set(globalIndex, angle);
    });
    return map;
  }, [visibleIndices]);

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

  useEffect(() => {
    const canvas = gl.domElement;
    let startX = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent): void => {
      isDragging = true;
      startX = e.clientX;
    };

    const onPointerMove = (e: PointerEvent): void => {
      if (!isDragging) return;
      const delta = e.clientX - startX;
      addTargetRotation(delta * 0.005);
      startX = e.clientX;
    };

    const onPointerUp = (): void => {
      isDragging = false;
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerleave', onPointerUp);

    return () => {
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerleave', onPointerUp);
    };
  }, [gl, addTargetRotation]);



  return (
    <group ref={groupRef}>
      {projects.map((project, index) => (
        <ProjectPlane
          key={project.id}
          project={project}
          index={index}
          radius={RADIUS}
          angle={angles.get(index) ?? 0}
          visible={visibleIndices.includes(index)}
          anyHovered={anyHovered}
          setAnyHovered={setAnyHovered}
        />
      ))}
    </group>
  );
}
