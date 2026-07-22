import type { Metadata } from 'next'
import { Outfit, Geist_Mono } from 'next/font/google'
import './globals.css'
import SmoothScrollProvider from './components/SmoothScrollProvider'

const outfit = Outfit({ 
  variable: '--font-sans', 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'] 
})
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Legions — Youth-Led Action. Real Community Change.',
  description: 'Student-led community service in Dar es Salaam. Impacting lives through action.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
