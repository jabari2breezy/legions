"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const reasons = [
  { title: "Real Impact", desc: "No busywork. Every hour you spend volunteering translates directly into planted trees, fed families, or built infrastructure." },
  { title: "Leadership Training", desc: "We don't just assign tasks; we build leaders. You will learn project management, logistics, and fundraising." },
  { title: "The Network", desc: "Join a brotherhood and sisterhood of the most driven, capable students in Dar es Salaam." },
  { title: "Service Hours", desc: "We provide official documentation and verification for IB, CAS, and university application service requirements." },
];

export default function Volunteer() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section ref={heroRef} className="mx-auto max-w-5xl px-6 py-24">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">Join Us</p>
        </ScrollReveal>
        <motion.div style={{ y: heroY }}>
          <ScrollReveal delay={0.1}>
            <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05] max-w-4xl">
              Show up. Do the work.
            </h1>
          </ScrollReveal>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="py-32 border-t border-line">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <p className="font-serif text-3xl md:text-5xl leading-[1.2] tracking-tight max-w-4xl">
              We don&apos;t need passive supporters. We need people willing to get their hands dirty
              to build a better community.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Legions */}
      <section className="mx-auto max-w-5xl px-6 py-24 border-t border-line">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">The Standard</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">Why Legions?</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {reasons.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.1}>
              <div className="border-t border-line pt-6">
                <h3 className="font-serif text-xl mb-3">{r.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{r.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="mx-auto max-w-3xl px-6 py-24 border-t border-line">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Apply</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">Apply to Volunteer</h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="vol-name" className="text-xs uppercase tracking-[0.15em] text-muted">Full Name</label>
                <input
                  id="vol-name"
                  type="text"
                  className="bg-transparent border border-line rounded-lg px-4 py-3 text-fg placeholder:text-line focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="vol-email" className="text-xs uppercase tracking-[0.15em] text-muted">Email</label>
                <input
                  id="vol-email"
                  type="email"
                  className="bg-transparent border border-line rounded-lg px-4 py-3 text-fg placeholder:text-line focus:outline-none focus:border-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="vol-school" className="text-xs uppercase tracking-[0.15em] text-muted">School / University</label>
                <input
                  id="vol-school"
                  type="text"
                  className="bg-transparent border border-line rounded-lg px-4 py-3 text-fg placeholder:text-line focus:outline-none focus:border-accent transition-colors"
                  placeholder="Your institution"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="vol-age" className="text-xs uppercase tracking-[0.15em] text-muted">Age</label>
                <input
                  id="vol-age"
                  type="number"
                  className="bg-transparent border border-line rounded-lg px-4 py-3 text-fg placeholder:text-line focus:outline-none focus:border-accent transition-colors"
                  placeholder="16"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="vol-why" className="text-xs uppercase tracking-[0.15em] text-muted">Why do you want to join Legions?</label>
              <textarea
                id="vol-why"
                rows={5}
                className="bg-transparent border border-line rounded-lg px-4 py-3 text-fg placeholder:text-line focus:outline-none focus:border-accent transition-colors resize-none"
                placeholder="Tell us about yourself and what drives you to serve..."
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="px-8 py-3 rounded-full bg-fg text-bg text-sm tracking-wide hover:opacity-90 transition"
              >
                Submit Application
              </button>
            </div>
          </form>
        </ScrollReveal>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-5xl px-6 py-24 border-t border-line text-center">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Get in Touch</p>
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-6">Questions? Reach out.</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm text-muted">
            <a href="mailto:legionsinitiative@gmail.com" className="hover:text-accent transition-colors">legionsinitiative@gmail.com</a>
            <span className="hidden sm:inline text-line">|</span>
            <a href="tel:+255768111035" className="hover:text-accent transition-colors">+255 768 111 035</a>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
