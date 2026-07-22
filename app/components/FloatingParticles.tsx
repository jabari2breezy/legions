'use client'

import { useEffect, useRef } from 'react'

interface FloatingParticlesProps {
  count?: number
  className?: string
}

export default function FloatingParticles({ count = 25, className = '' }: FloatingParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const particles: HTMLDivElement[] = []

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      const size = Math.random() * 3 + 1
      
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: var(--color-cyan);
        border-radius: 50%;
        opacity: 0;
        pointer-events: none;
        animation: particle-float ${Math.random() * 10 + 8}s linear infinite;
        animation-delay: ${Math.random() * 10}s;
        left: ${Math.random() * 100}%;
        bottom: -10px;
      `
      
      container.appendChild(particle)
      particles.push(particle)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [count])

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    />
  )
}
