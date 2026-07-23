'use client'

import { lazy, Suspense } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

const GlassBlobBackground = lazy(() => import('./WebGL/GlassBlobBackground').then(m => ({ default: m.GlassBlobBackground })))

export default function CTASectionAccent() {
  return (
    <motion.div
      className="cta-accent"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Suspense fallback={<div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #15144d 0%, #2B2A8C 50%, #15144d 100%)' }} />}>
        <GlassBlobBackground />
      </Suspense>
      <div className="cta-accent-content">
        <h2>Ready to serve?</h2>
        <div className="cta-accent-buttons">
          <Link href="/volunteer" className="btn-primary">Volunteer</Link>
          <Link href="/partner" className="btn-secondary" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}>Partner With Us</Link>
        </div>
      </div>
    </motion.div>
  )
}
