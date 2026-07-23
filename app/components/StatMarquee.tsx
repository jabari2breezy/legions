'use client'

import { motion } from 'motion/react'

const stats = [
  { value: 'TZS 12M+', label: 'Funds Raised' },
  { value: '500+', label: 'Trees Planted' },
  { value: '5', label: 'Major Initiatives' },
  { value: '150+', label: 'Active Volunteers' },
]

export default function StatMarquee() {
  return (
    <div className="stat-marquee">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="stat-marquee-item"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 22, delay: i * 0.08 }}
        >
          <span className="stat-value">{stat.value}</span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
