import Link from 'next/link'
import React from 'react'

interface ButtonProps {
  href?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button'
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:scale-105'
  
  const variants = {
    primary: 'bg-[var(--color-cyan)] text-[var(--color-bg-deep)] hover:bg-white hover:shadow-[0_0_20px_rgba(63,224,197,0.4)]',
    secondary: 'glass border-[var(--color-border-subtle)] text-white hover:bg-white/10 hover:border-[var(--color-cyan)]'
  }

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  )
}
