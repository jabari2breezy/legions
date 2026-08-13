'use client'

import { FormEvent, useState } from 'react'
import GlassSurface from '@/components/GlassSurface'

type SignupFormProps = {
  type: 'interest' | 'volunteer'
  heading: string
  description: string
  source?: string
  submitLabel?: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export default function SignupForm({
  type,
  heading,
  description,
  source = type,
  submitLabel = 'Submit',
}: SignupFormProps) {
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('submitting')
    setErrorMessage('')

    const form = event.currentTarget
    const data = new FormData(form)

    try {
        const response = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.get('name'),
            email: data.get('email'),
            reason: data.get('reason'),
            type,
            source,
          }),
        })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        throw new Error(payload.error || 'Something went wrong. Please try again.')
      }

      form.reset()
      setState('success')
    } catch (error) {
      setState('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <GlassSurface className="signup-form-card">
      <div className="signup-form-inner">
        <h2 className="signup-form-heading">{heading}</h2>
        <p className="signup-form-description">{description}</p>

        {state === 'success' ? (
          <div className="signup-form-success" role="status">
            <p>Thank you. We received your details and will be in touch soon.</p>
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <label className="signup-field">
              <span>Full name</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                disabled={state === 'submitting'}
              />
            </label>

            <label className="signup-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                disabled={state === 'submitting'}
              />
            </label>

            <label className="signup-field">
              <span>Why you&apos;re interested</span>
              <textarea
                name="reason"
                required
                rows={4}
                placeholder="Tell us what draws you to Legions and how you would like to help."
                disabled={state === 'submitting'}
              />
            </label>

            {state === 'error' && (
              <p className="signup-form-error" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              className="btn-primary signup-form-submit"
              disabled={state === 'submitting'}
            >
              {state === 'submitting' ? 'Sending...' : submitLabel}
            </button>
          </form>
        )}
      </div>
    </GlassSurface>
  )
}
