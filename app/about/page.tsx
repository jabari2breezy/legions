'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import ImpactCounter from '../components/ImpactCounter'
import GrainOverlay from '../components/GrainOverlay'
import dynamic from 'next/dynamic'

const SubpageCanvas = dynamic(() => import('../components/SubpageCanvas'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const timelineItems = document.querySelectorAll('.timeline-item')
    timelineItems.forEach((item, i) => {
      gsap.fromTo(item,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true
          },
          delay: i * 0.15
        }
      )
    })

    const tenetCards = document.querySelectorAll('.tenet-card')
    gsap.fromTo(tenetCards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: tenetCards[0],
          start: 'top 85%',
          once: true
        }
      }
    )
  }, { scope: mainRef })

  return (
    <main ref={mainRef} className="min-h-screen bg-[var(--color-bg-deep)]">
      <SubpageCanvas />
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <GrainOverlay opacity={0.06} />
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <SectionHeader
            eyebrow="Our Story"
            title="Founded by Students in 2022."
            subtitle="We didn't want to wait until we were older to make a difference. We started Legions because Dar es Salaam needed action, not just awareness."
            align="left"
            className="mb-12"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-surface)]/60 backdrop-blur-md border-y border-[var(--color-border-subtle)] relative z-10">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <ImpactCounter end={12} prefix="TZS " suffix="M+" label="Total Raised" />
            <ImpactCounter end={25000} suffix="+" label="Trees Planted" />
            <ImpactCounter end={100} suffix="+" label="Active Members" />
            <ImpactCounter end={7} label="Completed Projects" />
          </div>
        </div>
      </section>

      {/* Tenets */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)] relative z-10">
        <SectionHeader
          eyebrow="Core Tenets"
          title="What We Believe."
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8 tenet-card cursor-default">
            <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Radical Transparency</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">Every donation is accounted for. We show exactly where the money goes and the physical impact it creates.</p>
          </div>
          <div className="glass-panel p-8 tenet-card cursor-default">
            <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Action Over Words</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">We don't host galas to talk about problems; we get our hands dirty to fix them. Field work is our primary metric.</p>
          </div>
          <div className="glass-panel p-8 tenet-card cursor-default">
            <div className="w-12 h-12 rounded-full bg-[var(--color-cyan)]/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Youth Empowerment</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">Age is not a barrier to impact. We train the next generation of Tanzanian leaders through real-world service.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-[var(--spacing-section-y)] relative border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]/80 backdrop-blur-sm overflow-hidden z-10">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <SectionHeader
            eyebrow="History"
            title="The Journey So Far."
            align="left"
            className="mb-16"
          />
          <div className="flex flex-col gap-10 max-w-4xl border-l border-[var(--color-cyan)]/30 ml-4 pl-8">
            <div className="relative timeline-item">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[var(--color-cyan)] shadow-[0_0_15px_rgba(63,224,197,0.6)]"></div>
              <div className="glass-panel p-6">
                <h4 className="text-[var(--color-cyan)] font-mono text-sm mb-2">2022</h4>
                <h3 className="text-xl text-white font-semibold mb-2">Legions Founded</h3>
                <p className="text-[var(--color-text-secondary)]">A small group of high schoolers decides to formalize their community service efforts.</p>
              </div>
            </div>
            <div className="relative timeline-item">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-cyan)] shadow-[0_0_10px_rgba(63,224,197,0.3)]"></div>
              <div className="glass-panel p-6">
                <h4 className="text-[var(--color-cyan)] font-mono text-sm mb-2">2023</h4>
                <h3 className="text-xl text-white font-semibold mb-2">First Major Success</h3>
                <p className="text-[var(--color-text-secondary)]">The MYK Tree Planting initiative hits 10,000 trees, proving the model works at scale.</p>
              </div>
            </div>
            <div className="relative timeline-item">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-cyan)] shadow-[0_0_10px_rgba(63,224,197,0.3)]"></div>
              <div className="glass-panel p-6">
                <h4 className="text-[var(--color-cyan)] font-mono text-sm mb-2">2024</h4>
                <h3 className="text-xl text-white font-semibold mb-2">Expanding Scope</h3>
                <p className="text-[var(--color-text-secondary)]">Moving into healthcare infrastructure with Ujasiri House and clean water with the Pwani Well.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
