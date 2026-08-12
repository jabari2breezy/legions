'use client'

import dynamic from 'next/dynamic'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

const HeroOrbScene = dynamic(() => import('./HeroOrbScene'), { ssr: false })

export default function HomeHero() {
  const shellRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [desktop, setDesktop] = useState(false)
  const [motionSafe, setMotionSafe] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setDesktop(window.innerWidth >= 768)
      setMotionSafe(!mq.matches)
    }

    update()
    mq.addEventListener('change', update)
    window.addEventListener('resize', update)

    return () => {
      mq.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const handleMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const element = shellRef.current
    if (!element) return
    const rect = element.getBoundingClientRect()
    pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
    element.style.setProperty('--hero-pointer-x', pointerRef.current.x.toFixed(3))
    element.style.setProperty('--hero-pointer-y', pointerRef.current.y.toFixed(3))
  }

  const handleLeave = () => {
    pointerRef.current.x = 0
    pointerRef.current.y = 0
    const element = shellRef.current
    if (!element) return
    element.style.setProperty('--hero-pointer-x', '0')
    element.style.setProperty('--hero-pointer-y', '0')
  }

  return (
    <section
      ref={shellRef}
      className="hero-shell"
      data-scroll-panel
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="hero-shell-grid" aria-hidden="true" />
      <div className="hero-shell-glow" aria-hidden="true" />
      <div className="hero-copy">
        <span className="hero-kicker">Dar es Salaam, Tanzania</span>
        <h1 className="hero-wordmark">LEGIONS</h1>
        <p className="hero-line">
          We don&apos;t wait. We show up. Hands first, overhead last.
        </p>
        <p className="hero-meta">
          Youth-led volunteering · @legions.tz · direct to the ground
        </p>
      </div>

      <div className="hero-orb-stage">
        {desktop && motionSafe ? (
          <div className="hero-orb-canvas">
            <HeroOrbScene />
          </div>
        ) : (
          <div className="hero-orb-css" aria-hidden="true" />
        )}
      </div>

      <div className="hero-scroll-cue">
        <span>Scroll for proof</span>
        <span className="hero-scroll-line" />
      </div>
    </section>
  )
}
