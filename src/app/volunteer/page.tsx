import type { Metadata } from 'next'
import SignupForm from '@/components/SignupForm'

export const metadata: Metadata = {
  title: 'Volunteer Signup',
  description:
    'Sign up to volunteer with Legions Club in Dar es Salaam. Your details go straight into the volunteer sheet.',
}

export default function VolunteerPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">Volunteer</span>
          <h1 className="page-title">
            Sign up to <span className="accent">show up.</span>
          </h1>
          <p className="page-subtitle">
            Add your name, email, and a short note about why you want in. The form
            goes straight to our Google Sheet so we can follow up quickly.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="volunteer-page-layout">
            <SignupForm
              type="volunteer"
              source="volunteer page"
              heading="New volunteer signup"
              description="This page is just for new volunteers. Send your details and we will place you where the work is happening."
              submitLabel="Sign up to volunteer"
            />
          </div>
        </div>
      </section>
    </>
  )
}
