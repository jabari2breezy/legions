import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import ProcessStep from '../components/ProcessStep'
import Button from '../components/Button'

export default function Volunteer() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10 text-center">
          <SectionHeader 
            eyebrow="Join Us"
            title="Show Up. Do the Work."
            subtitle="We don't need passive supporters. We need people willing to get their hands dirty to build a better community."
            className="mx-auto"
          />
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-surface)] border-y border-[var(--color-border-subtle)]">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <SectionHeader 
            eyebrow="The Standard"
            title="Why Legions?"
            align="left"
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8">
              <h3 className="text-xl font-semibold text-white mb-3">Real Impact</h3>
              <p className="text-[var(--color-text-secondary)]">No busywork. Every hour you spend volunteering translates directly into planted trees, fed families, or built infrastructure.</p>
            </div>
            <div className="glass-panel p-8">
              <h3 className="text-xl font-semibold text-white mb-3">Leadership Training</h3>
              <p className="text-[var(--color-text-secondary)]">We don't just assign tasks; we build leaders. You will learn project management, logistics, and fundraising.</p>
            </div>
            <div className="glass-panel p-8">
              <h3 className="text-xl font-semibold text-white mb-3">The Network</h3>
              <p className="text-[var(--color-text-secondary)]">Join a brotherhood and sisterhood of the most driven, capable students in Dar es Salaam.</p>
            </div>
            <div className="glass-panel p-8">
              <h3 className="text-xl font-semibold text-white mb-3">Service Hours</h3>
              <p className="text-[var(--color-text-secondary)]">We provide official documentation and verification for IB, CAS, and university application service requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)]">
        <div className="max-w-3xl mx-auto glass-panel p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">Apply to Volunteer</h2>
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Full Name</label>
                <input type="text" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Email</label>
                <input type="email" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] transition-colors" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">School / University</label>
                <input type="text" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[var(--color-text-secondary)]">Age</label>
                <input type="number" className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[var(--color-text-secondary)]">Why do you want to join Legions?</label>
              <textarea rows={4} className="bg-[var(--color-bg-deep)] border border-[var(--color-border-subtle)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-cyan)] transition-colors"></textarea>
            </div>
            <Button type="submit" variant="primary" className="w-full mt-4">Submit Application</Button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
