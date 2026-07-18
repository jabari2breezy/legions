"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "./magnetic-button";
import { TextReveal, FadeUp } from "./text-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  { num: "01", title: "Leadership Summit 2024", category: "Leadership", description: "50 young leaders gathered for a weekend of transformation.", accent: "var(--color-strong-cyan)" },
  { num: "02", title: "Community Garden Build", category: "Community Impact", description: "Built 3 urban gardens serving 200+ families in need.", accent: "var(--color-turquoise)" },
  { num: "03", title: "Tech Innovation Lab", category: "Creative", description: "Students built and shipped their first apps in 8 weeks.", accent: "var(--color-slate-indigo)" },
  { num: "04", title: "Mentor Matching Gala", category: "Mentorship", description: "Paired 120 youth with industry professionals.", accent: "var(--color-neon-ice)" },
];

export function GlimpseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const cards = scrollRef.current.querySelectorAll("[data-glimpse-card]");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: { trigger: card, start: "top 92%", toggleActions: "play none none none" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="glimpse" className="relative py-28 sm:py-40 overflow-hidden" style={{ background: "var(--color-yale-blue)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-strong-cyan)" }}>
              A Glimpse
            </span>
          </div>
          <TextReveal
            as="h2"
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] font-light max-w-2xl"
            style={{ color: "var(--color-foreground)" }}
          >
            Our Work in Action
          </TextReveal>
        </div>

        <div ref={scrollRef} className="grid sm:grid-cols-2 gap-5">
          {projects.map((p) => (
            <div
              key={p.num}
              data-glimpse-card
              data-cursor="View"
              className="group glass-card rounded-2xl overflow-hidden transition-all duration-700 hover:translate-y-[-6px] hover:shadow-[0_24px_80px_rgba(17,199,202,0.08)]"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${p.accent}15, ${p.accent}05)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-[6rem] sm:text-[8rem] font-bold opacity-[0.06]" style={{ color: p.accent }}>
                    {p.num}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(39,75,112,0.4)] to-transparent" />
              </div>

              <div className="p-8 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: p.accent }}>
                    {p.category}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] opacity-40" style={{ color: "var(--color-azure-mist)" }}>
                    {p.num}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-3 transition-colors duration-500" style={{ color: "var(--color-foreground)" }}>
                  {p.title}
                </h3>
                <p className="leading-relaxed mb-8 opacity-60 text-sm" style={{ color: "var(--color-azure-mist)" }}>
                  {p.description}
                </p>
                <div className="flex items-center gap-3 text-xs font-mono font-medium tracking-[0.1em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0" style={{ color: p.accent }}>
                  View Project
                  <div className="w-6 h-6 rounded-full flex items-center justify-center border" style={{ borderColor: p.accent }}>
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <FadeUp delay={0.3} className="mt-16 text-center">
          <MagneticButton strength={0.2}>
            <a
              href="#"
              data-cursor="All"
              className="inline-flex items-center gap-3 px-8 py-4 text-xs font-mono font-medium tracking-[0.15em] uppercase rounded-full border transition-all duration-500 hover:bg-[rgba(17,199,202,0.06)]"
              style={{ borderColor: "rgba(17,199,202,0.2)", color: "var(--color-strong-cyan)" }}
            >
              View All Projects
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </MagneticButton>
        </FadeUp>
      </div>
    </section>
  );
}
