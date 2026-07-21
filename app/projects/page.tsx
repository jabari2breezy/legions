import Navbar from '../components/Navbar'
import FilmGrain from '../components/FilmGrain'
import RollingGallery from '../components/RollingGallery'
import { projectsList } from '../data/projects'
import Image from 'next/image'

export default function ProjectsPage() {
  return (
    <main className="relative bg-[#010101] min-h-screen text-white pt-32 pb-24 overflow-hidden">
      <FilmGrain />
      <Navbar />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <span className="text-cyan font-mono text-xs uppercase tracking-[0.3em] block mb-3">
          [ ARCHIVE // ALL PROJECTS ]
        </span>
        <h1 className="font-garamond text-5xl sm:text-7xl font-normal text-white mb-6">
          Our Initiatives Gallery
        </h1>
        <p className="text-white/70 max-w-2xl text-base sm:text-lg font-sans font-light leading-relaxed">
          Each project represents a sustained effort by youth leaders in Tanzania to restore local ecosystems, empower vulnerable youth, and organize grassroots relief.
        </p>
      </section>

      {/* Right-to-Left Rolling Marquee Background Ticker */}
      <section className="relative my-12 z-0 opacity-90">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">
            // LIVE BACKGROUND TICKER
          </span>
        </div>
        <RollingGallery />
      </section>

      {/* Detailed Project Cards Grid with Covers */}
      <section className="max-w-7xl mx-auto px-6 py-16 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectsList.map((project, index) => (
            <div 
              key={project.id}
              className="glass-card overflow-hidden group border border-white/10 hover:border-cyan/40 transition-all duration-500 flex flex-col"
            >
              {/* Project Cover Image */}
              <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-cyan font-mono text-xs uppercase tracking-widest bg-[#010101]/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  INITIATIVE 0{index + 1}
                </span>
              </div>

              {/* Text content */}
              <div className="p-8 bg-gradient-to-b from-[#0a0a0f] to-[#010101] flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-white/50 font-mono text-xs uppercase tracking-widest block mb-2">
                    {project.subtitle}
                  </span>
                  <h3 className="font-garamond text-3xl text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm font-sans leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded bg-white/5 text-white/80"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
