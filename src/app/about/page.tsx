import type { Metadata } from 'next'
import GlassSurface from '@/components/GlassSurface'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Who Legions is and why it started. A youth volunteer collective in Dar es Salaam, Tanzania.',
}

export default function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">Who we are</span>
          <h1 className="page-title">Legions is where the need is visible.</h1>
          <p className="page-subtitle">
            Legions moves where the need is visible: patched up walls, cleared
            shorelines, trees in the ground, families with one less thing to worry
            about.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>
            <GlassSurface className="detail-panel">
              <h2 style={{ fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '1rem' }}>
                Youth-Centric Leadership
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '1.0625rem' }}>
                The organization relies heavily on the energy, fresh perspectives, and
                leadership of its student members to plan and execute its goals. It
                transforms empathy into tangible, hands-on action.
              </p>
            </GlassSurface>

            <GlassSurface className="detail-panel">
              <h2 style={{ fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '1rem' }}>
                Collaborative Action
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '1.0625rem' }}>
                Legions does not operate in a silo. A core part of its strategy
                involves collaborating with like-minded organizations, pooling
                resources, and expanding its network to maximize its footprint across
                Dar es Salaam.
              </p>
            </GlassSurface>

            <GlassSurface className="detail-panel">
              <h2 style={{ fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '1rem' }}>
                Operational Agility
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '1.0625rem' }}>
                Because the club is powered entirely by high school and university
                students, it can mobilize quickly for rapid response community needs
                and sustained campaigns. Over 139 student volunteers have contributed
                more than 2,600 hours of service.
              </p>
            </GlassSurface>

            <p style={{ color: 'var(--text-subtle)', fontSize: '0.875rem', lineHeight: '1.7' }}>
              Timeline note: Legions grew through student organizing, community
              partnerships, and steady work on the ground across Dar es Salaam.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
