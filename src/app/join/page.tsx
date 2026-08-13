import type { Metadata } from 'next'
import SignupForm from '@/components/SignupForm'

export const metadata: Metadata = {
  title: 'Join',
  description:
    'Tell Legions your name, email, and why you want to help. Volunteer in Dar es Salaam.',
}

export default function JoinPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">Join</span>
          <h1 className="page-title">
            Bring your name, <span className="accent">email, and reason.</span>
          </h1>
          <p className="page-subtitle">
            Tell us who you are, how to reach you, and why Legions matters to you.
            We will follow up with the right next step.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="signup-page-grid signup-page-grid--single">
            <SignupForm
              type="interest"
              source="join page"
              heading="Tell us you're interested"
              description="Use this quick form if you want to volunteer, donate, or help document the work."
              submitLabel="Send my details"
            />
          </div>
        </div>
      </section>
    </>
  )
}
