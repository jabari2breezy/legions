'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  className?: string
  external?: boolean
}

export default function MagneticButton({
  href,
  children,
  className = '',
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (reducedMotion) return

    let frame = 0
    let targetX = 0
    let targetY = 0
    let targetGlow = 0
    let currentX = 0
    let currentY = 0
    let currentGlow = 0

    const clamp = (value: number, min: number, max: number) =>
      Math.min(max, Math.max(min, value))

    const animate = () => {
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14
      currentGlow += (targetGlow - currentGlow) * 0.12
      element.style.setProperty('--magnetic-x', `${currentX.toFixed(2)}px`)
      element.style.setProperty('--magnetic-y', `${currentY.toFixed(2)}px`)
      element.style.setProperty('--magnetic-glow', currentGlow.toFixed(3))
      frame = window.requestAnimationFrame(animate)
    }

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const deltaX = event.clientX - centerX
      const deltaY = event.clientY - centerY
      const distance = Math.hypot(deltaX, deltaY)
      const radius = 60
      const strength = clamp(1 - distance / radius, 0, 1)
      targetX = clamp((deltaX / radius) * 8, -8, 8)
      targetY = clamp((deltaY / radius) * 8, -8, 8)
      targetGlow = strength
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
      targetGlow = 0
    }

    element.addEventListener('pointermove', onMove)
    element.addEventListener('pointerleave', onLeave)
    frame = window.requestAnimationFrame(animate)

    return () => {
      element.removeEventListener('pointermove', onMove)
      element.removeEventListener('pointerleave', onLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const classes = `magnetic-button ${className}`.trim()

  if (external) {
    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <Link ref={ref} href={href} className={classes}>
      {children}
    </Link>
  )
}
