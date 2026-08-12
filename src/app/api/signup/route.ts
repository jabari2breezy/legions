import { NextResponse } from 'next/server'

const SHEET_WEBAPP_URL = process.env.GOOGLE_SHEETS_WEBAPP_URL

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const message = String(body.message ?? '').trim()
    const type = body.type === 'volunteer' ? 'volunteer' : 'interest'

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    }

    if (!SHEET_WEBAPP_URL) {
      console.error('GOOGLE_SHEETS_WEBAPP_URL is not configured')
      return NextResponse.json(
        { error: 'Signup is temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }

    const response = await fetch(SHEET_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name,
        email,
        message,
        type,
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
