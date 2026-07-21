import FilmGrain from './components/FilmGrain'
import Hero from './components/Hero'
import BentoGrid from './components/BentoGrid'
import BentoCard from './components/BentoCard'
import SectionHeader from './components/SectionHeader'
import ImpactCounter from './components/ImpactCounter'

export default function Home() {
  return (
    <main className="relative bg-bg-deep min-h-screen text-text-primary overflow-hidden">
      <FilmGrain />
      
      {/* Navigation (Placeholder, can be a component later) */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 mix-blend-difference">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="font-bold text-xl tracking-tighter uppercase font-mono">Legions</div>
          <a href="mailto:contact@legions.org" className="text-sm font-mono uppercase tracking-widest hover:text-cyan transition-colors">
            Contact
          </a>
        </div>
      </nav>

      <Hero />

      <section className="relative z-10 py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <SectionHeader title="Our Impact Projects" subtitle="Initiatives" />
        
        <BentoGrid>
          {/* Main Feature - Spans 2 cols, 2 rows on desktop */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            title="Ujasiri House Renovation"
            description="Complete overhaul and restoration of the Ujasiri House facilities to provide a safe haven for vulnerable youth."
            // Assuming these images exist based on prompt, fallback to none if not
            // imageSrc="/ujasiri.jpg" 
          />
          
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            title="AMSEN Visits"
            description="Regular engagement and support sessions with the AMSEN community."
          />

          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Tree Planting"
            description="Reforestation efforts across Dar es Salaam."
          />

          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Beach Cleanups"
            description="Preserving our coastline ecosystems."
          />

          <BentoCard
            className="md:col-span-4 md:row-span-1"
            title="Ramadhan Project"
            description="Annual community food drive and support during the holy month."
          />
        </BentoGrid>
      </section>

      <section className="relative z-10 py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImpactCounter end={15} suffix="+" label="Projects Completed" />
          <ImpactCounter end={500} suffix="+" label="Lives Impacted" />
          <ImpactCounter end={50} suffix="+" label="Volunteers" />
          <ImpactCounter end={100} suffix="k" label="Trees Planted" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-border-subtle text-center text-text-muted text-sm font-mono">
        <p>&copy; {new Date().getFullYear()} Legions. Youth-Led Action.</p>
      </footer>
    </main>
  )
}
