import { useRef, useMemo, useState, useEffect } from 'react';
import type { JSX } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useRingStore } from '@/store/useRingStore';
import { projectsMatchingFilters, projects } from '@/data/projects';
import { ProjectPlane } from './ProjectPlane';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const RADIUS_X = 15;
const RADIUS_Z = 15;
const RADIUS_X_MOBILE = 10;
const RADIUS_Z_MOBILE = 10;
const ROTATION_PER_WHEEL = 0.05;
const LABEL_OFFSET = 2.6;
const PHOTOS_PER_PROJECT = 3;

interface PhotoCard {
  globalIndex: number;
  projectIndex: number;
  imageIndex: number;
  image: string;
  projectId: string;
  representativeIndex: number;
}

interface ProjectSlice {
  projectIndex: number;
  projectId: string;
  label: string;
  startAngle: number;
  endAngle: number;
  labelAngle: number;
  cards: PhotoCard[];
}

function ProjectLabel({
  label,
  angle,
  radiusX,
  radiusZ,
}: {
  label: string;
  angle: number;
  radiusX: number;
  radiusZ: number;
}): JSX.Element {
  const x = (radiusX + LABEL_OFFSET) * Math.cos(angle);
  const z = (radiusZ + LABEL_OFFSET) * Math.sin(angle);

  return (
    <Html
      position={[x, 0.95, z]}
      center
      transform={false}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span className="rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-sm font-semibold tracking-wide text-white shadow-xl backdrop-blur-md md:text-base">
        {label}
      </span>
    </Html>
  );
}

export function Ring(): JSX.Element {
  const groupRef = useRef<THREE.Group>(null);
  const { gl, size } = useThree();
  const isMobile = size.width < 768;
  const radiusX = isMobile ? RADIUS_X_MOBILE : RADIUS_X;
  const radiusZ = isMobile ? RADIUS_Z_MOBILE : RADIUS_Z;
  const prefersReduced = useReducedMotion();
  const targetRotation = useRingStore((state) => state.targetRotation);
  const addTargetRotation = useRingStore((state) => state.addTargetRotation);
  const activeFilters = useRingStore((state) => state.activeFilters);
  const [anyHovered, setAnyHovered] = useState(false);

  const allCards = useMemo<PhotoCard[]>(() => {
    let globalIndex = 0;
    return projects.flatMap((project, projectIndex) =>
      project.images
        .slice(0, PHOTOS_PER_PROJECT)
        .map((image, representativeIndex) => {
          const card = {
            globalIndex,
            projectIndex,
            imageIndex: project.images.indexOf(image),
            image,
            projectId: project.id,
            representativeIndex,
          };
          globalIndex += 1;
          return card;
        })
    );
  }, []);

  const visibleProjects = useMemo(() => {
    const filtered = projectsMatchingFilters(activeFilters);
    return filtered.map((p) => p.id);
  }, [activeFilters]);

  const slices = useMemo<ProjectSlice[]>(() => {
    const visibleProjectIds = new Set(visibleProjects);
    const visibleProjectList = projects
      .map((project, index) => ({ project, index }))
      .filter(({ project }) => visibleProjectIds.has(project.id));

    const count = visibleProjectList.length;
    const sliceAngle = count > 0 ? (Math.PI * 2) / count : 0;
    const photoSpread = Math.min(sliceAngle * 0.85, Math.PI / 3);

    return visibleProjectList.map(({ project, index }, visibleIndex) => {
      const startAngle = visibleIndex * sliceAngle - Math.PI / 2;
      const endAngle = startAngle + photoSpread;
      const labelAngle = startAngle + sliceAngle / 2;
      const cards = allCards
        .filter((card) => card.projectId === project.id)
        .map((card, i, arr) => {
          const t = arr.length > 1 ? i / (arr.length - 1) : 0.5;
          return { ...card, angle: startAngle + t * photoSpread };
        });

      return {
        projectIndex: index,
        projectId: project.id,
        label: project.title,
        startAngle,
        endAngle,
        labelAngle,
        cards,
      };
    });
  }, [allCards, visibleProjects]);

  const cardAngles = useMemo(() => {
    const map = new Map<number, number>();
    slices.forEach((slice) => {
      slice.cards.forEach((card) => {
        map.set(card.globalIndex, card.angle);
      });
    });
    return map;
  }, [slices]);

  const visibleCardIndices = useMemo(() => {
    const set = new Set<number>();
    slices.forEach((slice) => {
      slice.cards.forEach((card) => set.add(card.globalIndex));
    });
    return set;
  }, [slices]);

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
    <group ref={groupRef} rotation={[0.25, 0, 0]}>
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

      {slices.map((slice) => (
        <ProjectLabel
          key={`label-${slice.projectId}`}
          label={slice.label}
          angle={slice.labelAngle}
          radiusX={radiusX}
          radiusZ={radiusZ}
        />
      ))}

      {allCards.map((card) => (
        <ProjectPlane
          key={`${card.projectId}-${card.imageIndex}`}
          projectIndex={card.projectIndex}
          image={card.image}
          radiusX={radiusX}
          radiusZ={radiusZ}
          angle={cardAngles.get(card.globalIndex) ?? 0}
          visible={visibleCardIndices.has(card.globalIndex)}
          anyHovered={anyHovered}
          setAnyHovered={setAnyHovered}
        />
      ))}
    </group>
  );
}
