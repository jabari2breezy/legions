import type { Metadata } from 'next'
import SignupForm from '@/components/SignupForm'

export const metadata: Metadata = {
  title: 'Volunteer Signup',
  description:
    'Sign up to volunteer with Legions Club in Dar es Salaam. Join 139 student volunteers making real change.',
}

export default function VolunteerPage() {
  return (
    <>
      <section className="page-banner">
        <div className="container page-banner-content">
          <span className="label">Volunteer</span>
          <h1 className="page-title">
            Join the <span className="accent">movement.</span>
          </h1>
          <p className="page-subtitle">
            Legions is powered by youth volunteers. High school and university
            students across Dar es Salaam lead humanitarian action and environmental
            initiatives. Add your name and we&apos;ll connect you to what&apos;s next.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div className="volunteer-page-layout">
            <SignupForm
              type="volunteer"
              heading="New volunteer signup"
              description="Fill in your details below. Your information goes directly to our team spreadsheet so we can follow up quickly."
              submitLabel="Sign up to volunteer"
            />

            <div className="volunteer-stats">
              <div className="volunteer-stat">
                <span className="volunteer-stat-value">139</span>
                <span className="volunteer-stat-label">student volunteers</span>
              </div>
              <div className="volunteer-stat">
                <span className="volunteer-stat-value">2,600+</span>
                <span className="volunteer-stat-label">hours of service</span>
              </div>
              <div className="volunteer-stat">
                <span className="volunteer-stat-value">2</span>
                <span className="volunteer-stat-label">core pillars: humanitarian & environmental</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
