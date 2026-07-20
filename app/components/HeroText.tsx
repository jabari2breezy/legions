'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import SplitType from 'split-type'

interface HeroTextProps {
  className?: string
  delay?: number
}

export default function HeroText({ className = '', delay = 0 }: HeroTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const splitRef = useRef<InstanceType<typeof SplitType> | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const el = textRef.current
    if (!el) return

    // Initialize SplitType
    splitRef.current = new SplitType(el, {
      types: 'chars',
      charClass: 'hero-char',
    })

    const chars = el.querySelectorAll('.hero-char')

    if (reducedMotion) {
      gsap.set(chars, { opacity: 1, y: 0, rotateX: 0 })
      return
    }

    // Staggered character reveal animation
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: '120%',
        rotateX: 80,
        transformOrigin: 'center bottom',
      },
      {
        opacity: 1,
        y: '0%',
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.03,
        delay,
      }
    )

    return () => {
      splitRef.current?.revert()
    }
  }, [delay, reducedMotion])

  return (
    <div
      ref={textRef}
      className={`overflow-hidden ${className}`}
      aria-label="LEGIONS"
    >
      LEGIONS
    </div>
  )
}