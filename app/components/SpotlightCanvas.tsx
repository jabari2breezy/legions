'use client'

import { useEffect, useRef, useState } from 'react'

interface SpotlightCanvasProps {
  className?: string
  intensity?: number
  color?: string
}

export default function SpotlightCanvas({ className = '', intensity = 0.6, color = '#00D4C8' }: SpotlightCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      if (!reducedMotion) {
        // Lerp smoothing for organic feel
        currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.08
        currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.08
      }

      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const cx = currentRef.current.x * width
      const cy = currentRef.current.y * height
      const maxRadius = Math.max(width, height) * 0.7

      // Outer glow gradient
      const gradient1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius * 0.5)
      gradient1.addColorStop(0, `${color}00`)
      gradient1.addColorStop(0.3, `${color}${Math.round(intensity * 30).toString(16).padStart(2, '0')}`)
      gradient1.addColorStop(1, `${color}00`)

      // Inner bright spot
      const gradient2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxRadius * 0.15)
      gradient2.addColorStop(0, `${color}${Math.round(intensity * 100).toString(16).padStart(2, '0')}`)
      gradient2.addColorStop(0.5, `${color}${Math.round(intensity * 40).toString(16).padStart(2, '0')}`)
      gradient2.addColorStop(1, `${color}00`)

      // Draw outer glow
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, width, height)

      // Draw inner spot
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, width, height)

      // Additional subtle cyan ring
      const gradient3 = ctx.createRadialGradient(cx, cy, maxRadius * 0.3, cx, cy, maxRadius * 0.5)
      gradient3.addColorStop(0, '#11C7CA00')
      gradient3.addColorStop(0.5, '#11C7CA10')
      gradient3.addColorStop(1, '#11C7CA00')
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, width, height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [reducedMotion, intensity, color])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  )
}