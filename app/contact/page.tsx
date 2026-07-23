import Nav from '../components/Nav'
import Footer from '../components/Footer'

export const metadata = { title: 'Contact — Legions' }

export default function Contact() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Nav />

      <section className="container-narrow" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h1 style={{ font: 'var(--text-h1)', letterSpacing: 'var(--letter-spacing-display)', marginBottom: '24px' }}>Get in touch.</h1>
        <p style={{ font: 'var(--text-body-lg)', color: 'var(--color-text-secondary)', maxWidth: '600px', marginBottom: 'var(--space-block)' }}>
          Whether you have a question, a partnership proposal, or just want to say hi, we're ready to talk.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-gap)' }}>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
            <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>Email Us</h3>
            <a href="mailto:hello@legionsclub.tz" style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>hello@legionsclub.tz</a>
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
            <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>Instagram</h3>
            <a href="#" style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)', textDecoration: 'none' }}>@legionsclubtz</a>
          </div>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
            <h3 style={{ font: 'var(--text-h3)', marginBottom: '8px' }}>Location</h3>
            <p style={{ font: 'var(--text-body)', color: 'var(--color-text-secondary)' }}>Dar es Salaam, Tanzania</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
