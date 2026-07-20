'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { create } from 'zustand';

interface CursorState {
  x: number;
  y: number;
  scale: number;
  fill: string;
  label: string;
  setPosition: (x: number, y: number) => void;
  setHover: (data: { scale: number; fill: string; label: string } | null) => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  x: 0,
  y: 0,
  scale: 20,
  fill: 'transparent',
  label: '',
  setPosition: (x: number, y: number) => set({ x, y }),
  setHover: (data) =>
    set(
      data ?? { scale: 20, fill: 'transparent', label: '' }
    ),
}));

export function CustomCursor() {
  const { x, y, scale, fill, label, setPosition } = useCursorStore();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkPointer = () => {
      setIsFinePointer(window.matchMedia('(pointer: fine)').matches);
    };
    checkPointer();
    const mediaQuery = window.matchMedia('(pointer: fine)');
    mediaQuery.addEventListener('change', checkPointer);
    return () => mediaQuery.removeEventListener('change', checkPointer);
  }, []);

  useEffect(() => {
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isFinePointer, setPosition]);

  // Smooth follow using gsap.quickTo
  useEffect(() => {
    if (!isFinePointer || !cursorRef.current) return;

    const quickX = gsap.quickTo(cursorRef.current, 'x', { duration: 0.4, ease: 'power3' });
    const quickY = gsap.quickTo(cursorRef.current, 'y', { duration: 0.4, ease: 'power3' });

    const animate = () => {
      quickX(x - scale / 2);
      quickY(y - scale / 2);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isFinePointer, x, y, scale]);

  if (!isFinePointer) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-difference transition-all duration-300"
      style={{
        width: scale,
        height: scale,
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.6)',
        background: fill,
        transform: `translate(${x - scale / 2}px, ${y - scale / 2}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: '#4DE8D4',
        whiteSpace: 'nowrap',
        opacity: label ? 1 : 1,
      }}
      aria-hidden="true"
    >
      {label && <span style={{ opacity: label ? 1 : 0, transition: 'opacity 0.2s' }}>{label}</span>}
    </div>
  );
}

export function useCursor() {
  const { setHover } = useCursorStore();
  return {
    setHoverLabel: (label: string, scale = 56, fill = 'rgba(77,232,212,0.15)') => {
      setHover({ scale, fill, label });
    },
    clearHover: () => setHover(null),
  };
}