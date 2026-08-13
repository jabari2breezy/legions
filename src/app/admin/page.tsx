'use client'

import { useEffect, useMemo, useState } from 'react'

const storageKey = 'legions-admin-draft'

const defaultDraft = {
  brandLine: 'For the ones who show up.',
  heroHeadline: 'LEGIONS',
  heroSubhead: 'For the youth who inspire',
  joinIntro:
    'Tell us who you are, how to reach you, and why Legions matters to you.',
  volunteerIntro:
    'Add your name, email, and a short note about why you want in.',
  ctaHeadline: 'Bring hands, not status.',
  ctaBody:
    "Want to volunteer, donate, or help document the work? Tell us what you've got, we'll plug you into whatever's next.",
}

export default function AdminPage() {
  const [draft, setDraft] = useState(defaultDraft)
  const [jsonInput, setJsonInput] = useState(JSON.stringify(defaultDraft, null, 2))
  const [status, setStatus] = useState('Ready to edit.')

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return

    try {
      const parsed = JSON.parse(saved)
      setDraft((current) => ({ ...current, ...parsed }))
      setJsonInput(JSON.stringify({ ...defaultDraft, ...parsed }, null, 2))
      setStatus('Loaded your saved draft.')
    } catch {
      setStatus('Saved draft could not be read.')
    }
  }, [])

  const preview = useMemo(
    () => ({
      ...defaultDraft,
      ...draft,
    }),
    [draft]
  )

  function syncJson(nextDraft: Record<string, string>) {
    const merged = { ...defaultDraft, ...nextDraft }
    setDraft(merged)
    setJsonInput(JSON.stringify(merged, null, 2))
    window.localStorage.setItem(storageKey, JSON.stringify(merged))
    setStatus('Draft saved locally in this browser.')
  }

  function handleTextField(key: keyof typeof defaultDraft, value: string) {
    syncJson({ ...draft, [key]: value })
  }

  function handleJsonChange(value: string) {
    setJsonInput(value)
    try {
      const parsed = JSON.parse(value)
      setDraft({ ...defaultDraft, ...parsed })
      setStatus('JSON is valid. Preview updated.')
    } catch {
      setStatus('JSON needs a quick fix before it can be saved.')
    }
  }

  function saveJson() {
    try {
      const parsed = JSON.parse(jsonInput)
      syncJson(parsed)
    } catch {
      setStatus('Fix the JSON first, then save again.')
    }
  }

  function resetDraft() {
    setDraft(defaultDraft)
    setJsonInput(JSON.stringify(defaultDraft, null, 2))
    window.localStorage.removeItem(storageKey)
    setStatus('Reset to the default draft.')
  }

  async function copyJson() {
    await navigator.clipboard.writeText(jsonInput)
    setStatus('Copied the draft JSON.')
  }

  return (
    <main className="admin-shell container">
      <div className="admin-header">
        <span className="label">Admin</span>
        <h1 className="page-title">Content studio</h1>
        <p className="page-subtitle">
          Edit the site copy from one place. This stores a draft in your browser,
          which keeps the route private unless you visit <code>/admin</code>.
        </p>
      </div>

      <div className="admin-grid">
        <section className="admin-panel">
          <h2>Quick fields</h2>
          <label>
            Brand line
            <input value={draft.brandLine} onChange={(event) => handleTextField('brandLine', event.target.value)} />
          </label>
          <label>
            Hero headline
            <input value={draft.heroHeadline} onChange={(event) => handleTextField('heroHeadline', event.target.value)} />
          </label>
          <label>
            Hero subhead
            <input value={draft.heroSubhead} onChange={(event) => handleTextField('heroSubhead', event.target.value)} />
          </label>
          <label>
            Join intro
            <textarea value={draft.joinIntro} onChange={(event) => handleTextField('joinIntro', event.target.value)} />
          </label>
          <label>
            Volunteer intro
            <textarea value={draft.volunteerIntro} onChange={(event) => handleTextField('volunteerIntro', event.target.value)} />
          </label>
          <label>
            CTA headline
            <input value={draft.ctaHeadline} onChange={(event) => handleTextField('ctaHeadline', event.target.value)} />
          </label>
          <label>
            CTA body
            <textarea value={draft.ctaBody} onChange={(event) => handleTextField('ctaBody', event.target.value)} />
          </label>
        </section>

        <section className="admin-panel">
          <h2>Raw JSON</h2>
          <textarea
            className="admin-json"
            value={jsonInput}
            onChange={(event) => handleJsonChange(event.target.value)}
          />
          <div className="admin-actions">
            <button className="btn-primary" onClick={saveJson}>Save draft</button>
            <button className="btn-secondary" onClick={copyJson}>Copy JSON</button>
            <button className="btn-secondary" onClick={resetDraft}>Reset</button>
          </div>
          <p className="admin-status">{status}</p>
        </section>
      </div>

      <section className="admin-preview">
        <h2>Live preview</h2>
        <div className="admin-preview-card">
          <span>{preview.brandLine}</span>
          <h3>{preview.heroHeadline}</h3>
          <p>{preview.heroSubhead}</p>
          <p>{preview.joinIntro}</p>
          <p>{preview.volunteerIntro}</p>
          <strong>{preview.ctaHeadline}</strong>
          <p>{preview.ctaBody}</p>
        </div>
      </section>
    </main>
  )
}
