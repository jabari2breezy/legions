'use client'

import { useEffect, useRef, useState } from 'react'

interface GridBackgroundProps {
  className?: string
  color?: string
  opacity?: number
}

export default function GridBackground({ className = '', color = '#FFFFFF', opacity = 0.02 }: GridBackgroundProps) {
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

    const gridSize = 60
    const lineWidth = 1

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
        // Smooth lerp for parallax offset
        currentRef.current.x += (mouseRef.current.x - currentRef.current.x) * 0.05
        currentRef.current.y += (mouseRef.current.y - currentRef.current.y) * 0.05
      }

      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      const dpr = window.devicePixelRatio
      const cellSize = gridSize * dpr
      const offsetX = (currentRef.current.x - 0.5) * cellSize * 0.5
      const offsetY = (currentRef.current.y - 0.5) * cellSize * 0.5

      // Parse color
      const r = parseInt(color.slice(1, 3), 16)
      const g = parseInt(color.slice(3, 5), 16)
      const b = parseInt(color.slice(5, 7), 16)

      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`
      ctx.lineWidth = lineWidth * dpr

      // Vertical lines
      const startX = -offsetX % cellSize
      for (let x = startX; x < width; x += cellSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      // Horizontal lines
      const startY = -offsetY % cellSize
      for (let y = startY; y < height; y += cellSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // Subtle diagonal cross-hatch for depth
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.5})`
      ctx.lineWidth = (lineWidth * 0.5) * dpr

      for (let x = -width; x < width * 2; x += cellSize * 2) {
        ctx.beginPath()
        ctx.moveTo(x + offsetX * 0.3, 0)
        ctx.lineTo(x + offsetX * 0.3 + height, height)
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [reducedMotion, color, opacity])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  )
}