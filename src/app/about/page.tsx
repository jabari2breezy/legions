import type { Metadata } from 'next'
import GlassSurface from '@/components/GlassSurface'

export const metadata: Metadata = {
  title: 'The Origin',
  description: 'Who Legions is and why it started — a youth volunteer group in Dar es Salaam, Tanzania.',
}

export default function AboutPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">Who we are</span>
          <h1 className="page-title">
            Built here, <span className="accent">for here.</span>
          </h1>
          <p className="page-subtitle">
            Legions is a youth volunteer collective in Dar es Salaam, built by
            students, graduates, and young professionals who got tired of waiting.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>
            <GlassSurface className="detail-panel">
              <h2 style={{ fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '1rem' }}>
                Who we are
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '1.0625rem' }}>
                Legions is a youth volunteer group based in <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Dar es Salaam, Tanzania</strong>,
                run by secondary students, university students, and young professionals.
                No formal hierarchy, no corporate sponsors — just young people who decided
                their community couldn&apos;t wait for someone else to act.
              </p>
            </GlassSurface>

            <GlassSurface className="detail-panel">
              <h2 style={{ fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '1rem' }}>
                Why it started
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '1.0625rem' }}>
                Instead of waiting on traditional NGOs or large aid organizations, local
                youth founded Legions to address immediate community needs directly.
                They focus on practical, hands-on work: fixing run-down facilities,
                supporting vulnerable families, cleaning public spaces, and planting trees.
              </p>
            </GlassSurface>

            <GlassSurface className="detail-panel">
              <h2 style={{ fontSize: '1.5rem', textTransform: 'none', letterSpacing: 'normal', lineHeight: '1.3', marginBottom: '1rem' }}>
                What drives us
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '1.0625rem' }}>
                Every shilling raised goes directly to raw materials, supplies, or food.
                Members contribute their own labor — no paid staff, no office rent, no
                overhead. This isn&apos;t charity tourism. It&apos;s neighbors taking care
                of neighbors, with radical transparency through mobile money and social
                media accountability.
              </p>
            </GlassSurface>
          </div>
        </div>
      </section>
    </>
  )
}
