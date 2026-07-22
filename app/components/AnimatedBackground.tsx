'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

interface AnimatedBackgroundProps {
  variant?: 'default' | 'hero' | 'subtle'
  className?: string
}

export default function AnimatedBackground({ variant = 'default', className = '' }: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const orbs = containerRef.current.querySelectorAll('.orb')
    
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-80, 80)`,
        y: `random(-80, 80)`,
        scale: `random(0.8, 1.2)`,
        duration: `random(8, 15)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 2
      })
    })
  }, { scope: containerRef })

  const orbConfigs = {
    default: [
      { color: 'bg-[var(--color-cyan)]/10', size: 'w-[500px] h-[500px]', blur: 'blur-[120px]' },
      { color: 'bg-[#6366f1]/8', size: 'w-[400px] h-[400px]', blur: 'blur-[100px]' },
      { color: 'bg-[var(--color-cyan)]/5', size: 'w-[600px] h-[600px]', blur: 'blur-[150px]' },
    ],
    hero: [
      { color: 'bg-[var(--color-cyan)]/15', size: 'w-[700px] h-[700px]', blur: 'blur-[150px]' },
      { color: 'bg-[#8b5cf6]/10', size: 'w-[500px] h-[500px]', blur: 'blur-[120px]' },
      { color: 'bg-[var(--color-cyan)]/8', size: 'w-[800px] h-[800px]', blur: 'blur-[180px]' },
      { color: 'bg-[#3b82f6]/6', size: 'w-[400px] h-[400px]', blur: 'blur-[100px]' },
    ],
    subtle: [
      { color: 'bg-[var(--color-cyan)]/6', size: 'w-[400px] h-[400px]', blur: 'blur-[100px]' },
      { color: 'bg-[#6366f1]/4', size: 'w-[300px] h-[300px]', blur: 'blur-[80px]' },
    ]
  }

  const orbs = orbConfigs[variant]

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`orb absolute rounded-full ${orb.color} ${orb.size} ${orb.blur}`}
          style={{
            top: `${20 + (i * 25)}%`,
            left: `${10 + (i * 20)}%`,
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  )
}
