'use client'

import { motion } from 'motion/react'

interface EditorialStatementProps {
  children: string
  className?: string
}

export default function EditorialStatement({ children, className = '' }: EditorialStatementProps) {
  return (
    <motion.div
      className={`editorial-statement ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <p>{children}</p>
    </motion.div>
  )
}
