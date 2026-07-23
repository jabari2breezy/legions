'use client'

import { ReactNode } from 'react'
import { SmoothScrollProvider } from './SmoothScroll'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  )
}
