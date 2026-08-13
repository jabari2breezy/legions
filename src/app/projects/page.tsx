import { projects } from '@/lib/projects'
import type { Metadata } from 'next'
import ProjectPreviewCard from '@/components/ProjectPreviewCard'
import { MotionCopy, MotionHeading } from '@/components/PageMotion'

export const metadata: Metadata = {
  title: 'The Work',
  description:
    'Legions projects in Dar es Salaam: AMSEN visits, beach cleanups, Ramadhan food drive, tree planting, and Ujasiri House renovation.',
}

export default function ProjectsPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <MotionHeading>
            <span className="label">Proof of work</span>
            <h1 className="page-title">No spin. Just receipts.</h1>
          </MotionHeading>
          <MotionCopy>
            <p className="page-subtitle">
              The rail below is the destination. Scroll through the work, then open
              the project that needs your attention.
            </p>
          </MotionCopy>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectPreviewCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
