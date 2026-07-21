'use client'

import { useState } from 'react'
import Navbar from '../components/Navbar'
import FilmGrain from '../components/FilmGrain'
import SectionHeader from '../components/SectionHeader'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Student Volunteer', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <main className="relative bg-bg-deep min-h-screen text-text-primary overflow-hidden pt-28 pb-24">
      <FilmGrain />
      <Navbar />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        <SectionHeader title="Contact & Join Legions" subtitle="Get In Touch" align="left" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8">
          
          {/* Form */}
          <div className="glass-panel p-8">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan/20 text-cyan flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                <p className="text-text-secondary text-sm">
                  Thank you for reaching out to Legions. A team member in Dar es Salaam will connect with you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-white/10 text-cyan font-mono text-xs uppercase hover:bg-white/20 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-cyan mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-cyan mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-cyan mb-2">I Want To</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-bg-deep border border-white/10 text-white focus:outline-none focus:border-cyan transition-colors text-sm"
                  >
                    <option value="Student Volunteer">Join as a Student Volunteer</option>
                    <option value="Sponsor a Project">Sponsor a Project / Donate Supplies</option>
                    <option value="Partner School">Register a Partner School</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-cyan mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how you'd like to get involved..."
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-cyan transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-cyan text-bg-deep font-mono text-sm font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg shadow-cyan/20"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-8 flex flex-col justify-between">
            <div className="glass-panel p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white tracking-tight">Direct Information</h3>
              
              <div className="space-y-4 text-sm text-text-secondary">
                <div>
                  <span className="block text-cyan font-mono text-xs uppercase mb-1">Headquarters</span>
                  <p className="text-white">Dar es Salaam, Tanzania</p>
                </div>

                <div>
                  <span className="block text-cyan font-mono text-xs uppercase mb-1">Email Us</span>
                  <a href="mailto:contact@legions.org" className="text-white hover:text-cyan transition-colors">
                    contact@legions.org
                  </a>
                </div>

                <div>
                  <span className="block text-cyan font-mono text-xs uppercase mb-1">Social & Updates</span>
                  <p className="text-white">@legions_tz (Instagram / TikTok)</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 border border-cyan/30">
              <span className="text-cyan font-mono text-xs uppercase block mb-2">[ VOLUNTEER MEETUPS ]</span>
              <h4 className="text-lg font-bold text-white mb-2">Bi-Weekly Community Gatherings</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                We meet every second Saturday in Dar es Salaam to plan upcoming visits to Ujasiri House, AMSEN, and coastal cleanup locations. All students welcome!
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
