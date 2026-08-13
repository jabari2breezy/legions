import { NextResponse } from 'next/server'

const SHEET_WEBAPP_URL =
  process.env.GOOGLE_SHEETS_WEBAPP_URL ??
  process.env.GOOGLE_SHEETS_WEBHOOK_URL ??
  process.env.GOOGLE_APPS_SCRIPT_URL ??
  'https://script.google.com/macros/s/AKfycbwdYbAI30fLM3YcK69lv4YcfsqIca6SWeyOI1QsN60RwtjJTJIuPcslq2wNTnHNhLFm/exec'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const reason = String(body.reason ?? body.message ?? '').trim()
    const type = body.type === 'volunteer' ? 'volunteer' : 'interest'
    const source = String(body.source ?? '').trim()

    if (!name || !email || !reason) {
      return NextResponse.json({ error: 'Name, email, and reason are required.' }, { status: 400 })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    }

    const response = await fetch(SHEET_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name,
        email,
        reason,
        type,
        source,
        page: type === 'volunteer' ? 'volunteer' : 'join',
      }),
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Google Sheets submission failed:', text)
      return NextResponse.json(
        { error: 'Could not save your details. Please try again.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
