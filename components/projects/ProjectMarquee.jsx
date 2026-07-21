'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { projects } from '../../lib/projects-data';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function ProjectMarquee({ isActive }) {
  const rowsRef = useRef([[], [], []]);
  const tweensRef = useRef([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isActive) {
      tweensRef.current.forEach((tween) => tween?.pause());
      return;
    }

    rowsRef.current.forEach((row, rowIndex) => {
      if (!row.length) return;
      const rowEl = row[0]?.parentElement;
      if (!rowEl) return;

      const existingTween = tweensRef.current[rowIndex];
      if (existingTween) {
        existingTween.play();
        existingTween.timeScale(1);
      } else {
        const duration = [45, 60, 38][rowIndex] || 50;
        const direction = rowIndex % 2 === 0 ? -50 : 50;
        const startX = rowIndex % 2 === 0 ? 0 : -50;

        gsap.set(rowEl, { xPercent: startX });

        const tween = gsap.to(rowEl, {
          xPercent: direction,
          duration,
          repeat: -1,
          ease: 'none',
        });
        tweensRef.current[rowIndex] = tween;
      }
    });
  }, [isActive]);

  const createRow = (rowIndex) => {
    const images = [...projects, ...projects];
    const duration = [45, 60, 38][rowIndex] || 50;
    const direction = rowIndex % 2 === 0 ? -50 : 50;
    const startX = rowIndex % 2 === 0 ? 0 : -50;

    return (
      <div
        key={rowIndex}
        ref={(el) => {
          if (el) rowsRef.current[rowIndex] = Array.from(el.children);
        }}
        className="flex whitespace-nowrap will-change-transform"
        style={{
          transform: `translateX(${startX}%)`,
          filter: 'brightness(0.5) saturate(0.7)',
          opacity: 0.6,
        }}
        aria-hidden="true"
      >
        {images.map((project, i) => (
          <div
            key={`${rowIndex}-${i}`}
            className="flex-shrink-0 w-[300px] h-[375px] md:w-[350px] md:h-[438px] lg:w-[400px] lg:h-[500px] mx-4 relative"
            style={{ aspectRatio: '4/5' }}
          >
            <img
              src={project.mainImage}
              alt=""
              className="w-full h-full object-cover rounded-[20px]"
              style={{
                filter: 'sepia(0.3) hue-rotate(200deg) saturate(1.4) brightness(0.5)',
              }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    );
  };

  if (reducedMotion) {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="flex flex-col h-full justify-between px-8">
          {createRow(0)}
          {createRow(1)}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="flex flex-col h-full justify-between px-8">
        {createRow(0)}
        {createRow(1)}
        {createRow(2)}
      </div>
    </div>
  );
}