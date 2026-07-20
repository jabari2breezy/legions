import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Legions Club Tanzania - Youth-Led Humanitarian & Environmental Action',
  description: 'Legions Club is a student-led non-profit in Dar es Salaam mobilizing youth for humanitarian and environmental impact. 139 volunteers, 2600+ service hours, tree planting, hospital renovations, orphan support.',
  keywords: ['youth non-profit', 'student volunteers', 'Dar es Salaam', 'humanitarian aid', 'environmental action', 'Tanzania'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}