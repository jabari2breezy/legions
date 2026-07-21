import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HorizontalProjects from './components/HorizontalProjects'
import RollingGallery from './components/RollingGallery'
import FilmGrain from './components/FilmGrain'
import ImpactCounter from './components/ImpactCounter'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative bg-[#010101] min-h-screen text-white overflow-hidden">
      <FilmGrain />
      <Navbar />

      {/* Mouse Responsive & Video Liquid Hero */}
      <Hero />

      {/* Horizontal Scrolling Projects Section */}
      <HorizontalProjects />

      {/* Rolling Gallery Marquee (Right to Left Ticker) */}
      <section className="relative py-16 bg-[#010101]">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
          <span className="text-cyan font-mono text-xs uppercase tracking-[0.3em]">
            [ LIVE PHOTO ROLLER // ALL PROJECTS ]
          </span>
          <h3 className="font-garamond text-3xl sm:text-4xl text-white font-normal mt-2">
            Moments in Action
          </h3>
        </div>
        <RollingGallery />
      </section>

      {/* Impact Statistics */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <ImpactCounter end={15} suffix="+" label="Projects Completed" />
          <ImpactCounter end={500} suffix="+" label="Lives Impacted" />
          <ImpactCounter end={50} suffix="+" label="Youth Volunteers" />
          <ImpactCounter end={1000} suffix="+" label="Trees Planted" />
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-24 px-6 text-center border-t border-white/10 relative overflow-hidden bg-gradient-to-b from-[#010101] to-[#0a0a0f]">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-garamond text-4xl sm:text-6xl text-white font-normal mb-6">
            Ready to shape the future?
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-8 font-sans font-light">
            Join our youth collective in Dar es Salaam and take direct action for environment, education, and community wellbeing.
          </p>
          <Link
            href="/connect"
            className="liquid-glass rounded-full px-10 py-4 text-white uppercase tracking-[0.2em] text-sm font-sans inline-block"
          >
            Become a Volunteer
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 text-center border-t border-white/5 text-white/40 text-xs font-mono">
        <p>&copy; {new Date().getFullYear()} LEGIONS. Synthetic Nature & Youth-Led Community Service.</p>
      </footer>
    </main>
  )
}
