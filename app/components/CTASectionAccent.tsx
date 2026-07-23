'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'

export default function CTASectionAccent() {
  return (
    <section style={{ margin: 'clamp(96px, 14vw, 220px) 0 0 0', padding: '0 clamp(20px, 5vw, 64px)' }}>
      <motion.div
        className="cta-accent"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <Image
          src="/hero-attached.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10, 10, 12, 0.55)', zIndex: 1 }} />
        <div className="cta-accent-content">
          <h2>Ready to serve?</h2>
          <div className="cta-accent-buttons">
            <Link href="/volunteer" className="btn-primary" style={{ background: 'var(--color-white)', color: 'var(--color-black)' }}>Volunteer</Link>
            <Link href="/partner" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.3)', color: 'var(--color-white)' }}>Partner With Us</Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
