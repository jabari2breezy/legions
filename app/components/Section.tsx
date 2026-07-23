export function Section({
  variant = 'light',
  children,
  className = '',
}: {
  variant?: 'light' | 'dark' | 'accent'
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`section-${variant} ${className}`}>
      {children}
    </section>
  )
}
