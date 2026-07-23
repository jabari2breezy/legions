import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Section } from '../components/Section'

export const metadata = { title: 'Partner — Legions' }

export default function Partner() {
  return (
    <main>
      <Nav />

      {/* Hero — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-block)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Corporate & Institutional</span>
          <h1 style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', maxWidth: '900px' }}>
            Invest in real change.
          </h1>
          <p style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-secondary-light)', maxWidth: '600px', marginTop: '24px' }}>
            Partner with the most effective youth-led organization in Dar es Salaam to fulfill your CSR objectives with total transparency.
          </p>
        </section>
      </Section>

      {/* Ways to partner — dark */}
      <Section variant="dark">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-gap)' }}>
            {[
              { n: '01', title: 'Financial Sponsorship', desc: 'Fund specific projects like our Ujasiri House revamp or the Ramadan Iftar drives. Get full reporting on fund allocation.' },
              { n: '02', title: 'In-Kind Donations', desc: 'Provide materials, logistical support, or expertise for our field operations.' },
              { n: '03', title: 'Ongoing Alliance', desc: 'Establish a long-term relationship with Legions Tz for continuous, structured community impact.' },
            ].map((item) => (
              <div key={item.title} style={{ borderTop: '2px solid var(--color-cyan)', paddingTop: '24px' }}>
                <span style={{ font: 'var(--text-hero)', color: 'var(--color-blue)', opacity: 0.2, lineHeight: 1, display: 'block' }}>{item.n}</span>
                <h3 style={{ font: 'var(--text-h3)', marginTop: '8px', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-dark)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* Contact Form — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingBottom: 'var(--space-section)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'start' }}>
            <div>
              <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: '24px' }}>Let's build something together.</h2>
              <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-light)', marginBottom: '24px' }}>
                We are actively looking for corporate sponsors, NGOs, and local businesses to scale our operations.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary-light)' }}>
                  <span style={{ color: 'var(--color-cyan)', fontWeight: 700 }}>&#10003;</span> Tax-deductible receipts available
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary-light)' }}>
                  <span style={{ color: 'var(--color-cyan)', fontWeight: 700 }}>&#10003;</span> Detailed post-project impact reports
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-secondary-light)' }}>
                  <span style={{ color: 'var(--color-cyan)', fontWeight: 700 }}>&#10003;</span> Brand visibility across our network
                </li>
              </ul>
            </div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-field">
                <label htmlFor="partner-org">Organization Name</label>
                <input id="partner-org" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="partner-contact">Contact Person</label>
                <input id="partner-contact" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="partner-email">Email Address</label>
                <input id="partner-email" type="email" />
              </div>
              <div className="form-field">
                <label htmlFor="partner-message">How would you like to partner?</label>
                <textarea id="partner-message" rows={4} />
              </div>
              <div>
                <button type="submit" className="btn-primary">Send Inquiry</button>
              </div>
            </form>
          </div>
        </section>
      </Section>

      <Footer />
    </main>
  )
}
