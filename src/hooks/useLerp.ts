import { useState, useEffect } from 'react';

export function useLerp(target: number, factor = 0.08): number {
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    let rafId: number;

    const tick = (): void => {
      setCurrent((prev) => prev + (target - prev) * factor);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(rafId); };
  }, [target, factor]);

  return current;
}
