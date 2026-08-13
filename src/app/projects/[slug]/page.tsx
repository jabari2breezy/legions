import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects, getProjectBySlug } from '@/lib/projects'
import type { Metadata } from 'next'
import GlassSurface from '@/components/GlassSurface'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import FieldLog from '@/components/FieldLog'
import NextProjectSwipe from '@/components/NextProjectSwipe'
import { MotionCopy, MotionHeading } from '@/components/PageMotion'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Metadata {
  const project = getProjectBySlug(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.description,
  }
}

function StatBlock({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="project-detail-stat">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()
  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const [firstImage, secondImage, thirdImage] = project.images

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <MotionCopy>
            <Link href="/projects" className="back-link">
              Back to projects
            </Link>
          </MotionCopy>
          <MotionHeading>
            <span className="label" style={{ display: 'block', marginTop: '2rem' }}>
              {project.subtitle}
            </span>
            <h1 className="page-title">{project.title}</h1>
          </MotionHeading>
          <MotionCopy>
            <p className="page-subtitle">{project.location}</p>
          </MotionCopy>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <GlassSurface className={`project-detail-shell project-detail-shell--${project.layout}`}>
            {project.layout === 'numbers' && (
              <div className="project-detail-layout project-detail-layout--numbers">
                <div>
                  <div className="project-detail-hero-tag">Numbers first</div>
                  <div className="project-detail-hero-number">{project.stats[0]?.value}</div>
                  <p className="project-detail-hero-copy">{project.description}</p>
                  <div className="project-detail-stats">
                    {project.stats.map((stat) => (
                      <StatBlock key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                  </div>
                </div>
                <div className="project-detail-visual project-detail-visual--split">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={firstImage} alt={project.title} />
                  <div className="project-detail-visual-stack">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={secondImage} alt={project.title} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={thirdImage} alt={project.title} />
                  </div>
                </div>
              </div>
            )}

            {project.layout === 'gallery' && (
              <div className="project-detail-layout project-detail-layout--gallery">
                <div className="project-detail-visual project-detail-visual--before-after">
                  {project.compareImages ? (
                    <BeforeAfterSlider
                      before={project.compareImages.before}
                      after={project.compareImages.after}
                      alt={project.title}
                    />
                  ) : (
                    <div className="project-detail-before-after">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={firstImage} alt={project.title} />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={secondImage} alt={project.title} />
                    </div>
                  )}
                  <span className="project-detail-visual-caption">Gallery led, before and after.</span>
                </div>
                <div>
                  <p className="project-detail-hero-copy">{project.description}</p>
                  <div className="project-detail-stats">
                    {project.stats.map((stat) => (
                      <StatBlock key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                  </div>
                  <p className="project-detail-note">{project.impactNote}</p>
                </div>
              </div>
            )}

            {project.layout === 'horizontal' && (
              <div className="project-detail-layout project-detail-layout--horizontal">
                <div>
                  <div className="project-detail-hero-tag">Map the coast</div>
                  <p className="project-detail-hero-copy">{project.description}</p>
                  <div className="project-detail-stats">
                    {project.stats.map((stat) => (
                      <StatBlock key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                  </div>
                </div>
                <div className="project-detail-rail" aria-label="Beach cleanup images">
                  {project.images.map((src, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={src} src={src} alt={`${project.title} photo ${index + 1}`} />
                  ))}
                </div>
                <p className="project-detail-note">{project.impactNote}</p>
              </div>
            )}

            {project.layout === 'counter' && (
              <div className="project-detail-layout project-detail-layout--counter">
                <div className="project-detail-counter">
                  <span className="project-detail-hero-tag">Growing count</span>
                  <div className="project-detail-hero-number">{project.stats[0]?.value}</div>
                  <p className="project-detail-hero-copy">{project.description}</p>
                </div>
                <div className="project-detail-visual project-detail-visual--tall">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={firstImage} alt={project.title} />
                </div>
                <div className="project-detail-stats">
                  {project.stats.map((stat) => (
                    <StatBlock key={stat.label} value={stat.value} label={stat.label} />
                  ))}
                </div>
              </div>
            )}

            {project.layout === 'narrative' && (
              <div className="project-detail-layout project-detail-layout--narrative">
                <div className="project-detail-visual project-detail-visual--hero">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={firstImage} alt={project.title} />
                </div>
                <div>
                  <div className="project-detail-hero-tag">Human first</div>
                  <p className="project-detail-hero-copy">{project.description}</p>
                  <blockquote className="project-detail-quote">{project.impactNote}</blockquote>
                  <div className="project-detail-stats">
                    {project.stats.map((stat) => (
                      <StatBlock key={stat.label} value={stat.value} label={stat.label} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </GlassSurface>

          <div className="project-detail-copy">
            <h2 className="project-detail-section-title">What happened</h2>
            <p>{project.description}</p>
            {project.slug === 'ujasiri-house' && (
              <p className="note">
                Tumaini La Maisha means “hope for life.” The renovation supports the
                families who stay there while children receive treatment.
              </p>
            )}
            {project.slug === 'tree-planting' && (
              <p className="note">
                Project MYK is tied to school grounds where the new trees are being
                watched, watered, and kept alive after planting.
              </p>
            )}
            <p className="note">{project.impactNote}</p>
          </div>

          {project.slug === 'ramadhan' && <FieldLog entries={project.fieldLog} />}

          <div style={{ marginTop: '4rem' }}>
            <h2 className="project-detail-section-title">
              {project.slug === 'ujasiri-house' ? 'Before and after' : 'Gallery'}
            </h2>
            <div className="photo-grid">
              {(project.slug === 'ramadhan'
                ? [firstImage, secondImage, thirdImage]
                : project.slug === 'ujasiri-house'
                  ? [secondImage, thirdImage, project.images[3], project.images[4]]
                  : project.slug === 'beach-cleanups'
                    ? [firstImage, secondImage, thirdImage, project.images[4]]
                    : project.slug === 'tree-planting'
                      ? [firstImage, secondImage, project.images[5], project.images[6]]
                      : [firstImage, secondImage, thirdImage]
              ).map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt={`${project.title}, Photo ${i + 1}`}
                  loading={i < 4 ? 'eager' : 'lazy'}
                />
              ))}
            </div>
          </div>

          {project.slug !== 'ramadhan' && <FieldLog entries={project.fieldLog} />}

          <div style={{ marginTop: '5rem' }}>
            <NextProjectSwipe
              href={`/projects/${nextProject.slug}`}
              title={nextProject.title}
              subtitle={nextProject.subtitle}
              image={nextProject.images[0]}
            />
          </div>
        </div>
      </section>
    </>
  )
}
