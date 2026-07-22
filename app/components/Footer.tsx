import Link from 'next/link'
import Button from './Button'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#0b0a2a] pt-24 pb-8 border-t border-[var(--color-border-subtle)] relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[var(--color-cyan)]/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="container mx-auto px-[var(--spacing-section-x)]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20">
          
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <span className="text-3xl font-bold tracking-tighter text-white">LEGIONS</span>
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_15px_rgba(63,224,197,0.8)]"></div>
            </Link>
            <p className="text-[var(--color-text-secondary)] text-[var(--font-size-body)] max-w-md mb-8 leading-relaxed">
              A student-led community service organization in Dar es Salaam, Tanzania. We take action where it matters.
            </p>
            <Button href="/volunteer" variant="primary" className="!py-3 !px-6">
              Join the Movement
            </Button>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Organization</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">Projects</Link></li>
              <li><Link href="/volunteer" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">Volunteer</Link></li>
              <li><Link href="/partner" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">Partner</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Projects</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/projects/amsen-visits" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">AMSEN Visits</Link></li>
              <li><Link href="/projects/beach-cleanups" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">Beach Cleanups</Link></li>
              <li><Link href="/projects/ramadhan-project" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">Ramadhan Project</Link></li>
              <li><Link href="/projects/tree-planting" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">Tree Planting</Link></li>
              <li><Link href="/projects/ujasiri-house" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors">Ujasiri House</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-6 tracking-wide">Connect</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="mailto:hello@legionsclub.tz" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                hello@legionsclub.tz
              </a></li>
              <li><a href="#" className="text-[var(--color-text-secondary)] hover:text-[var(--color-cyan)] transition-colors flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                @legionsclubtz
              </a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--color-border-subtle)] text-[var(--color-text-muted)] text-sm">
          <p>&copy; {currentYear} Legions Tz. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
