import { projects } from '@/lib/projects'
import HomeHero from '@/components/HomeHero'
import ProjectPreviewCard from '@/components/ProjectPreviewCard'
import GlassSurface from '@/components/GlassSurface'
import MagneticButton from '@/components/MagneticButton'

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="section" id="who" data-scroll-panel>
        <div className="container">
          <span className="label" data-scroll-title>
            Who we are
          </span>
          <h2 className="section-heading">Who We Are</h2>
          <div className="origin-body origin-body--tight">
            <p>
              Legions moves where the need is visible: patched up walls, cleared
              shorelines, trees in the ground, families with one less thing to
              worry about. No hierarchy. No waiting on permission. Just students,
              graduates, and young professionals putting their hands where the
              problem is.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="how" data-scroll-panel>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="label" data-scroll-title>
            How we move
          </span>
          <h2 className="section-heading" style={{ margin: '1rem auto 0' }}>
            Hands in. <span className="accent">Overhead out.</span>
          </h2>
          <p
            style={{
              maxWidth: '640px',
              margin: '1.25rem auto 0',
              color: 'var(--text-muted)',
            }}
          >
            We keep the structure light so the work stays honest. Every shilling
            goes straight to materials, food, tools, and supplies. Nothing sits in
            an account.
          </p>
          <div className="method-grid">
            {[
              {
                title: 'Direct labor',
                desc: "If a wall needs painting or a beach needs clearing, you'll find Legions members doing it themselves, not managing someone else who is.",
              },
              {
                title: 'No hierarchy',
                desc: 'People lead by showing up, not by title. No gatekeepers, no approval chains, no waiting for a meeting.',
              },
              {
                title: 'Peer fundraising',
                desc: 'Micro donations move through M-Pesa and Tigo Pesa in minutes, tracked in public, spent within days.',
              },
            ].map((item) => (
              <GlassSurface key={item.title} className="method-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </GlassSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="projects" data-scroll-panel>
        <div className="container">
          <span className="label" data-scroll-title>
            No spin. Just receipts.
          </span>
          <h2 className="section-heading">
            Proof of work
          </h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectPreviewCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="join" data-scroll-panel>
        <div className="container">
          <GlassSurface className="cta-card">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2
                className="section-heading"
                style={{ margin: '0 auto', textAlign: 'center' }}
              >
                Bring hands, <span className="accent">not status.</span>
              </h2>
              <p className="cta-body">
                Want to volunteer, donate, or help document the work? Tell us what
                you&apos;ve got, we&apos;ll plug you into whatever&apos;s next.
              </p>
              <div className="cta-buttons">
                <MagneticButton href="/volunteer" className="btn-primary">
                  Volunteer signup →
                </MagneticButton>
                <MagneticButton href="/join" className="btn-secondary">
                  Share your interest ↑
                </MagneticButton>
              </div>
              <div className="cta-trust">
                <span>
                  <span className="dot" />
                  M-Pesa
                </span>
                <span>
                  <span className="dot" />
                  Tigo Pesa
                </span>
                <span>
                  <span className="dot" />
                  100% direct to projects
                </span>
                <span>
                  <span className="dot" />
                  Zero admin overhead
                </span>
              </div>
            </div>
          </GlassSurface>
        </div>
      </section>
    </>
  )
}
