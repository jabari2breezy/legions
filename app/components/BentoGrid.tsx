import React from 'react'

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export default function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px] ${className}`}>
      {children}
    </div>
  )
}
