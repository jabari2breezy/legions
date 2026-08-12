import type { Metadata } from 'next'
import GlassSurface from '@/components/GlassSurface'

export const metadata: Metadata = {
  title: 'The Method',
  description: 'How Legions works: direct labor, flat hierarchy, peer fundraising. Every shilling goes where it matters.',
}

export default function WorkPage() {
  const principles = [
    {
      title: 'Direct Labor',
      description:
        'Members show up in person to do the physical work, ensuring donor money goes entirely toward raw materials, supplies, and food. No contractors, no middlemen.',
      detail:
        'When we renovate a hospital hostel, our volunteers hold the paint brushes. When we clean a beach, our volunteers fill the bags. The work is ours.',
    },
    {
      title: 'No Ego or Hierarchy',
      description:
        'A flat collective where any young person can jump in, volunteer, and take ownership of projects. No titles, no gatekeeping.',
      detail:
        'A secondary school student has as much say as a university graduate. Projects are led by whoever has the energy and the plan, not by seniority.',
    },
    {
      title: 'Peer Fundraising',
      description:
        'Micro-donations are raised transparently across social media using local mobile money services (M-Pesa and Tigo Pesa) with zero administrative overhead.',
      detail:
        'Every contribution is tracked and reported publicly. Donors see exactly what their money bought, down to the last bag of rice or tin of paint.',
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
            Three rules keep Legions lean, transparent, and accountable: do the
            work yourself, keep the structure flat, and show receipts.
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
                <p style={{ color: 'var(--text-subtle)', lineHeight: '1.7', fontSize: '0.9375rem', marginTop: '1rem' }}>
                  {p.detail}
                </p>
              </GlassSurface>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
