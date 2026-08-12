'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

type GlassSurfaceProps = {
  className?: string
  children: ReactNode
}

export default function GlassSurface({
  className = '',
  children,
}: GlassSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (reducedMotion) return

    let frame = 0
    let targetX = 50
    let targetY = 50
    let currentX = 50
    let currentY = 50

    const setTarget = (clientX: number, clientY: number) => {
      const rect = element.getBoundingClientRect()
      const x = ((clientX - rect.left) / rect.width) * 100
      const y = ((clientY - rect.top) / rect.height) * 100
      targetX = Math.max(0, Math.min(100, x))
      targetY = Math.max(0, Math.min(100, y))
      const offsetX = (targetX - 50) / 5
      const offsetY = (targetY - 50) / 5
      element.style.setProperty('--card-tilt-x', `${offsetX.toFixed(2)}deg`)
      element.style.setProperty('--card-tilt-y', `${(-offsetY).toFixed(2)}deg`)
      element.style.setProperty('--card-glow-x', `${targetX.toFixed(2)}%`)
      element.style.setProperty('--card-glow-y', `${targetY.toFixed(2)}%`)
    }

    const onPointerMove = (event: PointerEvent) => setTarget(event.clientX, event.clientY)

    const onPointerLeave = () => {
      targetX = 50
      targetY = 50
    }

    const animate = () => {
      currentX += (targetX - currentX) * 0.12
      currentY += (targetY - currentY) * 0.12
      const offsetX = (currentX - 50) / 5
      const offsetY = (currentY - 50) / 5
      element.style.setProperty('--card-tilt-x', `${offsetX.toFixed(2)}deg`)
      element.style.setProperty('--card-tilt-y', `${(-offsetY).toFixed(2)}deg`)
      element.style.setProperty('--card-glow-x', `${currentX.toFixed(2)}%`)
      element.style.setProperty('--card-glow-y', `${currentY.toFixed(2)}%`)
      frame = window.requestAnimationFrame(animate)
    }

    element.addEventListener('pointermove', onPointerMove)
    element.addEventListener('pointerleave', onPointerLeave)
    frame = window.requestAnimationFrame(animate)

    return () => {
      element.removeEventListener('pointermove', onPointerMove)
      element.removeEventListener('pointerleave', onPointerLeave)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={ref} className={`glass-surface ${className}`.trim()}>
      {children}
    </div>
  )
}
