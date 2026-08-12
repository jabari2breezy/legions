import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ScrollSystem from '@/components/ScrollSystem'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-heading',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    template: '%s | LEGIONS',
    default: 'LEGIONS | For the youth who inspire',
  },
  description:
    'Youth-led non-profit in Dar es Salaam, Tanzania. Humanitarian action and environmental sustainability, powered by 139 student volunteers.',
  openGraph: {
    title: 'LEGIONS | For the youth who inspire',
    description: 'Youth-led volunteer collective in Dar es Salaam.',
    images: ['/og-card.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <div className="noise-overlay" aria-hidden="true" />
        <div className="bg-deep" aria-hidden="true" />
        <Nav />
        <ScrollSystem />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
