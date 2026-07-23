'use client'

import { motion } from 'motion/react'
import type { ProjectStat } from '../../types/project'

interface ProjectStatsProps {
  stats: ProjectStat[]
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <section className="project-stats">
      <div className="container-narrow" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(32px, 5vw, 80px)' }}>
        {stats.map((stat, i) => (
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
  )
}
