import Navbar from '../components/Navbar'
import FilmGrain from '../components/FilmGrain'
import SectionHeader from '../components/SectionHeader'
import ImpactCounter from '../components/ImpactCounter'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <main className="relative bg-bg-deep min-h-screen text-text-primary overflow-hidden pt-28 pb-24">
      <FilmGrain />
      <Navbar />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionHeader title="About Legions" subtitle="Youth Action in Dar es Salaam" align="left" />

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-panel p-8 space-y-4">
            <span className="text-cyan font-mono text-xs uppercase tracking-widest">[ OUR MISSION ]</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Action Over Words.
            </h2>
            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
              Legions was founded by passionate high school and university students in Dar es Salaam who recognized that real community change requires active, hands-on participation. We bridge the gap between student ambition and grassroots community needs.
            </p>
          </div>

          <div className="glass-panel p-8 space-y-4">
            <span className="text-cyan font-mono text-xs uppercase tracking-widest">[ OUR VISION ]</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Empowering Next-Gen Leaders.
            </h2>
            <p className="text-text-secondary leading-relaxed text-sm md:text-base">
              We envision a future where youth lead sustainable environmental, educational, and social initiatives across East Africa, building compassionate networks that uplift underserved communities.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <SectionHeader title="Our Core Values" subtitle="Principles" align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass-panel p-6 text-center space-y-3">
              <div className="text-cyan font-mono text-2xl font-bold">01</div>
              <h3 className="text-xl font-bold text-white">Direct Engagement</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                We work directly with community members and shelter staff on the ground to ensure maximum utility and respect.
              </p>
            </div>

            <div className="glass-panel p-6 text-center space-y-3">
              <div className="text-cyan font-mono text-2xl font-bold">02</div>
              <h3 className="text-xl font-bold text-white">Sustainability</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Every project—from tree planting to facility renovation—is designed for long-term survival and community ownership.
              </p>
            </div>

            <div className="glass-panel p-6 text-center space-y-3">
              <div className="text-cyan font-mono text-2xl font-bold">03</div>
              <h3 className="text-xl font-bold text-white">Inclusive Growth</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                We welcome students from all schools, backgrounds, and disciplines to share skills and collaborate freely.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <ImpactCounter end={85} suffix="+" label="Active Volunteers" />
          <ImpactCounter end={18} suffix="+" label="Projects Launched" />
          <ImpactCounter end={750} suffix="+" label="Lives Impacted" />
          <ImpactCounter end={4} suffix=" yrs" label="Operating" />
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan text-bg-deep font-mono text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-cyan/20"
          >
            <span>Get Involved with Legions</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
