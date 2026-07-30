import { useRef, useEffect } from 'react';
import type { JSX } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useRingStore } from '@/store/useRingStore';
import { projects } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const OVERVIEW_POSITION = new THREE.Vector3(0, 0, 18);
const OVERVIEW_TARGET = new THREE.Vector3(0, 0, 0);
const FOCUS_OFFSET = 6;

export function CameraRig(): JSX.Element {
  const { camera } = useThree();
  const prefersReduced = useReducedMotion();
  const focusedIndex = useRingStore((state) => state.focusedIndex);
  const cameraMode = useRingStore((state) => state.cameraMode);
  const targetRef = useRef(new THREE.Vector3().copy(OVERVIEW_TARGET));
  const positionRef = useRef(new THREE.Vector3().copy(OVERVIEW_POSITION));

  useEffect(() => {
    if (cameraMode === 'focused' && focusedIndex !== null) {
      const count = projects.length;
      const angle = (focusedIndex / count) * Math.PI * 2;
      const radius = 8;
      const planeX = radius * Math.cos(angle);
      const planeZ = radius * Math.sin(angle);
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
        gsap.to(positionRef.current, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: 1.2,
          ease: 'power2.out',
        });
        gsap.to(targetRef.current, {
          x: lookAtPosition.x,
          y: lookAtPosition.y,
          z: lookAtPosition.z,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    } else {
      if (prefersReduced) {
        positionRef.current.copy(OVERVIEW_POSITION);
        targetRef.current.copy(OVERVIEW_TARGET);
        camera.position.copy(positionRef.current);
        camera.lookAt(targetRef.current);
      } else {
        gsap.to(positionRef.current, {
          x: OVERVIEW_POSITION.x,
          y: OVERVIEW_POSITION.y,
          z: OVERVIEW_POSITION.z,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to(targetRef.current, {
          x: OVERVIEW_TARGET.x,
          y: OVERVIEW_TARGET.y,
          z: OVERVIEW_TARGET.z,
          duration: 1,
          ease: 'power2.out',
        });
      }
    }
  }, [camera, cameraMode, focusedIndex, prefersReduced]);

  useFrame(() => {
    camera.position.lerp(positionRef.current, 0.08);
    camera.lookAt(targetRef.current);
  });

  return <></>;
}
