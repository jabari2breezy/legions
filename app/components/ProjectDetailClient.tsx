'use client'

import { useRef, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from './SectionHeader'
import Button from './Button'
import ProjectHero from './ProjectHero'
import ProjectStats from './ProjectStats'
import ProjectStory from './ProjectStory'
import ProjectGallery from './ProjectGallery'
import RelatedProjects from './RelatedProjects'
import { AssetPreloader } from './WebGL/AssetPreloader'
import type { Project } from '../../types/project'
import dynamic from 'next/dynamic'

const SubpageCanvas = dynamic(() => import('./SubpageCanvas'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function ProjectDetailClient({ project }: { project: Project }) {
  const mainRef = useRef<HTMLDivElement>(null)

  const allImages = useMemo(
    () => project.groups.flatMap((g) => g.images),
    [project.groups]
  )

  const preloadUrls = useMemo(
    () => allImages.slice(0, 6).map((img) => `/projects/${img.filename}`),
    [allImages]
  )

  useGSAP(() => {
    const sections = document.querySelectorAll('.content-section')
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 85%', once: true }
        }
      )
    })

    const planningSteps = document.querySelectorAll('.planning-step')
    gsap.fromTo(planningSteps,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: planningSteps[0], start: 'top 85%', once: true }
      }
    )

    const impactCards = document.querySelectorAll('.impact-card')
    gsap.fromTo(impactCards,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: impactCards[0], start: 'top 85%', once: true }
      }
    )
  }, { scope: mainRef })

  return (
    <div ref={mainRef}>
      <SubpageCanvas />

      <ProjectHero project={project} />

      <ProjectStats stats={project.stats} />

      {/* Story Section */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)] relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 content-section">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-[var(--color-cyan)]"></span>
              <span className="text-xs font-mono tracking-widest uppercase text-[var(--color-cyan)]">Our Story</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-tight">Why This Matters</h2>
            <ProjectStory
              paragraphs={project.storyParagraphs}
              testimonial={project.testimonial}
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pb-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)] relative z-10">
        <div className="max-w-6xl mx-auto">
          {project.groups.some((g) => g.images.length > 0) && (
            <div className="content-section">
              <SectionHeader
                eyebrow="Field Documentation"
                title="Project Gallery"
                align="left"
                className="mb-8"
              />

              {allImages.length > 0 ? (
                <AssetPreloader urls={preloadUrls}>
                  <ProjectGallery groups={project.groups} />
                </AssetPreloader>
              ) : (
                <ProjectGallery groups={project.groups} />
              )}
            </div>
          )}
        </div>
      </section>

      {/* Related Projects */}
      <section className="pb-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)] relative z-10">
        <div className="max-w-6xl mx-auto">
          <RelatedProjects slugs={project.relatedSlugs} />
        </div>
      </section>

      {/* CTA */}
      <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-12 border-t border-[var(--color-border-subtle)]">
            <Button href="/projects" variant="secondary">Back to Projects</Button>
            <Button href="/volunteer" variant="primary">Help on the Next One</Button>
          </div>
        </div>
      </div>

      <div className="h-20" />
    </div>
  )
}
