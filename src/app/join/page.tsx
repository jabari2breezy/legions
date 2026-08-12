import type { Metadata } from 'next'
import GlassSurface from '@/components/GlassSurface'
import MagneticButton from '@/components/MagneticButton'

export const metadata: Metadata = {
  title: 'Show Up',
  description: 'Join Legions — no hierarchy, no gatekeeping. Volunteer in Dar es Salaam.',
}

export default function JoinPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">Show up</span>
          <h1 className="page-title">
            We need hands,{' '}
            <span className="accent">not résumés.</span>
          </h1>
          <p className="page-subtitle">
            No application form. No interview. If you&apos;re ready to work, we
            will find the right project.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <GlassSurface className="cta-card">
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="section-heading" style={{ margin: '0 auto', textAlign: 'center' }}>
                Ready to step in?
              </h2>
              <p className="cta-body">
                Follow <strong style={{ color: 'var(--accent)', fontWeight: 600 }}>@legions.tz</strong> on
                Instagram to see what&apos;s next, or DM us and we&apos;ll plug you in.
              </p>
              <div className="cta-buttons">
                <MagneticButton href="https://instagram.com/legions.tz" external className="btn-primary">
                  I&apos;m in →
                </MagneticButton>
              </div>

              <div style={{ marginTop: '3rem', display: 'grid', gap: '1.5rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                <GlassSurface className="detail-panel">
                  <h3 style={{ fontSize: '1rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '0.5rem' }}>
                    Donate via M-Pesa
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.7' }}>
                    Every donation goes directly to project materials. No admin
                    fees, no hidden overhead.
                  </p>
                </GlassSurface>
                <GlassSurface className="detail-panel">
                  <h3 style={{ fontSize: '1rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '0.5rem' }}>
                    Donate via Tigo Pesa
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: '1.7' }}>
                    Same principle: every shilling tracked, every purchase
                    documented, every project shared publicly.
                  </p>
                </GlassSurface>
              </div>

              <div className="cta-trust" style={{ marginTop: '2.5rem' }}>
                <span><span className="dot" />M-Pesa</span>
                <span><span className="dot" />Tigo Pesa</span>
                <span><span className="dot" />100% direct to projects</span>
                <span><span className="dot" />Zero admin overhead</span>
              </div>
            </div>
          </GlassSurface>
        </div>
      </section>
    </>
  )
}
