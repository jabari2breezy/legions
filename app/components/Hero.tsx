'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import StaggeredFade from './StaggeredFade'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      // Normalize mouse coordinates from -1 to 1
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-[#010101] text-white"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center opacity-60 mix-blend-screen scale-105 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0) scale(1.08)`,
          }}
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4" 
            type="video/mp4" 
          />
        </video>
        {/* Subtle Liquid Glass Mesh Overlay floating with mouse movement */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`,
          }}
        >
          <Image
            src="/hero-bg.jpg"
            alt="3D Glass Liquid Texture"
            fill
            className="object-cover"
          />
        </div>

        {/* Gradient vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-[#010101]/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#010101]/40 to-[#010101]" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 pt-12 sm:pt-16 md:pt-24 flex flex-col items-center text-center">
        
        {/* Headline Lines in Garamond with StaggeredFade */}
        <h1 className="font-garamond text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-normal leading-[1.08] tracking-tight mb-6 sm:mb-8 text-white">
          <span className="block mb-1 sm:mb-2">
            <StaggeredFade text="WITNESS THE" />
          </span>
          <span className="block text-white/90">
            <StaggeredFade text="HIDDEN REALM" />
          </span>
        </h1>

        {/* Subtitle Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: 'easeOut' }}
          className="text-white/70 font-light leading-relaxed max-w-xs sm:max-w-md text-sm sm:text-base md:text-lg mb-8 sm:mb-10 font-sans"
        >
          An odyssey through delicate living forms,
          <span className="hidden sm:inline"><br /></span>
          revealed by lens, curiosity, and youth community action.
        </motion.p>

        {/* CTA Button with Liquid Glass Class */}
        <motion.a
          href="/projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
          className="liquid-glass rounded-full px-7 sm:px-10 py-3.5 sm:py-4 text-white/90 uppercase tracking-[0.18em] sm:tracking-[0.2em] text-xs sm:text-sm font-sans font-light inline-block hover:text-white"
        >
          Begin the Experience
        </motion.a>

      </div>
    </section>
  )
}
