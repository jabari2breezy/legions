import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = { title: 'Partner — Legions' }

export default function Partner() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-block)' }}>
        <span className="stat-label" style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '12px' }}>Corporate & Institutional</span>
        <h1 style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', maxWidth: '900px' }}>
          Invest in real change.
        </h1>
        <p style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-secondary)', maxWidth: '600px', marginTop: '24px' }}>
          Partner with the most effective youth-led organization in Dar es Salaam to fulfill your CSR objectives with total transparency.
        </p>
      </section>

      {/* Ways to partner */}
      <section className="container-narrow" style={{ paddingBottom: 'var(--space-section)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-gap)' }}>
          {[
            { title: 'Financial Sponsorship', desc: 'Fund specific projects like our Ujasiri House revamp or the Ramadan Iftar drives. Get full reporting on fund allocation.' },
            { title: 'In-Kind Donations', desc: 'Provide materials, logistical support, or expertise for our field operations.' },
            { title: 'Ongoing Alliance', desc: 'Establish a long-term relationship with Legions Tz for continuous, structured community impact.' },
          ].map((item) => (
            <div key={item.title} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
              <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>{item.title}</h3>
              <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="container-narrow" style={{ paddingBottom: 'var(--space-section)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'start' }}>
          <div>
            <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: '24px' }}>Let's build something together.</h2>
            <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              We are actively looking for corporate sponsors, NGOs, and local businesses to scale our operations.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--color-text-secondary)' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--color-accent)' }}>&#10003;</span> Tax-deductible receipts available
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--color-accent)' }}>&#10003;</span> Detailed post-project impact reports
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: 'var(--color-accent)' }}>&#10003;</span> Brand visibility across our network
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

      <Footer />
    </main>
  )
}
