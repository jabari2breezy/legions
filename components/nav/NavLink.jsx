'use client';

import { LiquidGlassPill } from '../ui/LiquidGlass';
import { useCursor } from '../ui/CustomCursor';

export function NavLink({ label, section, isActive, onClick }) {
  const { setHoverLabel, clearHover } = useCursor();

  return (
    <LiquidGlassPill
      className={`flex items-center gap-2 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isActive
          ? 'bg-[rgba(77,232,212,0.12)] text-white'
          : 'text-white/70 hover:text-white/90'
      }`}
      onClick={onClick}
      onMouseEnter={() => !isActive && setHoverLabel(label, 56, 'rgba(77,232,212,0.15)')}
      onMouseLeave={clearHover}
    >
      {label}
      {isActive && (
        <span
          className="w-2 h-2 rounded-full bg-[rgba(77,232,212,0.6)]"
          aria-hidden="true"
        />
      )}
    </LiquidGlassPill>
  );
}