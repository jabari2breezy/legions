'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import SectionHeader from './SectionHeader'
import ImpactCounter from './ImpactCounter'
import Button from './Button'
import AnimatedBackground from './AnimatedBackground'
import GrainOverlay from './GrainOverlay'

gsap.registerPlugin(ScrollTrigger)

interface Stat {
  number: number
  prefix?: string
  suffix?: string
  label: string
}

interface ProjectData {
  title: string
  category: string
  heroImage: string
  stats: Stat[]
  context: string
  planning: string[]
  impactHighlights: string[]
  gallery: string[]
}

export default function ProjectDetailClient({ project }: { project: ProjectData }) {
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Content sections animation
    const sections = document.querySelectorAll('.content-section')
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true
          }
        }
      )
    })

    // Planning steps animation
    const planningSteps = document.querySelectorAll('.planning-step')
    gsap.fromTo(planningSteps,
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: planningSteps[0],
          start: 'top 85%',
          once: true
        }
      }
    )

    // Impact highlights animation
    const impactCards = document.querySelectorAll('.impact-card')
    gsap.fromTo(impactCards,
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: impactCards[0],
          start: 'top 85%',
          once: true
        }
      }
    )

    // Gallery images animation
    const galleryImages = document.querySelectorAll('.gallery-image')
    gsap.fromTo(galleryImages,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryImages[0],
          start: 'top 85%',
          once: true
        }
      }
    )
  }, { scope: mainRef })

  return (
    <div ref={mainRef}>
      {/* Hero */}
      <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 border-b border-[var(--color-border-subtle)] overflow-hidden">
        <AnimatedBackground variant="hero" />
        <GrainOverlay opacity={0.1} />
        <div className="absolute inset-0 z-[1] opacity-40 mix-blend-overlay">
          <Image 
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-deep)] via-[var(--color-bg-deep)]/70 to-transparent z-[2]"></div>
        
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-20 text-center">
          <div className="inline-block px-4 py-2 rounded-full border border-[var(--color-cyan)] text-[var(--color-cyan)] text-xs font-mono tracking-widest uppercase mb-8 bg-[var(--color-bg-deep)]/50 backdrop-blur-md">
            {project.category}
          </div>
          <h1 className="text-[var(--font-size-h1)] font-bold text-white mb-6 tracking-tight text-balance">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--color-surface)] border-b border-[var(--color-border-subtle)] relative">
        <AnimatedBackground variant="subtle" />
        <div className="container mx-auto px-[var(--spacing-section-x)] flex flex-wrap justify-center gap-12 md:gap-24 relative z-10">
          {project.stats.map((stat, i) => (
            <ImpactCounter 
              key={i}
              end={stat.number} 
              prefix={stat.prefix} 
              suffix={stat.suffix} 
              label={stat.label} 
            />
          ))}
        </div>
      </section>

      {/* Content */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)] relative">
        <AnimatedBackground variant="subtle" />
        <div className="max-w-4xl mx-auto relative z-10">
          
          {/* Context & Motivation */}
          <div className="mb-20 content-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-cyan)]"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-cyan)]">Context & Motivation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-tight">Why This Matters</h2>
            <p className="text-[var(--font-size-body-large)] text-[var(--color-text-secondary)] leading-relaxed">
              {project.context}
            </p>
          </div>
          
          {/* Planning & Preparation */}
          <div className="mb-20 content-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-cyan)]"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-cyan)]">Planning & Preparation</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-tight">How We Organized</h2>
            <div className="space-y-5">
              {project.planning.map((step, idx) => (
                <div key={idx} className="flex gap-5 items-start group planning-step">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface)] flex items-center justify-center text-sm font-mono text-[var(--color-cyan)] group-hover:bg-[var(--color-cyan)]/10 group-hover:border-[var(--color-cyan)]/40 group-hover:shadow-[0_0_15px_rgba(63,224,197,0.2)] transition-all duration-300">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed pt-2">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div className="mb-20 content-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-cyan)]"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-cyan)]">Results & Impact</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-tight">What We Achieved</h2>
            <div className="space-y-5">
              {project.impactHighlights.map((highlight, idx) => (
                <div key={idx} className="glass-panel p-6 border-l-4 border-l-[var(--color-cyan)] impact-card cursor-default">
                  <p className="text-[var(--color-text-primary)] leading-relaxed font-medium">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Gallery */}
          {project.gallery.length > 0 && (
            <div className="mb-16 content-section">
              <SectionHeader 
                eyebrow="Field Documentation"
                title="Project Gallery"
                align="left"
                className="mb-8"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {project.gallery.map((imgSrc, idx) => (
                  <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel group gallery-image cursor-pointer">
                    <Image
                      src={imgSrc}
                      alt={`${project.title} photo ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-12 border-t border-[var(--color-border-subtle)] mt-20 content-section">
            <Button href="/projects" variant="secondary">Back to Projects</Button>
            <Button href="/volunteer" variant="primary">Help on the Next One</Button>
          </div>
        </div>
      </section>
    </div>
  )
}
