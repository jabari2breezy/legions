"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring, useMotionValue, animate } from "motion/react";
import Link from "next/link";
import projectsIndex from "@/data/projects-index.json";

const FRICTION = 0.94;
const SNAP_STIFFNESS = 200;
const SNAP_DAMPING = 30;
const ITEM_COUNT = projectsIndex.length;
const ANGLE_PER_ITEM = 360 / ITEM_COUNT;
const TRANSLATE_Z = 600;

interface PhotoWheelProps {
  onActiveChange?: (index: number) => void;
}

export function PhotoWheel({ onActiveChange }: PhotoWheelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, {
    stiffness: SNAP_STIFFNESS,
    damping: SNAP_DAMPING,
  });

  const velocityRef = useRef(0);
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isDraggingRef = useRef(false);
  const animFrameRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate active index from rotation
  useEffect(() => {
    const unsubscribe = smoothRotation.on("change", (v) => {
      const normalized = ((v % 360) + 360) % 360;
      const idx = Math.round(normalized / ANGLE_PER_ITEM) % ITEM_COUNT;
      const clampedIdx = ((idx % ITEM_COUNT) + ITEM_COUNT) % ITEM_COUNT;
      setActiveIndex(clampedIdx);
      onActiveChange?.(clampedIdx);
    });
    return unsubscribe;
  }, [smoothRotation, onActiveChange]);

  // Snap to nearest item
  const snapToNearest = useCallback(() => {
    const current = rotation.get();
    const normalized = ((current % 360) + 360) % 360;
    const nearestIndex = Math.round(normalized / ANGLE_PER_ITEM);
    const targetAngle = nearestIndex * ANGLE_PER_ITEM;

    // Find shortest path
    const diff = targetAngle - normalized;
    let shortDiff = diff;
    if (Math.abs(diff) > 180) {
      shortDiff = diff > 0 ? diff - 360 : diff + 360;
    }

    const finalTarget = current + (shortDiff - (normalized - (current % 360)));

    animate(rotation, finalTarget, {
      type: "spring",
      stiffness: SNAP_STIFFNESS,
      damping: SNAP_DAMPING,
    });
  }, [rotation]);

  // Inertia decay loop
  const startInertia = useCallback(() => {
    const decay = () => {
      if (isDraggingRef.current) return;

      velocityRef.current *= FRICTION;

      if (Math.abs(velocityRef.current) < 0.1) {
        snapToNearest();
        return;
      }

      rotation.set(rotation.get() + velocityRef.current);
      animFrameRef.current = requestAnimationFrame(decay);
    };

    animFrameRef.current = requestAnimationFrame(decay);
  }, [rotation, snapToNearest]);

  // Wheel handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY * 0.3;
      rotation.set(rotation.get() - delta);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [rotation]);

  // Drag handlers
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastYRef.current = e.clientY;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    cancelAnimationFrame(animFrameRef.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const dy = e.clientY - lastYRef.current;
    const dt = Date.now() - lastTimeRef.current;

    if (dt > 0) {
      velocityRef.current = (-dy / dt) * 16;
    }

    rotation.set(rotation.get() - dy * 0.5);
    lastYRef.current = e.clientY;
    lastTimeRef.current = Date.now();
  }, [rotation]);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    startInertia();
  }, [startInertia]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const current = rotation.get();
        const target = current + ANGLE_PER_ITEM;
        animate(rotation, target, {
          type: "spring",
          stiffness: SNAP_STIFFNESS,
          damping: SNAP_DAMPING,
        });
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const current = rotation.get();
        const target = current - ANGLE_PER_ITEM;
        animate(rotation, target, {
          type: "spring",
          stiffness: SNAP_STIFFNESS,
          damping: SNAP_DAMPING,
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [rotation]);

  // Cleanup
  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <div
      className="photo-wheel"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="photo-wheel-scene">
        <motion.div
          className="photo-wheel-cylinder"
          style={{
            rotateY: smoothRotation,
          }}
        >
          {projectsIndex.map((project, i) => {
            const angle = i * ANGLE_PER_ITEM;
            return (
              <div
                key={project.slug}
                className="photo-wheel-item"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${TRANSLATE_Z}px)`,
                }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="photo-wheel-card"
                  tabIndex={activeIndex === i ? 0 : -1}
                >
                  <div className="photo-wheel-image">
                    <img
                      src={`/projects/${project.slug}/IMG_7428.jpg`}
                      alt={project.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="photo-wheel-info">
                    <span className="photo-wheel-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="photo-wheel-title">{project.title}</span>
                    <span className="photo-wheel-cat">{project.category}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Active item indicator */}
      <div className="photo-wheel-indicator">
        <span className="photo-wheel-indicator-active">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="photo-wheel-indicator-sep">/</span>
        <span className="photo-wheel-indicator-total">
          {String(ITEM_COUNT).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
