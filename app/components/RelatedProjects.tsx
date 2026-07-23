'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import projectsIndex from '../../data/projects-index.json'
import type { ProjectSummary } from '../../types/project'

interface RelatedProjectsProps {
  slugs: string[]
}

export default function RelatedProjects({ slugs }: RelatedProjectsProps) {
  if (!slugs.length) return null

  const projects = slugs
    .map((slug) => (projectsIndex as ProjectSummary[]).find((p) => p.slug === slug))
    .filter((p): p is ProjectSummary => Boolean(p))

  if (!projects.length) return null

  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: '2rem' }}
      >
        Continue Exploring
      </motion.h2>

      <div className="related-projects-grid">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 22, delay: i * 0.1 }}
          >
            <Link href={`/projects/${project.slug}`} className="related-card">
              <div className="related-card-image-wrapper">
                <Image
                  src={`/projects/${project.heroImage.filename}`}
                  alt={project.heroImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="related-card-image"
                />
              </div>
              <span className="related-card-category">{project.category}</span>
              <h3>{project.title}</h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
