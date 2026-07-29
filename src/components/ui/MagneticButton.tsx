import { useRef, useState } from 'react';
import type { JSX } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { cn } from '@/utils/cn';

interface MagneticButtonProps extends HTMLMotionProps<'a'> {
  inverse?: boolean;
}

export function MagneticButton({
  children,
  inverse = false,
  className,
  href,
  ...props
}: MagneticButtonProps): JSX.Element {
  const isTouch = useIsTouchDevice();
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (isTouch || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const max = 6;
    const x = Math.max(-max, Math.min(max, distX * 0.15));
    const y = Math.max(-max, Math.min(max, distY * 0.15));
    setPosition({ x, y });
  };

  const handleMouseLeave = (): void => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor-hover=""
      className={cn(
        'inline-flex items-center justify-center rounded-full py-3 px-8 font-bold transition-colors',
        inverse
          ? 'bg-white text-black hover:bg-white/90'
          : 'bg-white text-black hover:bg-white/90',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 350,
        damping: 15,
        mass: 0.1,
      }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
