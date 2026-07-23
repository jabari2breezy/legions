'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import type { Project } from '../../types/project'

interface ProjectHeroProps {
  project: Project
}

export default function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <header className="project-hero">
      <div className="project-hero-image-wrapper">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="project-hero-image-inner"
        >
          <Image
            src={`/projects/${project.heroImage.filename}`}
            alt={project.heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="project-hero-image"
          />
        </motion.div>
        <div className="project-hero-overlay" />
      </div>

      <div className="project-hero-content">
        <motion.nav
          className="project-breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/projects">Projects</Link>
          <span className="breadcrumb-sep">/</span>
          <span>{project.title}</span>
        </motion.nav>

        <motion.span
          className="project-category-tag"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {project.category}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {project.title}
        </motion.h1>

        <motion.p
          className="project-hero-description"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {project.shortDescription}
        </motion.p>

        <motion.span
          className="project-timeframe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {project.timeframe.displayLabel}
          {project.timeframe.status === 'ongoing' && (
            <span className="status-dot" aria-label="Ongoing project" />
          )}
        </motion.span>
      </div>

      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <span>Scroll</span>
        <motion.div
          className="scroll-line"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </header>
  )
}
