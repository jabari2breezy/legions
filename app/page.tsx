"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "./footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          headingRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=0.4"
        )
        .fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "var(--color-strong-cyan)" }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[100px]"
          style={{ background: "var(--color-slate-indigo)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div
              ref={tagRef}
              className="font-mono text-xs tracking-[0.3em] uppercase mb-8 opacity-0"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              Est. 2024 — Youth Development
            </div>

            <h1
              ref={headingRef}
              className="font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] font-light tracking-tight mb-8 opacity-0"
              style={{ color: "var(--color-foreground)" }}
            >
              Building
              <br />
              <span className="gradient-text font-semibold italic">Tomorrow&apos;s</span>
              <br />
              Leaders
            </h1>

            <p
              ref={subRef}
              className="text-lg sm:text-xl max-w-lg leading-relaxed mb-12 opacity-0"
              style={{ color: "var(--color-steel-blue)" }}
            >
              Legions Club empowers the next generation through mentorship,
              community engagement, and the relentless pursuit of excellence.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 opacity-0">
              <a
                href="#join"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(17,199,202,0.3)]"
                style={{
                  background: "var(--color-strong-cyan)",
                  color: "var(--color-yale-blue)",
                }}
              >
                Join the Movement
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide uppercase rounded-full border transition-all duration-300 hover:bg-[rgba(17,199,202,0.08)]"
                style={{
                  borderColor: "rgba(17,199,202,0.3)",
                  color: "var(--color-strong-cyan)",
                }}
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-md">
              <div
                className="absolute inset-0 rounded-3xl rotate-6 opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-strong-cyan), var(--color-slate-indigo))",
                }}
              />
              <div
                className="absolute inset-4 rounded-2xl -rotate-3 opacity-40"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-egyptian-blue), var(--color-violet-twilight))",
                }}
              />
              <div
                className="absolute inset-8 rounded-xl flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-dark-cyan), var(--color-ocean-blue))",
                }}
              >
                <span className="font-serif text-[8rem] font-bold opacity-30" style={{ color: "var(--color-azure-mist)" }}>
                  L
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-strong-cyan)" }}>
          Scroll
        </span>
        <div className="w-px h-12 animate-pulse" style={{ background: "var(--color-strong-cyan)" }} />
      </div>
    </section>
  );
}

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 sm:py-40"
      style={{ background: "var(--color-yale-blue)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2" data-reveal>
            <div
              className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              About Us
            </div>
            <h2
              className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light"
              style={{ color: "var(--color-foreground)" }}
            >
              Our
              <br />
              <span className="italic font-semibold" style={{ color: "var(--color-strong-cyan)" }}>
                Mission
              </span>
            </h2>
          </div>

          <div className="lg:col-span-3 space-y-8" data-reveal>
            <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--color-azure-mist)" }}>
              Legions Club exists to cultivate extraordinary young individuals
              who will shape the future. We believe every young person carries
              the potential for greatness — our role is to ignite that spark.
            </p>
            <p className="text-base leading-relaxed opacity-80" style={{ color: "var(--color-azure-mist)" }}>
              Through carefully designed programs, world-class mentorship, and a
              community that champions ambition, we create environments where
              young leaders don&apos;t just learn — they transform.
            </p>

            <div className="grid sm:grid-cols-3 gap-8 pt-8">
              {[
                { num: "500+", label: "Youth Impacted" },
                { num: "50+", label: "Mentors" },
                { num: "12", label: "Programs" },
              ].map((stat) => (
                <div key={stat.label} data-reveal>
                  <div
                    className="font-serif text-4xl sm:text-5xl font-light mb-2"
                    style={{ color: "var(--color-strong-cyan)" }}
                  >
                    {stat.num}
                  </div>
                  <div
                    className="font-mono text-xs tracking-[0.2em] uppercase"
                    style={{ color: "var(--color-steel-blue)" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll("[data-card]");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  const programs = [
    {
      tag: "01",
      title: "Leadership Academy",
      desc: "Intensive leadership development through real-world challenges, public speaking, and strategic thinking workshops.",
      accent: "var(--color-strong-cyan)",
    },
    {
      tag: "02",
      title: "Mentorship Circle",
      desc: "One-on-one pairing with industry professionals who guide, inspire, and open doors for the next generation.",
      accent: "var(--color-turquoise)",
    },
    {
      tag: "03",
      title: "Community Impact",
      desc: "Hands-on projects that create measurable change in local communities while building character and purpose.",
      accent: "var(--color-neon-ice)",
    },
    {
      tag: "04",
      title: "Creative Lab",
      desc: "A space for young innovators to explore technology, art, and design thinking through collaborative projects.",
      accent: "var(--color-slate-indigo)",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="programs"
      className="relative py-32 sm:py-40"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="mb-20">
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "var(--color-strong-cyan)" }}
          >
            Programs
          </div>
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light max-w-2xl"
            style={{ color: "var(--color-foreground)" }}
          >
            Where Ambition
            <br />
            Meets <span className="italic font-semibold" style={{ color: "var(--color-strong-cyan)" }}>Opportunity</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div
              key={p.tag}
              data-card
              className="group relative p-8 sm:p-10 rounded-2xl border transition-all duration-500 hover:translate-y-[-4px]"
              style={{
                borderColor: "rgba(17,199,202,0.12)",
                background: "rgba(17,199,202,0.03)",
              }}
            >
              <div
                className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: p.accent }}
              >
                {p.tag}
              </div>
              <h3
                className="font-serif text-2xl sm:text-3xl font-medium mb-4"
                style={{ color: "var(--color-foreground)" }}
              >
                {p.title}
              </h3>
              <p className="leading-relaxed opacity-70" style={{ color: "var(--color-azure-mist)" }}>
                {p.desc}
              </p>
              <div
                className="mt-8 flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ color: p.accent }}
              >
                Learn more
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
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 sm:py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--color-yale-blue) 0%, var(--background) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
        <div data-reveal>
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-6"
            style={{ color: "var(--color-strong-cyan)" }}
          >
            Our Impact
          </div>
          <h2
            className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.92] font-light mb-16"
            style={{ color: "var(--color-foreground)" }}
          >
            Numbers That
            <br />
            <span className="italic font-semibold gradient-text">Speak</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {[
            { value: "98%", label: "Completion Rate", accent: "var(--color-strong-cyan)" },
            { value: "4.9", label: "Mentor Rating", accent: "var(--color-turquoise)" },
            { value: "85%", label: "College Acceptance", accent: "var(--color-neon-ice)" },
            { value: "3x", label: "Leadership Growth", accent: "var(--color-slate-indigo)" },
          ].map((stat) => (
            <div key={stat.label} data-reveal className="text-center">
              <div
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light mb-4 glow"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </div>
              <div
                className="font-mono text-xs tracking-[0.2em] uppercase"
                style={{ color: "var(--color-steel-blue)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const els = sectionRef.current.querySelectorAll("[data-reveal]");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.04,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="join"
      className="relative py-32 sm:py-40"
      style={{ background: "var(--background)" }}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-20 text-center">
        <div data-reveal>
          <div
            className="font-mono text-xs tracking-[0.3em] uppercase mb-8"
            style={{ color: "var(--color-strong-cyan)" }}
          >
            Get Involved
          </div>
          <h2
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-light mb-8"
            style={{ color: "var(--color-foreground)" }}
          >
            Ready to
            <br />
            <span className="italic font-semibold" style={{ color: "var(--color-strong-cyan)" }}>
              Lead?
            </span>
          </h2>
          <p
            className="text-lg max-w-xl mx-auto mb-12 leading-relaxed"
            style={{ color: "var(--color-steel-blue)" }}
          >
            Whether you&apos;re a young leader seeking growth or a mentor ready
            to make a difference, there&apos;s a place for you in the Legions.
          </p>
        </div>

        <div data-reveal className="flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(17,199,202,0.3)]"
            style={{
              background: "var(--color-strong-cyan)",
              color: "var(--color-yale-blue)",
            }}
          >
            Apply Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-wide uppercase rounded-full border transition-all duration-300 hover:bg-[rgba(17,199,202,0.08)]"
            style={{
              borderColor: "rgba(17,199,202,0.3)",
              color: "var(--color-strong-cyan)",
            }}
          >
            Become a Mentor
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen" style={{ background: "var(--background)" }}>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ImpactSection />
      <CTASection />
      <Footer />
    </main>
  );
}
