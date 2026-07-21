import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import Button from '../components/Button'

export default function Contact() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)] flex flex-col">
      <Navbar />
      
      <section className="flex-grow pt-40 pb-20 relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-cyan)]/5 to-transparent z-0"></div>
        
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <SectionHeader 
            title="Get in Touch."
            subtitle="Whether you have a question, a partnership proposal, or just want to say hi, we're ready to talk."
            align="center"
            className="mb-16 mx-auto"
          />
          
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <a href="mailto:hello@legionsclub.tz" className="glass-panel p-8 text-center flex flex-col items-center group hover:border-[var(--color-cyan)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--color-cyan-dim)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-white font-medium mb-2">Email Us</h3>
              <p className="text-[var(--color-text-secondary)]">hello@legionsclub.tz</p>
            </a>
            
            <a href="#" className="glass-panel p-8 text-center flex flex-col items-center group hover:border-[var(--color-cyan)] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[var(--color-cyan-dim)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <h3 className="text-white font-medium mb-2">Instagram</h3>
              <p className="text-[var(--color-text-secondary)]">@legionsclubtz</p>
            </a>
            
            <div className="glass-panel p-8 text-center flex flex-col items-center group">
              <div className="w-12 h-12 rounded-full bg-[var(--color-cyan-dim)] flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-white font-medium mb-2">Location</h3>
              <p className="text-[var(--color-text-secondary)]">Dar es Salaam, Tanzania</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
