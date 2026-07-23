"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const tenets = [
  {
    n: "01",
    title: "Radical Transparency",
    desc: "Every donation is accounted for. We show exactly where the money goes and the physical impact it creates.",
  },
  {
    n: "02",
    title: "Action Over Words",
    desc: "We don't host galas to talk about problems; we get our hands dirty to fix them. Field work is our primary metric.",
  },
  {
    n: "03",
    title: "Youth Empowerment",
    desc: "Age is not a barrier to impact. We train the next generation of Tanzanian leaders through real-world service.",
  },
];

const timeline = [
  { year: "2022", title: "Legions Founded", desc: "A small group of high schoolers decides to formalize their community service efforts." },
  { year: "2023", title: "First Major Success", desc: "The MYK Tree Planting initiative hits 500+ trees, proving the model works at scale." },
  { year: "2024", title: "Expanding Scope", desc: "Moving into healthcare infrastructure with Ujasiri House and coastal cleanups across Dar." },
];

export default function About() {
  const missionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: missionRef, offset: ["start end", "end start"] });
  const missionY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">Our Story</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight leading-[1.05] max-w-4xl">
            Founded by students in 2022.
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-muted text-lg max-w-2xl mt-8 leading-relaxed">
            We didn&apos;t want to wait until we were older to make a difference. We started Legions because
            Dar es Salaam needed action, not just awareness.
          </p>
        </ScrollReveal>
      </section>

      {/* Mission — parallax editorial */}
      <section ref={missionRef} className="py-32 border-t border-line">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div style={{ y: missionY }}>
            <p className="font-serif text-3xl md:text-5xl leading-[1.2] tracking-tight max-w-4xl">
              From renovating cancer patient housing at Ujasiri House to coastal beach cleanups and tree planting,
              our mandate is simple: direct action, zero bureaucracy, total transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tenets — alternating numbered sequence */}
      <section className="mx-auto max-w-5xl px-6 py-24 border-t border-line">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">Core Tenets</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-20">What We Believe</h2>
        </ScrollReveal>

        <div className="flex flex-col gap-20">
          {tenets.map((t, i) => {
            const isEven = i % 2 === 0;
            return (
              <ScrollReveal key={t.n} delay={i * 0.1}>
                <div className={`flex flex-col md:flex-row items-start gap-8 ${isEven ? "" : "md:flex-row-reverse"}`}>
                  <div className="flex-shrink-0">
                    <span className="font-serif text-[120px] leading-none text-line/30 select-none">{t.n}</span>
                  </div>
                  <div className="max-w-xl pt-4">
                    <h3 className="font-serif text-2xl mb-4">{t.title}</h3>
                    <p className="text-muted leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-5xl px-6 py-24 border-t border-line">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">History</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">The Journey So Far</h2>
        </ScrollReveal>

        <div className="flex flex-col gap-12 border-l-2 border-line pl-8 max-w-2xl">
          {timeline.map((item, i) => (
            <ScrollReveal key={item.year} delay={i * 0.12}>
              <span className="text-xs uppercase tracking-[0.2em] text-accent">{item.year}</span>
              <h3 className="font-serif text-xl mt-2 mb-2">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-32 text-center border-t border-line">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">Want to be part of the story?</h2>
          <p className="text-muted max-w-lg mx-auto mb-10">
            The next chapter of Legions is being written right now. You can be in it.
          </p>
          <a
            href="/volunteer"
            className="px-8 py-3 rounded-full bg-fg text-bg text-sm tracking-wide hover:opacity-90 transition"
          >
            Join Legions
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}
