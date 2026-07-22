'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import AnimatedBackground from '../components/AnimatedBackground'
import GrainOverlay from '../components/GrainOverlay'
import FloatingParticles from '../components/FloatingParticles'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const mainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Project cards stagger animation
    const projectCards = document.querySelectorAll('.project-card-wrapper')
    gsap.fromTo(projectCards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: projectCards[0],
          start: 'top 85%',
          once: true
        }
      }
    )
  }, { scope: mainRef })

  const projects = [
    {
      slug: 'amsen-visits',
      title: 'AMSEN Visits',
      category: 'Community & Special Needs',
      impact: '40+ Students Engaged',
      imageSrc: '/projects/amsen-visits/IMG_8275.jpg'
    },
    {
      slug: 'beach-cleanups',
      title: 'Beach Cleanups',
      category: 'Environment',
      impact: '1.5+ Tons Collected',
      imageSrc: '/projects/beach-cleanups/IMG_8270.jpg'
    },
    {
      slug: 'ramadhan-project',
      title: 'Ramadhan Project',
      category: 'Community & Food Relief',
      impact: '1,200+ Individuals Reached',
      imageSrc: '/projects/ramadhan-project/IMG_8248.jpg'
    },
    {
      slug: 'tree-planting',
      title: 'Tree Planting — Project MYK',
      category: 'Environment',
      impact: '500+ Trees Planted',
      imageSrc: '/projects/tree-planting/IMG_8271.jpg'
    },
    {
      slug: 'ujasiri-house',
      title: 'Ujasiri House Renovation',
      category: 'Health & Infrastructure',
      impact: '30+ Families Hosted Daily',
      imageSrc: '/projects/ujasiri-house/IMG_8290.jpg'
    }
  ]

  return (
    <main ref={mainRef} className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      <section className="pt-40 pb-20 relative overflow-hidden">
        <AnimatedBackground variant="hero" />
        <GrainOverlay opacity={0.08} />
        <FloatingParticles count={18} />
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-20">
          <SectionHeader 
            eyebrow="Our Work"
            title="Projects That Matter."
            subtitle="Explore the initiatives where Legions has directed funding, sweat, and community power."
            className="mb-16"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <div key={project.slug} className="project-card-wrapper">
                <ProjectCard 
                  slug={project.slug}
                  title={project.title}
                  category={project.category}
                  impact={project.impact}
                  imageSrc={project.imageSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
