import React from 'react';

export default function Logo({ width = 40, height = 60, className = '' }) {
  return (
    <svg 
      className={`logo-glow ${className}`} 
      width={width} 
      height={height} 
      viewBox="0 0 60 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0px 0px 8px var(--color-accent-cyan))' }}
    >
      {/* Lantern Outline */}
      <path d="M30 5 L45 25 L40 80 L30 95 L20 80 L15 25 Z" stroke="var(--color-accent-cyan)" strokeWidth="2" fill="rgba(77, 232, 212, 0.1)" />
      
      {/* Top Medallion */}
      <circle cx="30" cy="15" r="3" fill="var(--color-accent-cyan)" />
      
      {/* Bottom Medallion */}
      <circle cx="30" cy="85" r="3" fill="var(--color-accent-cyan)" />
      
      {/* Swirl Inside (Abstract representation of Image 2 logo) */}
      <path d="M25 45 C 40 45, 40 65, 30 65 C 20 65, 20 40, 30 40 C 35 40, 35 55, 30 55" stroke="var(--color-accent-cyan)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="25" cy="50" r="3" fill="var(--color-accent-cyan)" />
    </svg>
  );
}
