import Navbar from '../components/Navbar'
import FilmGrain from '../components/FilmGrain'

export default function ConnectPage() {
  return (
    <main className="relative bg-[#010101] min-h-screen text-white pt-32 pb-24 overflow-hidden">
      <FilmGrain />
      <Navbar />

      <section className="max-w-3xl mx-auto px-6">
        <span className="text-cyan font-mono text-xs uppercase tracking-[0.3em] block mb-3">
          [ GET INVOLVED // CONNECT ]
        </span>
        <h1 className="font-garamond text-5xl sm:text-7xl font-normal text-white mb-6">
          Join the Collective
        </h1>
        <p className="text-white/70 text-base sm:text-lg mb-10 font-sans font-light leading-relaxed">
          Whether you want to volunteer for our next beach cleanup, contribute to the Ujasiri House renovation, or partner with us, we&apos;d love to connect.
        </p>

        <form className="space-y-6 glass-card p-8 sm:p-10 border border-white/10 rounded-2xl">
          <div>
            <label className="block text-white/80 font-mono text-xs uppercase tracking-widest mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              placeholder="Your Name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan text-sm"
              required 
            />
          </div>

          <div>
            <label className="block text-white/80 font-mono text-xs uppercase tracking-widest mb-2">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan text-sm"
              required 
            />
          </div>

          <div>
            <label className="block text-white/80 font-mono text-xs uppercase tracking-widest mb-2">
              Message / Initiative Preference
            </label>
            <textarea 
              rows={4}
              placeholder="Tell us how you'd like to get involved..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full liquid-glass rounded-xl py-4 text-white uppercase tracking-[0.2em] font-sans text-xs font-medium"
          >
            Submit Application
          </button>
        </form>
      </section>
    </main>
  )
}
