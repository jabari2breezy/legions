'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import HorizontalProjectCard from '../components/HorizontalProjectCard'
import ProjectImageBelt from '../components/ProjectImageBelt'
import SubpageCanvas from '../components/SubpageCanvas'
import GrainOverlay from '../components/GrainOverlay'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { slug: 'amsen-visits', title: 'AMSEN Visits', category: 'Community & Special Needs', impact: '40+ Students Engaged', imageSrc: '/projects/amsen-visits/IMG_8275.jpg' },
  { slug: 'beach-cleanups', title: 'Beach Cleanups', category: 'Environment', impact: '1.5+ Tons Collected', imageSrc: '/projects/beach-cleanups/IMG_8270.jpg' },
  { slug: 'ramadhan-project', title: 'Ramadhan Project', category: 'Community & Food Relief', impact: '1,200+ Individuals Reached', imageSrc: '/projects/ramadhan-project/IMG_8248.jpg' },
  { slug: 'tree-planting', title: 'Tree Planting — Project MYK', category: 'Environment', impact: '500+ Trees Planted', imageSrc: '/projects/tree-planting/IMG_8271.jpg' },
  { slug: 'ujasiri-house', title: 'Ujasiri House Renovation', category: 'Health & Infrastructure', impact: '30+ Families Hosted Daily', imageSrc: '/projects/ujasiri-house/IMG_8290.jpg' },
]

export default function Projects() {
  const mainRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    const pin = pinRef.current
    if (!track || !pin) return

    // Wait a frame so layout + images settle before measuring width
    const id = requestAnimationFrame(() => {
      const totalScroll = track.scrollWidth - window.innerWidth
      if (totalScroll <= 0) return

      // Horizontal scroll — pin section and move track left
      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: pin,
          start: 'top top',
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            scrub: 0.3,
          },
        })
      }
    })

    // Fade in hero text
    gsap.fromTo(
      '.projects-hero-text',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    )

    return () => cancelAnimationFrame(id)
  }, { scope: mainRef })

  return (
    <main ref={mainRef} className="bg-[var(--color-bg-deep)]">
      <SubpageCanvas />
      <ProjectImageBelt />
      <GrainOverlay opacity={0.05} />
      <Navbar />

      {/* Hero */}
      <section className="h-[50vh] flex items-center relative z-10">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <div className="projects-hero-text">
            <SectionHeader
              eyebrow="Our Work"
              title="Projects That Matter."
              subtitle="Swipe through the initiatives where Legions has directed funding, sweat, and community power."
              align="left"
            />
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section */}
      <div ref={pinRef} className="relative h-screen overflow-hidden z-10">
        {/* Track — single row, no wrap, no overlap */}
        <div
          ref={trackRef}
          className="flex items-center h-full gap-8 pl-[8vw] pr-[20vw]"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {projects.map((project, i) => (
            <div key={project.slug} className="flex-shrink-0 w-[65vw] md:w-[55vw] lg:w-[45vw] h-[60vh]">
              <HorizontalProjectCard
                slug={project.slug}
                title={project.title}
                category={project.category}
                impact={project.impact}
                imageSrc={project.imageSrc}
                index={i}
              />
            </div>
          ))}
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-10 left-[8vw] right-[8vw] h-[2px] bg-white/10 z-30 rounded-full overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-[var(--color-cyan)] origin-left rounded-full"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-40">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white">Scroll</span>
          <div className="w-[1px] h-6 bg-white/30 overflow-hidden relative">
            <div className="w-full h-1/2 bg-[var(--color-cyan)] absolute top-0 left-0 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Spacer for scroll distance */}
      <div className="h-[10vh] relative z-10" />

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
