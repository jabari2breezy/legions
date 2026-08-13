import type { Metadata } from 'next'
import GlassSurface from '@/components/GlassSurface'

export const metadata: Metadata = {
  title: 'How We Move',
  description:
    'How Legions works: direct labor, no hierarchy, and peer fundraising. Every shilling goes where it matters.',
}

export default function WorkPage() {
  const principles = [
    {
      title: 'Direct Labor',
      description:
        "If a wall needs painting or a beach needs clearing, you'll find Legions members doing it themselves, not managing someone else who is.",
    },
    {
      title: 'No Ego or Hierarchy',
      description:
        'People lead by showing up, not by title. No gatekeepers, no approval chains, no waiting for a meeting.',
    },
    {
      title: 'Peer Fundraising',
      description:
        'Micro donations move through M-Pesa and Tigo Pesa in minutes, tracked in public, spent within days.',
    },
  ]

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">How we move</span>
          <h1 className="page-title">
            Hands in. <span className="accent">Overhead out.</span>
          </h1>
          <p className="page-subtitle">
            We keep the structure light so the work stays honest. Every shilling
            goes straight to materials, food, tools, and supplies. Nothing sits in
            an account.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: '2rem', maxWidth: '800px' }}>
            {principles.map((p, i) => (
              <GlassSurface key={p.title} className="detail-panel">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border-accent)',
                    background: 'rgba(0, 245, 212, 0.08)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 900,
                    fontSize: '0.875rem',
                    color: 'var(--accent)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 style={{
                    fontSize: '1.5rem',
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    lineHeight: '1.3',
                  }}>
                    {p.title}
                  </h2>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.85', fontSize: '1.0625rem' }}>
                  {p.description}
                </p>
              </GlassSurface>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
