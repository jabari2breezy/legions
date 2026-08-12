'use client'

import Link from 'next/link'
import type { ProjectData } from '@/lib/projects'
import GlassSurface from './GlassSurface'

type ProjectPreviewCardProps = {
  project: ProjectData
}

function statText(stat: { value: string; label: string }) {
  return (
    <div key={stat.label} className="project-preview-stat">
      <div className="stat-value">{stat.value}</div>
      <div className="stat-label">{stat.label}</div>
    </div>
  )
}

export default function ProjectPreviewCard({ project }: ProjectPreviewCardProps) {
  const primaryStat = project.stats[0]
  const secondaryStat = project.stats[1]

  return (
    <Link href={`/projects/${project.slug}`} className={`project-preview project-preview--${project.layout}`}>
      <GlassSurface className="project-preview-surface">
        <div className="project-preview-topline">
          <span className="project-preview-index">0{project.slug === 'ramadhan' ? 1 : project.slug === 'ujasiri-house' ? 2 : project.slug === 'beach-cleanups' ? 3 : project.slug === 'tree-planting' ? 4 : 5}</span>
          <span className="label">{project.subtitle}</span>
        </div>

        {project.layout === 'numbers' && (
          <div className="project-preview-layout project-preview-layout--numbers">
            <div>
              <h3 className="project-preview-title">{project.title}</h3>
              <p className="project-preview-copy">{project.description}</p>
              <div className="project-preview-stats">
                {statText(primaryStat)}
                {secondaryStat ? statText(secondaryStat) : null}
              </div>
            </div>
            <div className="project-preview-media project-preview-media--hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.images[0]} alt={project.title} loading="lazy" />
              <span className="project-preview-badge">Big numbers. Direct action.</span>
            </div>
          </div>
        )}

        {project.layout === 'gallery' && (
          <div className="project-preview-layout project-preview-layout--gallery">
            <div className="project-preview-media project-preview-media--stack">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.images[0]} alt={project.title} loading="lazy" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.images[1]} alt={project.title} loading="lazy" />
            </div>
            <div>
              <h3 className="project-preview-title">{project.title}</h3>
              <p className="project-preview-copy">{project.impactNote}</p>
              <div className="project-preview-stats">
                {statText(primaryStat)}
                {secondaryStat ? statText(secondaryStat) : null}
              </div>
            </div>
          </div>
        )}

        {project.layout === 'horizontal' && (
          <div className="project-preview-layout project-preview-layout--horizontal">
            <div>
              <h3 className="project-preview-title">{project.title}</h3>
              <p className="project-preview-copy">{project.description}</p>
            </div>
            <div className="project-preview-rail" aria-hidden="true">
              {project.images.slice(0, 4).map((src, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" loading="lazy" style={{ animationDelay: `${index * 80}ms` }} />
              ))}
            </div>
            <div className="project-preview-stats project-preview-stats--inline">
              {statText(primaryStat)}
              {secondaryStat ? statText(secondaryStat) : null}
            </div>
          </div>
        )}

        {project.layout === 'counter' && (
          <div className="project-preview-layout project-preview-layout--counter">
            <div className="project-preview-counter">
              <span className="project-preview-counter-number">{primaryStat.value}</span>
              <span className="project-preview-counter-label">{primaryStat.label}</span>
            </div>
            <div className="project-preview-media project-preview-media--hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.images[0]} alt={project.title} loading="lazy" />
            </div>
            <div className="project-preview-stat-list">
              {project.stats.slice(1).map((stat) => statText(stat))}
            </div>
          </div>
        )}

        {project.layout === 'narrative' && (
          <div className="project-preview-layout project-preview-layout--narrative">
            <div className="project-preview-media project-preview-media--hero">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={project.images[0]} alt={project.title} loading="lazy" />
            </div>
            <div>
              <h3 className="project-preview-title">{project.title}</h3>
              <p className="project-preview-copy">{project.description}</p>
              <blockquote className="project-preview-quote">{project.impactNote}</blockquote>
              <div className="project-preview-stats">
                {statText(primaryStat)}
                {secondaryStat ? statText(secondaryStat) : null}
              </div>
            </div>
          </div>
        )}
      </GlassSurface>
    </Link>
  )
}
