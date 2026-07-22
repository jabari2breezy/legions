'use client'

import { ReactNode } from 'react'
import { SmoothScrollProvider } from './SmoothScroll'
import { PageTransitionProvider } from '../Transitions/PageTransition'
import { FluidCursor } from '../Cursor/FluidCursor'
import GrainOverlay from '../GrainOverlay'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      <PageTransitionProvider>
        <FluidCursor />
        <GrainOverlay opacity={0.04} />
        <div data-page-content>{children}</div>
      </PageTransitionProvider>
    </SmoothScrollProvider>
  )
}
