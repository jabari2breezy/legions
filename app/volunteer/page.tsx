import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Section } from '../components/Section'
import EditorialStatement from '../components/EditorialStatement'

export const metadata = { title: 'Volunteer — Legions' }

export default function Volunteer() {
  return (
    <main>
      <Nav />

      {/* Hero — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-block)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Join Us</span>
          <h1 style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', maxWidth: '900px' }}>
            Show up. Do the work.
          </h1>
        </section>
      </Section>

      {/* Mission — dark */}
      <Section variant="dark">
        <EditorialStatement>
          We don't need passive supporters. We need people willing to get their hands dirty to build a better community.
        </EditorialStatement>
      </Section>

      {/* Why Legions — light */}
      <Section variant="light">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>The Standard</span>
          <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: 'var(--space-block)' }}>Why Legions?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-gap)' }}>
            {[
              { title: 'Real Impact', desc: 'No busywork. Every hour you spend volunteering translates directly into planted trees, fed families, or built infrastructure.' },
              { title: 'Leadership Training', desc: "We don't just assign tasks; we build leaders. You will learn project management, logistics, and fundraising." },
              { title: 'The Network', desc: 'Join a brotherhood and sisterhood of the most driven, capable students in Dar es Salaam.' },
              { title: 'Service Hours', desc: 'We provide official documentation and verification for IB, CAS, and university application service requirements.' },
            ].map((item) => (
              <div key={item.title} style={{ borderTop: '2px solid var(--color-cyan)', paddingTop: '24px' }}>
                <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-light)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Section>

      {/* Form — dark */}
      <Section variant="dark">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Apply</span>
          <h2 style={{ font: 'var(--text-h2)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: 'var(--space-block)' }}>Apply to Volunteer</h2>
          <form style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-field">
                <label htmlFor="vol-name">Full Name</label>
                <input id="vol-name" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="vol-email">Email</label>
                <input id="vol-email" type="email" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-field">
                <label htmlFor="vol-school">School / University</label>
                <input id="vol-school" type="text" />
              </div>
              <div className="form-field">
                <label htmlFor="vol-age">Age</label>
                <input id="vol-age" type="number" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="vol-why">Why do you want to join Legions?</label>
              <textarea id="vol-why" rows={4} />
            </div>
            <div>
              <button type="submit" className="btn-primary">Submit Application</button>
            </div>
          </form>
        </section>
      </Section>

      <Footer />
    </main>
  )
}
