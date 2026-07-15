"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "./footer";
import { Preloader } from "./preloader";
import { GlimpseSection } from "./glimpse";

const Background3D = dynamic(
  () => import("./background3d").then((m) => m.Background3D),
  { ssr: false }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,14,26,0.75)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(17,199,202,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-serif text-sm font-bold"
            style={{
              background: "linear-gradient(135deg, var(--color-strong-cyan), var(--color-dark-cyan))",
              color: "var(--color-yale-blue)",
            }}
          >
            L
          </div>
          <span
            className="font-serif text-lg font-medium hidden sm:block"
            style={{ color: "var(--color-foreground)" }}
          >
            Legions Club
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {["About", "Programs", "Work", "Impact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:opacity-100 opacity-50"
              style={{ color: "var(--color-azure-mist)" }}
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#join"
          className="px-6 py-2.5 text-[11px] font-mono font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(17,199,202,0.2)]"
          style={{
            background: "var(--color-strong-cyan)",
            color: "var(--color-yale-blue)",
          }}
        >
          Join Now
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        "[data-hero-tag]",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
        .fromTo(
          "[data-hero-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.4, ease: "power4.inOut" },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-heading]",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2 },
          "-=1.0"
        )
        .fromTo(
          "[data-hero-sub]",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          "[data-hero-cta]",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-scroll]",
          { opacity: 0 },
          { opacity: 0.4, duration: 1 },
          "-=0.2"
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
      <div className="hero-gradient absolute inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-32 w-full">
        <div className="max-w-3xl">
          <div
            data-hero-tag
            className="font-mono text-xs tracking-[0.3em] uppercase mb-8 opacity-0"
            style={{ color: "var(--color-strong-cyan)" }}
          >
            Est. 2024 — Youth Development
          </div>

          <div className="overflow-hidden mb-2" data-hero-line>
            <div
              className="h-px w-24 origin-left"
              style={{ background: "var(--color-strong-cyan)" }}
            />
          </div>

          <h1
            data-hero-heading
            className="font-serif text-[clamp(3rem,8vw,7.5rem)] leading-[0.9] font-light tracking-tight mb-8 opacity-0"
            style={{ color: "var(--color-foreground)" }}
          >
            Building
            <br />
            <span className="gradient-text font-semibold italic">Tomorrow&apos;s</span>
            <br />
            Leaders
          </h1>

          <p
            data-hero-sub
            className="text-lg sm:text-xl max-w-lg leading-relaxed mb-12 opacity-0"
            style={{ color: "var(--color-steel-blue)" }}
          >
            Legions Club empowers the next generation through mentorship,
            community engagement, and the relentless pursuit of excellence.
          </p>

          <div data-hero-cta className="flex flex-wrap gap-4 opacity-0">
            <a
              href="#join"
              className="inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(17,199,202,0.3)]"
              style={{
                background: "var(--color-strong-cyan)",
                color: "var(--color-yale-blue)",
              }}
            >
              Join the Movement
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#glimpse"
              className="glass-card inline-flex items-center gap-3 px-8 py-4 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:bg-[rgba(17,199,202,0.08)]"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              See Our Work
            </a>
          </div>
        </div>
      </div>

      <div data-hero-scroll className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "var(--color-strong-cyan)" }}
        >
          Scroll
        </span>
        <div className="w-px h-12 animate-pulse-glow" style={{ background: "var(--color-strong-cyan)" }} />
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
              <span
                className="italic font-semibold"
                style={{ color: "var(--color-strong-cyan)" }}
              >
                Mission
              </span>
            </h2>
          </div>

          <div className="lg:col-span-3 space-y-8" data-reveal>
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: "var(--color-azure-mist)" }}
            >
              Legions Club exists to cultivate extraordinary young individuals
              who will shape the future. We believe every young person carries
              the potential for greatness — our role is to ignite that spark.
            </p>
            <p
              className="text-base leading-relaxed opacity-80"
              style={{ color: "var(--color-azure-mist)" }}
            >
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
            Meets{" "}
            <span
              className="italic font-semibold"
              style={{ color: "var(--color-strong-cyan)" }}
            >
              Opportunity
            </span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div
              key={p.tag}
              data-card
              className="group glass-card rounded-2xl p-8 sm:p-10 transition-all duration-500 hover:translate-y-[-4px]"
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
              <p
                className="leading-relaxed opacity-70"
                style={{ color: "var(--color-azure-mist)" }}
              >
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
      id="impact"
      className="relative py-32 sm:py-40 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--background) 0%, var(--color-yale-blue) 100%)",
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
            <span
              className="italic font-semibold"
              style={{ color: "var(--color-strong-cyan)" }}
            >
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
            className="glass-card inline-flex items-center gap-3 px-10 py-5 text-sm font-medium tracking-wide uppercase rounded-full transition-all duration-300 hover:bg-[rgba(17,199,202,0.08)]"
            style={{ color: "var(--color-strong-cyan)" }}
          >
            Become a Mentor
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <Preloader onComplete={handlePreloaderComplete} />}
      <Background3D />
      <Navbar />
      <main
        className="flex flex-col min-h-screen"
        style={{ background: "var(--background)" }}
      >
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <GlimpseSection />
        <ImpactSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
}
