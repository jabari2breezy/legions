'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'

interface MarqueeProps {
  items: React.ReactNode[]
  speed?: number
  direction?: 'left' | 'right'
}

export default function Marquee({ items, speed = 30, direction = 'left' }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    const clone = track.cloneNode(true)
    containerRef.current?.appendChild(clone)

    gsap.to(containerRef.current?.children as HTMLCollection, {
      xPercent: direction === 'left' ? -100 : 100,
      ease: 'none',
      duration: speed,
      repeat: -1,
    })
  }, { scope: containerRef, dependencies: [speed, direction] })

  return (
    <div className="overflow-hidden whitespace-nowrap flex w-full relative py-8 border-y border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--color-bg-deep)] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--color-bg-deep)] to-transparent z-10"></div>
      
      <div ref={containerRef} className="flex w-fit">
        <div ref={trackRef} className="flex shrink-0 items-center gap-16 px-8">
          {items.map((item, i) => (
            <div key={i} className="inline-block text-[var(--font-size-h3)] font-mono font-medium text-[var(--color-text-secondary)]">
              {item}
              <span className="ml-16 text-[var(--color-cyan)] opacity-50">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
