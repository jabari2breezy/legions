import { useEffect, useRef } from 'react';

export function useLerp(
  target: { x: number; y: number },
  current: { x: number; y: number },
  factor: number = 0.05
) {
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const lerp = () => {
      current.x += (target.x - current.x) * factor;
      current.y += (target.y - current.y) * factor;
      animationRef.current = requestAnimationFrame(lerp);
    };
    lerp();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [target, current, factor]);

  return current;
}

export function useValueLerp(target: number, current: number, factor: number = 0.1): number {
  const currentRef = useRef(current);
  const targetRef = useRef(target);
  const animationRef = useRef<number | undefined>(undefined);

  targetRef.current = target;

  useEffect(() => {
    const lerp = () => {
      currentRef.current += (targetRef.current - currentRef.current) * factor;
      animationRef.current = requestAnimationFrame(lerp);
    };
    lerp();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [factor]);

  return currentRef.current;
}