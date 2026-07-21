import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import ImpactCounter from '../components/ImpactCounter'
import Button from '../components/Button'

export default function Partner() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10 text-center">
          <SectionHeader 
            eyebrow="Corporate & Institutional"
            title="Invest in Real Change."
            subtitle="Partner with the most effective youth-led organization in Dar es Salaam to fulfill your CSR objectives with total transparency."
            className="mx-auto"
          />
        </div>
      </section>

      {/* Ways to Partner */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-surface)] border-y border-[var(--color-border-subtle)]">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-panel p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-cyan-dim)] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Financial Sponsorship</h3>
              <p className="text-[var(--color-text-secondary)]">Fund specific projects like our Ujasiri House revamp or the Ramadan Iftar drives. Get full reporting on fund allocation.</p>
            </div>
            <div className="glass-panel p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-cyan-dim)] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">In-Kind Donations</h3>
              <p className="text-[var(--color-text-secondary)]">Provide materials, logistical support, or expertise for our field operations.</p>
            </div>
            <div className="glass-panel p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-cyan-dim)] flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Ongoing Alliance</h3>
              <p className="text-[var(--color-text-secondary)]">Establish a long-term relationship with Legions Tz for continuous, structured community impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <SectionHeader 
              title="Let's build something together."
              align="left"
              className="mb-8"
            />
            <p className="text-[var(--color-text-secondary)] mb-6">We are actively looking for corporate sponsors, NGOs, and local businesses to scale our operations.</p>
            <ul className="flex flex-col gap-4 text-[var(--color-text-secondary)]">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Tax-deductible receipts available
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Detailed post-project impact reports
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-[var(--color-cyan)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Brand visibility across our network
              </li>
            </ul>
          </div>
          <div className="glass-panel p-8">
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Organization Name" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)]" />
              <input type="text" placeholder="Contact Person" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)]" />
              <input type="email" placeholder="Email Address" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)]" />
              <textarea rows={4} placeholder="How would you like to partner?" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)]"></textarea>
              <Button type="submit" variant="primary" className="w-full mt-2">Send Inquiry</Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
