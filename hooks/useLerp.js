import { useEffect, useRef } from 'react';

export function useLerp(target, current, factor = 0.05) {
  const animationRef = useRef();

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

export function useValueLerp(target, current, factor = 0.1) {
  const currentRef = useRef(current);
  const targetRef = useRef(target);
  const animationRef = useRef();

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