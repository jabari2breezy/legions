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
  const baseStyles = 'inline-flex items-center justify-center rounded-full px-8 py-4 font-medium tracking-[0.02em] transition-all duration-500 hover:-translate-y-0.5'
  
  const variants = {
    primary: 'bg-[var(--color-cyan)] text-[var(--color-bg-deep)] shadow-[0_10px_30px_rgba(63,224,197,0.12)] hover:bg-white hover:shadow-[0_14px_40px_rgba(63,224,197,0.22)]',
    secondary: 'glass border-[var(--color-border-subtle)] text-white hover:bg-white/[0.08] hover:border-[var(--color-cyan)]'
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
