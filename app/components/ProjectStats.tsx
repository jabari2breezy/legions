'use client'

import ImpactCounter from './ImpactCounter'
import type { ProjectStat } from '../../types/project'

interface ProjectStatsProps {
  stats: ProjectStat[]
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  return (
    <section className="project-stats">
      <div className="container mx-auto px-[var(--spacing-section-x)] flex flex-wrap justify-center gap-12 md:gap-24">
        {stats.map((stat, i) => (
          <ImpactCounter
            key={i}
            end={parseFloat(stat.value.replace(/[^0-9.]/g, '')) || 0}
            suffix={stat.value.replace(/[\d,]+/g, '')}
            label={stat.label}
          />
        ))}
      </div>
    </section>
  )
}
