'use client'

import { useMemo, useState } from 'react'
import ProjectHero from './ProjectHero'
import ProjectGallery from './ProjectGallery'
import RelatedProjects from './RelatedProjects'
import type { Project } from '../../types/project'
import { motion } from 'motion/react'

export default function ProjectDetailClient({ project }: { project: Project }) {
  const allImages = useMemo(
    () => project.groups.flatMap((g) => g.images),
    [project.groups]
  )

  return (
    <div>
      <ProjectHero project={project} />

      {/* Stats */}
      <section className="project-stats">
        <div className="container-narrow" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(32px, 5vw, 80px)' }}>
          {project.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center' }}
            >
              <span style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', display: 'block' }}>{stat.value}</span>
              <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-text-secondary)' }}>{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="container-narrow" style={{ paddingTop: 'var(--space-block)' }}>
        <div style={{ maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-accent)', display: 'block', marginBottom: '8px' }}>Our Story</span>
            <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: '32px' }}>Why This Matters</h2>
          </motion.div>

          <div className="project-story-text">
            {project.storyParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                {para}
              </motion.p>
            ))}
          </div>

          {project.testimonial && (
            <motion.blockquote
              className="project-testimonial"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6 }}
            >
              <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
              <footer>
                <span className="testimonial-name">{project.testimonial.name}</span>
                <span className="testimonial-role">{project.testimonial.role}</span>
              </footer>
            </motion.blockquote>
          )}
        </div>
      </section>

      {/* Gallery */}
      {allImages.length > 0 && (
        <section style={{ paddingTop: 'var(--space-block)', paddingBottom: 'var(--space-block)' }}>
          <div className="container-narrow">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: 'center', marginBottom: '32px' }}
            >
              <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px' }}>Field Documentation</span>
              <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)' }}>Project Gallery</h2>
            </motion.div>
            <ProjectGallery groups={project.groups} />
          </div>
        </section>
      )}

      {/* Related */}
      <section className="container-narrow" style={{ paddingBottom: 'var(--space-section)' }}>
        <RelatedProjects slugs={project.relatedSlugs} />
      </section>

      {/* CTA */}
      <div className="container-narrow" style={{ paddingBottom: 'var(--space-section)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', paddingTop: '32px', borderTop: '1px solid var(--color-border)' }}>
          <a href="/projects" className="btn-secondary">Back to Projects</a>
          <a href="/volunteer" className="btn-primary">Help on the Next One</a>
        </div>
      </div>
    </div>
  )
}
