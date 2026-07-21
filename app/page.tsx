import Navbar from './components/Navbar'
import FilmGrain from './components/FilmGrain'
import InteractiveHero from './components/InteractiveHero'
import HorizontalScroll from './components/HorizontalScroll'
import BentoGrid from './components/BentoGrid'
import BentoCard from './components/BentoCard'
import SectionHeader from './components/SectionHeader'
import ImpactCounter from './components/ImpactCounter'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative bg-bg-deep min-h-screen text-text-primary overflow-hidden">
      <FilmGrain />
      <Navbar />

      {/* Interactive 3D/Glass Hero */}
      <InteractiveHero />

      {/* Horizontal Scroll Showcase (Raben Rifaie style) */}
      <HorizontalScroll />

      {/* Bento Grid Highlights */}
      <section className="relative z-10 py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <SectionHeader title="Our Pillars of Impact" subtitle="Core Initiatives" align="left" />
        
        <BentoGrid>
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            title="Ujasiri House Renovation"
            description="Complete overhaul and restoration of the Ujasiri House facilities to provide safe, comfortable, and empowering living spaces for vulnerable children."
            imageSrc="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200"
          />
          
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            title="AMSEN Mentorship Visits"
            description="Engaging educational sessions, art therapy, and companionship with the AMSEN community."
            imageSrc="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200"
          />

          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Tree Planting"
            description="Reforestation drives across urban Dar es Salaam."
            imageSrc="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200"
          />

          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Beach Cleanups"
            description="Coastal ecosystem cleanup drives."
            imageSrc="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1200"
          />

          <BentoCard
            className="md:col-span-4 md:row-span-1"
            title="Ramadhan Community Relief"
            description="Annual food packages and healthcare support delivered to vulnerable households."
            imageSrc="https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?q=80&w=1200"
          />
        </BentoGrid>
      </section>

      {/* Impact Statistics */}
      <section className="relative z-10 py-20 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-white/10">
        <SectionHeader title="Driven by Measurable Results" subtitle="Community Stats" align="center" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImpactCounter end={18} suffix="+" label="Completed Projects" />
          <ImpactCounter end={750} suffix="+" label="Lives Impacted" />
          <ImpactCounter end={85} suffix="+" label="Student Volunteers" />
          <ImpactCounter end={1500} suffix="+" label="Trees Planted" />
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-[1200px] mx-auto text-center">
        <div className="p-12 rounded-3xl glass-panel border border-cyan/30 bg-gradient-to-r from-bg-deep via-bg-teal/20 to-bg-deep">
          <span className="text-cyan font-mono uppercase text-xs tracking-widest block mb-3">
            [ GET INVOLVED TODAY ]
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Make a Real Impact?
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-8">
            Whether you want to volunteer, sponsor an initiative, or partner with us in Dar es Salaam, we welcome you to join the Legions movement.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-cyan text-bg-deep font-mono text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-cyan/20"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/10 text-center text-text-muted text-xs font-mono">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>&copy; {new Date().getFullYear()} LEGIONS. Youth-Led Community Service.</div>
          <div className="flex gap-6">
            <Link href="/projects" className="hover:text-cyan transition-colors">Projects</Link>
            <Link href="/about" className="hover:text-cyan transition-colors">About</Link>
            <Link href="/contact" className="hover:text-cyan transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
