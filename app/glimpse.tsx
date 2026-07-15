"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    num: "01",
    title: "Leadership Summit 2024",
    category: "Leadership",
    description: "50 young leaders gathered for a weekend of transformation.",
    color: "var(--color-strong-cyan)",
    bg: "linear-gradient(135deg, rgba(17,199,202,0.12), rgba(6,136,150,0.08))",
  },
  {
    num: "02",
    title: "Community Garden Build",
    category: "Community Impact",
    description: "Built 3 urban gardens serving 200+ families in need.",
    color: "var(--color-turquoise)",
    bg: "linear-gradient(135deg, rgba(72,221,213,0.12), rgba(27,170,204,0.08))",
  },
  {
    num: "03",
    title: "Tech Innovation Lab",
    category: "Creative",
    description: "Students built and shipped their first apps in 8 weeks.",
    color: "var(--color-slate-indigo)",
    bg: "linear-gradient(135deg, rgba(62,93,224,0.12), rgba(63,55,162,0.08))",
  },
  {
    num: "04",
    title: "Mentor Matching Gala",
    category: "Mentorship",
    description: "Paired 120 youth with industry professionals.",
    color: "var(--color-neon-ice)",
    bg: "linear-gradient(135deg, rgba(65,239,231,0.12), rgba(17,199,202,0.08))",
  },
];

export function GlimpseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll("[data-glimpse-card]");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 80,
          opacity: 0,
          scale: 0.95,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const header = sectionRef.current.querySelector("[data-glimpse-header]");
    if (header) {
      gsap.fromTo(
        header,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="glimpse"
      className="relative py-32 sm:py-40 overflow-hidden"
      style={{ background: "var(--color-yale-blue)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div data-glimpse-header className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="h-px flex-1 max-w-16"
              style={{ background: "var(--color-strong-cyan)", opacity: 0.4 }}
            />
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              A Glimpse
            </span>
          </div>
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light max-w-2xl"
            style={{ color: "var(--color-foreground)" }}
          >
            Our Work in
            <br />
            <span className="italic font-semibold" style={{ color: "var(--color-strong-cyan)" }}>
              Action
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.num}
              data-glimpse-card
              className="group relative glass-card rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:translate-y-[-4px]"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: p.bg }}
              />

              <div className="relative p-8 sm:p-10">
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="font-mono text-xs tracking-[0.3em] uppercase"
                    style={{ color: p.color }}
                  >
                    {p.category}
                  </span>
                  <span
                    className="font-mono text-xs tracking-[0.2em] opacity-40"
                    style={{ color: "var(--color-azure-mist)" }}
                  >
                    {p.num}
                  </span>
                </div>

                <h3
                  className="font-serif text-2xl sm:text-3xl font-medium mb-3 transition-colors duration-300"
                  style={{ color: "var(--color-foreground)" }}
                >
                  {p.title}
                </h3>

                <p
                  className="leading-relaxed mb-8 opacity-70"
                  style={{ color: "var(--color-azure-mist)" }}
                >
                  {p.description}
                </p>

                <div
                  className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                  style={{ color: p.color }}
                >
                  View Project
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
