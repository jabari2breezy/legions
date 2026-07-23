import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Section } from '../components/Section'

export const metadata = { title: 'Contact — Legions' }

export default function Contact() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      {/* Hero — dark */}
      <Section variant="dark" className="flex-1">
        <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ font: 'var(--text-label)', textTransform: 'uppercase' as const, letterSpacing: 'var(--letter-spacing-label)', color: 'var(--color-cyan)', display: 'block', marginBottom: '12px' }}>Get in Touch</span>
          <h1 style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: '24px' }}>Get in touch.</h1>
          <p style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-secondary-dark)', maxWidth: '600px', marginBottom: 'var(--space-block)' }}>
            Whether you have a question, a partnership proposal, or just want to say hi, we're ready to talk.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-gap)' }}>
            <div style={{ borderTop: '2px solid var(--color-cyan)', paddingTop: '24px' }}>
              <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>Email Us</h3>
              <a href="mailto:hello@legionsclub.tz" className="text-link" style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-dark)' }}>hello@legionsclub.tz</a>
            </div>
            <div style={{ borderTop: '2px solid var(--color-cyan)', paddingTop: '24px' }}>
              <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>Instagram</h3>
              <a href="#" className="text-link" style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-dark)' }}>@legionsclubtz</a>
            </div>
            <div style={{ borderTop: '2px solid var(--color-cyan)', paddingTop: '24px' }}>
              <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>Location</h3>
              <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary-dark)' }}>Dar es Salaam, Tanzania</p>
            </div>
          </div>
        </section>
      </Section>

      <Footer />
    </main>
  )
}
