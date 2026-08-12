import { projects } from '@/lib/projects'
import type { Metadata } from 'next'
import ProjectPreviewCard from '@/components/ProjectPreviewCard'

export const metadata: Metadata = {
  title: 'The Work',
  description: 'Legions projects in Dar es Salaam: AMSEN visits, beach cleanups, Ramadhan food drive, tree planting, and Ujasiri House renovation.',
}

export default function ProjectsPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">Proof of work</span>
          <h1 className="page-title">
            Five projects.{' '}
            <span className="accent">No generic packaging.</span>
          </h1>
          <p className="page-subtitle">
            Each project uses a layout that fits its story, not a one-size-fits-all
            template.
          </p>
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
