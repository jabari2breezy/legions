import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Section } from '../components/Section'
import ProjectCardQuiet from '../components/ProjectCardQuiet'
import projectsIndex from '../../data/projects-index.json'
import type { ProjectSummary } from '../../types/project'

export const metadata = { title: 'Projects — Legions' }

const projects = (projectsIndex as ProjectSummary[]).map((p, i) => ({
  slug: p.slug,
  title: p.title,
  category: p.category,
  imageSrc: `/projects/${p.heroImage.filename}`,
  index: i,
}))

export default function Projects() {
  return (
    <main>
      <Nav />

      {/* Hero — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-block)' }}>
          <span className="stat-label" style={{ color: 'var(--color-text-secondary-light)', display: 'block', marginBottom: '12px' }}>Our Work</span>
          <h1 style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', maxWidth: '900px' }}>
            Projects that matter.
          </h1>
          <p style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-secondary-light)', maxWidth: '600px', marginTop: '24px' }}>
            The initiatives where Legions has directed funding, sweat, and community power.
          </p>
        </section>
      </Section>

      {/* Grid — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingBottom: 'var(--space-section)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 'var(--space-gap)' }}>
            {projects.map((p) => (
              <ProjectCardQuiet key={p.slug} {...p} />
            ))}
          </div>
        </section>
      </Section>

      <Footer />
    </main>
  )
}
