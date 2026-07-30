import { useRef, useEffect } from 'react';
import type { JSX } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRingStore } from '@/store/useRingStore';
import { projectsMatchingFilters, projects } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RADIUS_X = 11;
const RADIUS_Z = 11;
const OVERVIEW_POSITION = new THREE.Vector3(0, 8, 28);
const OVERVIEW_TARGET = new THREE.Vector3(0, 0, 0);
const FOCUS_OFFSET = 5;

export function CameraRig(): JSX.Element {
  const { camera } = useThree();
  const prefersReduced = useReducedMotion();
  const focusedIndex = useRingStore((state) => state.focusedIndex);
  const cameraMode = useRingStore((state) => state.cameraMode);
  const activeFilters = useRingStore((state) => state.activeFilters);
  const targetRef = useRef(new THREE.Vector3().copy(OVERVIEW_TARGET));
  const positionRef = useRef(new THREE.Vector3().copy(OVERVIEW_POSITION));

  const visibleCards = (() => {
    const filteredProjects = projectsMatchingFilters(activeFilters);
    const filteredIds = new Set(filteredProjects.map((p) => p.id));
    return projects
      .flatMap((project, projectIndex) =>
        project.images.map(() => ({ projectId: project.id, projectIndex }))
      )
      .filter((card) => filteredIds.has(card.projectId));
  })();

  useEffect(() => {
    if (cameraMode === 'focused' && focusedIndex !== null) {
      const count = visibleCards.length;
      const firstCardIndex = visibleCards.findIndex((c) => c.projectIndex === focusedIndex);
      const angle = count > 0 && firstCardIndex !== -1
        ? (firstCardIndex / count) * Math.PI * 2
        : 0;
      const planeX = RADIUS_X * Math.cos(angle);
      const planeZ = RADIUS_Z * Math.sin(angle);
      const normalX = Math.cos(angle);
      const normalZ = Math.sin(angle);

      const targetPosition = new THREE.Vector3(
        planeX + normalX * FOCUS_OFFSET,
        0,
        planeZ + normalZ * FOCUS_OFFSET
      );
      const lookAtPosition = new THREE.Vector3(planeX, 0, planeZ);

      if (prefersReduced) {
        positionRef.current.copy(targetPosition);
        targetRef.current.copy(lookAtPosition);
        camera.position.copy(positionRef.current);
        camera.lookAt(targetRef.current);
      } else {
        positionRef.current.copy(targetPosition);
        targetRef.current.copy(lookAtPosition);
      }
    } else {
      if (prefersReduced) {
        positionRef.current.copy(OVERVIEW_POSITION);
        targetRef.current.copy(OVERVIEW_TARGET);
        camera.position.copy(positionRef.current);
        camera.lookAt(targetRef.current);
      } else {
        positionRef.current.copy(OVERVIEW_POSITION);
        targetRef.current.copy(OVERVIEW_TARGET);
      }
    }
  }, [camera, cameraMode, focusedIndex, prefersReduced, visibleCards]);

  useFrame(() => {
    if (prefersReduced) return;
    camera.position.lerp(positionRef.current, 0.06);
    const currentLookAt = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion).add(camera.position);
    currentLookAt.lerp(targetRef.current, 0.06);
    camera.lookAt(currentLookAt);
  });

  return <></>;
}
