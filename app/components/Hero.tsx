'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

import GridBackground from './GridBackground'
import SpotlightCanvas from './SpotlightCanvas'
import Hero3DLogo from './Hero3DLogo'
import HeroText from './HeroText'
import GlassNavbar from './GlassNavbar'
import GrainOverlay from './GrainOverlay'
import ScrollProgress from './ScrollProgress'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

// Dynamic import for Three.js canvas to avoid SSR issues
const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])

  // GSAP scroll-triggered animations for hero content
  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Animate hero content on scroll
      gsap.to('.hero-content', {
        y: 200,
        opacity: 0,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Parallax for 3D logo
      gsap.to('.hero-3d-logo', {
        y: 150,
        rotate: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Grid background parallax
      gsap.to('.grid-bg', {
        y: 100,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [reducedMotion])

  // Entrance animations for hero content
  useEffect(() => {
    if (!loaded || reducedMotion) return

    const ctx = gsap.context(() => {
      // Staggered entrance for tagline
      gsap.fromTo(
        '.hero-tagline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1.2 }
      )

      // CTA buttons
      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out', stagger: 0.1, delay: 1.8 }
      )

      // Scroll indicator
      gsap.fromTo(
        '.hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [loaded, reducedMotion])

  return (
    <>
      {loaded && (
        <>
          <GrainOverlay />
          <ScrollProgress />
          <GlassNavbar />
        </>
      )}

      <main>
        {/* ═══════════════ HERO ═══════════════ */}
        <section
          ref={heroRef}
          className="relative h-screen min-h-[100vh] overflow-hidden"
          id="hero"
          aria-labelledby="hero-title"
        >
          {/* Dark indigo gradient background */}
          <div
            className="absolute inset-0 z-[-2]"
            style={{
              background: 'linear-gradient(145deg, #1A1147 0%, #2D1F6B 35%, #3D2FA8 70%, #4A38C0 100%)',
            }}
          />

          {/* Grid pattern background with cursor parallax */}
          <GridBackground
            className="grid-bg"
            color="#FFFFFF"
            opacity={0.015}
          />

          {/* Canvas-based spotlight/glow effect */}
          <SpotlightCanvas
            intensity={0.5}
            color="#00D4C8"
          />

          {/* Three.js particle canvas (existing) */}
          <HeroCanvas />

          {/* Main hero content - sticky */}
          <motion.div
            ref={contentRef}
            className="hero-content sticky top-0 h-screen flex items-center justify-between px-6 md:px-12 relative z-10"
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          >
            {/* Left side: 3D Logo Centerpiece */}
            <div className="flex-1 flex items-center justify-center md:justify-start">
              <div className="hero-3d-logo relative">
                <Hero3DLogo size={Math.min(500, window.innerWidth * 0.55)} />
              </div>
            </div>

            {/* Right side: Headline and content */}
            <div className="flex-1 flex flex-col items-center justify-center md:items-end text-center md:text-right max-w-2xl">
              {/* Tagline */}
              <motion.p
                className="hero-tagline text-sm md:text-base tracking-[0.5em] uppercase text-cyan/70 font-mono mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: reducedMotion ? 0 : 1.2 }}
                style={{ opacity: reducedMotion ? 1 : 0 }}
              >
                Invitation Only
              </motion.p>

              {/* Main "LEGIONS" headline with SplitType/GSAP character reveal */}
              <div className="overflow-hidden mb-2">
                <HeroText
                  className="text-[clamp(4rem,14vw,14rem)] font-serif font-light leading-[0.82] tracking-tight text-gradient-hero"
                  delay={reducedMotion ? 0 : 1.4}
                />
              </div>

              {/* Sub-headline */}
              <motion.p
                className="hero-tagline text-lg md:text-xl tracking-[0.1em] text-azure/80 font-serif italic mb-12 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: reducedMotion ? 0 : 1.8 }}
                style={{ opacity: reducedMotion ? 1 : 0 }}
              >
                Where Legends Rise
              </motion.p>

              {/* CTA Buttons */}
              <div className="hero-cta flex flex-col sm:flex-row items-center justify-center md:justify-end gap-6 w-full">
                <MagneticButton strength={0.25}>
                  <motion.button
                    className="group relative px-10 py-4 bg-cyan text-bg-deep text-sm tracking-[0.3em] uppercase font-medium overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Request Membership</span>
                    <motion.div
                      className="absolute inset-0 bg-neon-ice"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </motion.button>
                </MagneticButton>
                <MagneticButton strength={0.25}>
                  <motion.button
                    className="px-10 py-4 border border-white/15 text-white/70 text-sm tracking-[0.3em] uppercase hover:border-cyan/40 hover:text-cyan transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Our Story
                  </motion.button>
                </MagneticButton>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="hero-scroll-indicator absolute bottom-12 left-1/2 md:left-auto md:right-8 -translate-x-1/2 md:translate-x-0 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: reducedMotion ? 0 : 2.5 }}
                style={{ opacity: reducedMotion ? 1 : 0 }}
              >
                <span className="text-[10px] tracking-[0.5em] uppercase text-white/30">Scroll</span>
                <motion.div
                  className="w-[1px] h-10 bg-gradient-to-b from-cyan/50 to-transparent"
                  animate={{ scaleY: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Ambient glow orbs */}
          <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[150px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-1/4 -left-40 w-[400px] h-[400px] rounded-full bg-indigo/5 blur-[150px] pointer-events-none" aria-hidden="true" />
        </section>
      </main>
    </>
  )
}