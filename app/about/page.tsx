import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Section } from '../components/Section'
import EditorialStatement from '../components/EditorialStatement'

export const metadata = { title: 'About — Legions' }

export default function About() {
  return (
    <main>
      <Nav />

      {/* Hero — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-block)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Our Story</span>
          <h1 style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', maxWidth: '900px' }}>
            Founded by students in 2022.
          </h1>
          <p style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-secondary-light)', maxWidth: '600px', marginTop: '24px' }}>
            We didn't want to wait until we were older to make a difference. We started Legions because Dar es Salaam needed action, not just awareness.
          </p>
        </section>
      </Section>

      {/* Mission — dark */}
      <Section variant="dark">
        <EditorialStatement>
          From renovating cancer patient housing at Ujasiri House to coastal beach cleanups and tree planting, our mandate is simple: direct action, zero bureaucracy, total transparency.
        </EditorialStatement>
      </Section>

      {/* Tenets — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Core Tenets</span>
          <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: 'var(--space-block)' }}>What We Believe</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-gap)' }}>
            {[
              { n: '01', title: 'Radical Transparency', desc: 'Every donation is accounted for. We show exactly where the money goes and the physical impact it creates.' },
              { n: '02', title: 'Action Over Words', desc: "We don't host galas to talk about problems; we get our hands dirty to fix them. Field work is our primary metric." },
              { n: '03', title: 'Youth Empowerment', desc: 'Age is not a barrier to impact. We train the next generation of Tanzanian leaders through real-world service.' },
            ].map((t) => (
              <div key={t.title} style={{ borderTop: '2px solid var(--color-cyan)', paddingTop: '24px' }}>
                <span style={{ font: 'var(--text-hero)', color: 'var(--color-blue)', opacity: 0.15, lineHeight: 1, display: 'block' }}>{t.n}</span>
                <h3 style={{ font: 'var(--text-h3)', marginTop: '8px', marginBottom: '8px' }}>{t.title}</h3>
                <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-light)' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* Timeline — dark */}
      <Section variant="dark">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>History</span>
          <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: 'var(--space-block)' }}>The Journey So Far</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', borderLeft: '2px solid var(--color-cyan)', paddingLeft: '32px', maxWidth: '700px' }}>
            {[
              { year: '2022', title: 'Legions Founded', desc: 'A small group of high schoolers decides to formalize their community service efforts.' },
              { year: '2023', title: 'First Major Success', desc: 'The MYK Tree Planting initiative hits 10,000 trees, proving the model works at scale.' },
              { year: '2024', title: 'Expanding Scope', desc: 'Moving into healthcare infrastructure with Ujasiri House and clean water with the Pwani Well.' },
            ].map((item) => (
              <div key={item.year}>
                <span style={{ font: 'var(--text-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '4px' }}>{item.year}</span>
                <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-dark)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Section>

      <Footer />
    </main>
  )
}
