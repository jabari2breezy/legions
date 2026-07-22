'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Button from './Button'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  
  useGSAP(() => {
    // Parallax scroll effect
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    // Text reveal sequence
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.4 } })
    
    tl.fromTo('.hero-badge', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
    )
    .fromTo('.hero-title-main', 
      { y: 120, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.6, ease: 'power4.out' },
      '-=0.5'
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.8'
    )
    .fromTo('.hero-button',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
  }, { scope: containerRef })

  // Mouse move effect for subtle 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return
    
    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    gsap.to(imageRef.current, {
      x: x * 30,
      y: y * 30,
      rotationY: x * 10,
      rotationX: -y * 10,
      duration: 1,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!imageRef.current) return
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 1.5,
      ease: 'power3.out',
    })
  }

  return (
    <section 
      ref={containerRef} 
      className="relative h-[100svh] w-full flex items-center justify-center overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg-deep)] via-[#1a1966] to-[var(--color-cyan)]/20 z-0 mix-blend-multiply"></div>
      
      {/* 3D Glass/Chrome Image */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none transform-style-3d">
        <div className="relative w-[120%] h-[120%] scale-110">
          <Image
            ref={imageRef}
            src="/hero-attached.jpg"
            alt="Abstract 3D Chrome and Glass shapes"
            fill
            priority
            className="object-cover opacity-80 mix-blend-screen filter contrast-125"
          />
        </div>
      </div>
      
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15] mix-blend-overlay">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      
      {/* Content */}
      <div className="container relative z-20 mx-auto px-[var(--spacing-section-x)] flex flex-col items-center text-center mt-12">
        
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[var(--color-cyan)]/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-[var(--color-cyan)] animate-pulse"></span>
          <span className="text-[var(--color-cyan)] text-xs font-mono font-bold tracking-widest uppercase">Est. 2022 • Dar es Salaam</span>
        </div>

        <h1 className="hero-title-main text-white leading-[0.85] tracking-tighter text-balance font-black" style={{ fontSize: 'clamp(6rem, 20vw, 18rem)' }}>
          LEGIONS
        </h1>
        
        <p className="hero-subtitle mt-8 text-[var(--font-size-body-large)] text-white/70 max-w-xl font-light leading-relaxed tracking-wide">
          Youth-led action. Real community change. The new standard for student-led impact in Tanzania.
        </p>

        <div className="hero-button mt-12 flex flex-col sm:flex-row gap-4 items-center">
          <Button href="/projects" variant="primary">
            Explore Our Work
          </Button>
          <Button href="/volunteer" variant="secondary">
            Join the Movement
          </Button>
        </div>
        
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="text-xs font-mono tracking-widest uppercase text-white">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <div className="w-full h-1/2 bg-[var(--color-cyan)] absolute top-0 left-0 animate-bounce"></div>
        </div>
      </div>
    </section>
  )
}
