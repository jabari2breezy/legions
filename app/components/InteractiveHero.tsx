'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageWrapperRef = useRef<HTMLDivElement>(null)
  const lightOverlayRef = useRef<HTMLDivElement>(null)
  const bgGlowRef = useRef<HTMLDivElement>(null)
  
  // Mouse state (-1 to 1)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const lastMouseTime = useRef(Date.now())
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalize mouse coords to -1 .. 1
      mouse.current.targetX = (e.clientX / innerWidth) * 2 - 1
      mouse.current.targetY = (e.clientY / innerHeight) * 2 - 1
      lastMouseTime.current = Date.now()
    }

    window.addEventListener('mousemove', handleMouseMove)

    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.015
      const now = Date.now()
      const isIdle = now - lastMouseTime.current > 2000

      // Damped Lerp (smooth inertia)
      const ease = 0.05
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * ease
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * ease

      // Idle float offset if mouse is still
      const idleX = isIdle ? Math.sin(time * 0.8) * 0.15 : 0
      const idleY = isIdle ? Math.cos(time * 0.6) * 0.15 : 0

      const currentX = mouse.current.x + idleX
      const currentY = mouse.current.y + idleY

      // 1. Mouse Parallax & 3D Tilt for foreground image
      if (imageWrapperRef.current) {
        const rotateX = -currentY * 14 // Max tilt 14 deg
        const rotateY = currentX * 14
        const translateZ = Math.abs(currentX) * 20
        const translateX = currentX * 25
        const translateY = currentY * 20

        imageWrapperRef.current.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateZ(${translateZ}px)
          translateX(${translateX}px)
          translateY(${translateY}px)
          scale(${1 + Math.abs(currentX * 0.03)})
        `
      }

      // 2. Dynamic Specular Highlight shift following mouse
      if (lightOverlayRef.current) {
        const lightX = 50 + currentX * 35 // %
        const lightY = 50 + currentY * 35 // %
        lightOverlayRef.current.style.background = `
          radial-gradient(
            circle at ${lightX}% ${lightY}%,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(63, 224, 197, 0.25) 25%,
            transparent 60%
          )
        `
      }

      // 3. Background Gradient Drift (drifts at slower rate for depth)
      if (bgGlowRef.current) {
        const glowX = 40 + currentX * 15
        const glowY = 40 + currentY * 15
        bgGlowRef.current.style.background = `
          radial-gradient(
            circle at ${glowX}% ${glowY}%,
            #3FE0C5 0%,
            #2B2A8C 50%,
            #15144d 100%
          )
        `
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-16 bg-[#15144d]"
    >
      {/* Background Gradient Glow Layer */}
      <div 
        ref={bgGlowRef} 
        className="absolute inset-0 z-0 transition-all duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #3FE0C5 0%, #2B2A8C 50%, #15144d 100%)',
        }}
      />

      {/* Hero 3D Glass/Chrome Form Image with 3D Tilt Wrapper */}
      <div 
        className={`relative z-10 w-full max-w-[1200px] h-[75vh] flex items-center justify-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div 
          ref={imageWrapperRef}
          className="relative w-full h-full max-w-[850px] max-h-[650px] transition-transform duration-75 ease-out will-change-transform rounded-3xl overflow-hidden shadow-2xl shadow-cyan/20 border border-white/10"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Main Glass Chrome Image */}
          <Image
            src="/hero-attached.jpg"
            alt="Interactive 3D Chrome Glass Art"
            fill
            priority
            className="object-cover select-none pointer-events-none"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />

          {/* Dynamic Specular Rim-Light Overlay */}
          <div 
            ref={lightOverlayRef}
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-90 transition-opacity duration-300"
          />

          {/* Glossy Refraction Border Highlight */}
          <div className="absolute inset-0 border border-white/30 rounded-3xl pointer-events-none" />
        </div>
      </div>

      {/* Floating Foreground Typography Content */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-8 md:p-16 max-w-[1400px] mx-auto">
        <div className="pt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-cyan/30 text-cyan text-xs font-mono tracking-widest uppercase mb-4 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-cyan animate-ping" />
            [ DAR ES SALAAM // YOUTH INITIATIVE ]
          </div>
        </div>

        <div className="max-w-2xl pb-8 pointer-events-auto">
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-white leading-[0.95] mb-6 drop-shadow-lg">
            Youth-Led Action.<br />
            <span className="text-gradient-cyan">Real Community Change.</span>
          </h1>
          
          <p className="text-white/80 text-base md:text-xl font-sans leading-relaxed mb-8 backdrop-blur-sm bg-black/20 p-4 rounded-xl border border-white/5">
            Empowering students in Dar es Salaam to transform communities through active service, Ujasiri House renovation, AMSEN support, coastal preservation, and youth mentorship.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="px-8 py-4 rounded-full bg-cyan text-bg-deep font-mono text-sm font-bold uppercase tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan/25"
            >
              Explore Our Projects &rarr;
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-sm font-semibold uppercase tracking-wider backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              Our Mission
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
