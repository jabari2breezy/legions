'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'
import AnimatedBackground from '../components/AnimatedBackground'
import GrainOverlay from '../components/GrainOverlay'
import FloatingParticles from '../components/FloatingParticles'

gsap.registerPlugin(ScrollTrigger)

export default function Volunteer() {
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Why Legions cards animation
    const whyCards = document.querySelectorAll('.why-card')
    gsap.fromTo(whyCards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: whyCards[0],
          start: 'top 85%',
          once: true
        }
      }
    )

    // Form reveal animation
    const formPanel = document.querySelector('.form-panel')
    if (formPanel) {
      gsap.fromTo(formPanel,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formPanel,
            start: 'top 85%',
            once: true
          }
        }
      )
    }
  }, { scope: mainRef })

  return (
    <main ref={mainRef} className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <AnimatedBackground variant="hero" />
        <GrainOverlay opacity={0.08} />
        <FloatingParticles count={20} />
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-20 text-center">
          <SectionHeader 
            eyebrow="Join Us"
            title="Show Up. Do the Work."
            subtitle="We don't need passive supporters. We need people willing to get their hands dirty to build a better community."
            className="mx-auto"
          />
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-surface)] border-y border-[var(--color-border-subtle)] relative overflow-hidden">
        <AnimatedBackground variant="subtle" />
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <SectionHeader 
            eyebrow="The Standard"
            title="Why Legions?"
            align="left"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 why-card cursor-default">
              <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Real Impact</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">No busywork. Every hour you spend volunteering translates directly into planted trees, fed families, or built infrastructure.</p>
            </div>
            <div className="glass-panel p-8 why-card cursor-default">
              <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Leadership Training</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">We don't just assign tasks; we build leaders. You will learn project management, logistics, and fundraising.</p>
            </div>
            <div className="glass-panel p-8 why-card cursor-default">
              <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">The Network</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">Join a brotherhood and sisterhood of the most driven, capable students in Dar es Salaam.</p>
            </div>
            <div className="glass-panel p-8 why-card cursor-default">
              <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Service Hours</h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed">We provide official documentation and verification for IB, CAS, and university application service requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)] relative">
        <AnimatedBackground variant="subtle" />
        <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12 relative z-10 form-panel">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">Apply to Volunteer</h2>
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Full Name</label>
                <input type="text" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Email</label>
                <input type="email" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">School / University</label>
                <input type="text" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Age</label>
                <input type="number" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Why do you want to join Legions?</label>
              <textarea rows={4} className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[var(--color-cyan)] focus:ring-2 focus:ring-[var(--color-cyan)]/20 transition-all duration-300 resize-none"></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full mt-4">Submit Application</Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
