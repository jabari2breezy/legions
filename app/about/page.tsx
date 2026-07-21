import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SectionHeader from '../components/SectionHeader'
import ImpactCounter from '../components/ImpactCounter'

export default function About() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)]">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-40 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-cyan)]/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-[var(--spacing-section-x)] relative z-10">
          <SectionHeader 
            eyebrow="Our Story"
            title="Founded by Students in 2022."
            subtitle="We didn't want to wait until we were older to make a difference. We started Legions because Dar es Salaam needed action, not just awareness."
            align="left"
            className="mb-12"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="py-[var(--spacing-section-y)] bg-[var(--color-surface)] border-y border-[var(--color-border-subtle)]">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
            <ImpactCounter end={12} prefix="TZS " suffix="M+" label="Total Raised" />
            <ImpactCounter end={25000} suffix="+" label="Trees Planted" />
            <ImpactCounter end={100} suffix="+" label="Active Members" />
            <ImpactCounter end={7} label="Completed Projects" />
          </div>
        </div>
      </section>

      {/* Tenets */}
      <section className="py-[var(--spacing-section-y)] container mx-auto px-[var(--spacing-section-x)]">
        <SectionHeader 
          eyebrow="Core Tenets"
          title="What We Believe."
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Radical Transparency</h3>
            <p className="text-[var(--color-text-secondary)]">Every donation is accounted for. We show exactly where the money goes and the physical impact it creates.</p>
          </div>
          <div className="glass-panel p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Action Over Words</h3>
            <p className="text-[var(--color-text-secondary)]">We don't host galas to talk about problems; we get our hands dirty to fix them. Field work is our primary metric.</p>
          </div>
          <div className="glass-panel p-8">
            <h3 className="text-xl font-semibold text-white mb-4">Youth Empowerment</h3>
            <p className="text-[var(--color-text-secondary)]">Age is not a barrier to impact. We train the next generation of Tanzanian leaders through real-world service.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-[var(--spacing-section-y)] relative border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-deep)]">
        <div className="container mx-auto px-[var(--spacing-section-x)]">
          <SectionHeader 
            eyebrow="History"
            title="The Journey So Far."
            align="left"
            className="mb-16"
          />
          <div className="flex flex-col gap-8 max-w-4xl border-l border-[var(--color-cyan)]/30 ml-4 pl-8">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[var(--color-cyan)] shadow-[0_0_10px_rgba(63,224,197,0.5)]"></div>
              <h4 className="text-[var(--color-cyan)] font-mono text-sm mb-2">2022</h4>
              <h3 className="text-xl text-white font-semibold mb-2">Legions Founded</h3>
              <p className="text-[var(--color-text-secondary)]">A small group of high schoolers decides to formalize their community service efforts.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-cyan)]"></div>
              <h4 className="text-[var(--color-cyan)] font-mono text-sm mb-2">2023</h4>
              <h3 className="text-xl text-white font-semibold mb-2">First Major Success</h3>
              <p className="text-[var(--color-text-secondary)]">The MYK Tree Planting initiative hits 10,000 trees, proving the model works at scale.</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-[var(--color-surface)] border border-[var(--color-cyan)]"></div>
              <h4 className="text-[var(--color-cyan)] font-mono text-sm mb-2">2024</h4>
              <h3 className="text-xl text-white font-semibold mb-2">Expanding Scope</h3>
              <p className="text-[var(--color-text-secondary)]">Moving into healthcare infrastructure with Ujasiri House and clean water with the Pwani Well.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
