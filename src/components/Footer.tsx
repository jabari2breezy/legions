import Link from 'next/link'

export default function Footer({
  email,
  socialHandle,
  copyrightText,
}: {
  email: string
  socialHandle: string
  copyrightText: string
}) {

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link href="/" className="footer-logo">
          <span className="nav-wordmark">LEGIONS</span>
        </Link>

        <p className="footer-copy">
          {copyrightText} · {socialHandle} · {email}
        </p>

        <div className="footer-links">
          <a
            href="https://instagram.com/legions.tz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle
                cx="17.4"
                cy="6.6"
                r="1.1"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
