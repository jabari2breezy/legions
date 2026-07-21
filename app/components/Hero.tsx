'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { initHeroAnimation, initTextReveal } from '../utils/animations'
import Image from 'next/image'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    initHeroAnimation(heroRef, imageRef)
    initTextReveal(textRef)
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-bg-deep">
        <Image 
          ref={imageRef}
          src="/hero-bg.jpg" 
          alt="Abstract 3D forms" 
          fill
          priority
          className="object-cover opacity-80"
          style={{ transformOrigin: 'center center' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-deep/20 to-bg-deep" />
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 w-full max-w-[1400px] px-6 md:px-12 mx-auto flex flex-col items-start justify-center">
        
        <div className="text-mask mb-6">
          <p className="reveal-up text-cyan font-mono tracking-widest uppercase text-sm font-semibold">
            [ 01 ] // Dar es Salaam
          </p>
        </div>

        <div className="text-mask mb-2">
          <h1 className="reveal-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-white">
            Youth-Led Action.
          </h1>
        </div>
        <div className="text-mask mb-8">
          <h1 className="reveal-up text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] tracking-tighter text-gradient-cyan">
            Real Community Change.
          </h1>
        </div>

        <div className="text-mask max-w-xl mb-12">
          <p className="reveal-up text-text-secondary text-lg md:text-xl leading-relaxed">
            We are a collective of dedicated student volunteers in Dar es Salaam, uniting to make a tangible impact across our communities through service, empathy, and action.
          </p>
        </div>

      </div>
    </section>
  )
}
