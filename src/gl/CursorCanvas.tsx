import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ParticleField } from './ParticleField';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { cn } from '@/utils/cn';

export function CursorCanvas(): JSX.Element | null {
  const { isMobile } = useIsTouchDevice();
  const prefersReduced = useReducedMotion();
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (isMobile || prefersReduced) return;

    const onOver = (e: MouseEvent): void => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor-hover]')) {
        setHovering(true);
      }
    };

    const onOut = (e: MouseEvent): void => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('[data-cursor-hover]')) {
        setHovering(false);
      }
    };

    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [isMobile, prefersReduced]);

  if (isMobile) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 pointer-events-none">
        <Canvas
          orthographic
          gl={{ alpha: true, antialias: true }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <ParticleField />
        </Canvas>
      </div>
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          className={cn(
            'fixed inset-0 z-40 pointer-events-none rounded-full',
            'backdrop-blur-2xl bg-white/10'
          )}
          animate={{
            scale: hovering ? 1.5 : 0,
            opacity: hovering ? 0.4 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ width: '120px', height: '120px', margin: 'auto' }}
        />
      )}
    </>
  );
}
