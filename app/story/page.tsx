import Navbar from '../components/Navbar'
import FilmGrain from '../components/FilmGrain'
import Image from 'next/image'

export default function StoryPage() {
  return (
    <main className="relative bg-[#010101] min-h-screen text-white pt-32 pb-24 overflow-hidden">
      <FilmGrain />
      <Navbar />

      <section className="max-w-4xl mx-auto px-6">
        <span className="text-cyan font-mono text-xs uppercase tracking-[0.3em] block mb-3">
          [ OUR ORIGIN // STORY ]
        </span>
        <h1 className="font-garamond text-5xl sm:text-7xl font-normal text-white mb-8">
          Synthetic Nature & Community Action
        </h1>

        <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden glass-card mb-12 border border-white/10">
          <Image
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80"
            alt="Legions Youth Group"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#010101] via-transparent to-transparent" />
        </div>

        <div className="space-y-6 text-white/80 font-sans leading-relaxed text-base sm:text-lg font-light">
          <p>
            Legions was founded by high school students in Dar es Salaam who recognized that real environmental and community transformation starts at the grassroots level.
          </p>
          <p>
            By fusing modern creative design with hands-on volunteer action, we organize tree planting drives, orphanage facility renovations, coastal beach cleanups, and community relief during Ramadhan.
          </p>
          <blockquote className="border-l-2 border-cyan pl-6 my-8 py-2 font-garamond text-2xl text-white italic">
            &ldquo;Youth are not just the future of community service — we are its immediate engine.&rdquo;
          </blockquote>
        </div>
      </section>
    </main>
  )
}
