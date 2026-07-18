"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Footer } from "./footer";
import { Preloader } from "./preloader";
import { GlimpseSection } from "./glimpse";
import { CustomCursor } from "./cursor";
import { MagneticButton } from "./magnetic-button";
import { TextReveal, LineReveal, FadeUp } from "./text-reveal";
import { Marquee } from "./marquee";

const Background3D = dynamic(
  () => import("./background3d").then((m) => m.Background3D),
  { ssr: false }
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 1.8 }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 opacity-0 transition-all duration-700"
      style={{
        background: scrolled ? "rgba(10,14,26,0.7)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(17,199,202,0.06)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 h-[72px] flex items-center justify-between">
        <MagneticButton href="#" strength={0.2}>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-serif text-sm font-bold"
              style={{
                background: "linear-gradient(135deg, var(--color-strong-cyan), var(--color-dark-cyan))",
                color: "var(--color-yale-blue)",
              }}
            >
              L
            </div>
            <span className="font-serif text-base font-medium hidden sm:block" style={{ color: "var(--color-foreground)" }}>
              Legions Club
            </span>
          </div>
        </MagneticButton>

        <div className="hidden md:flex items-center gap-8">
          {["About", "Programs", "Work", "Impact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              data-cursor="View"
              className="font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-500 hover:tracking-[0.3em]"
              style={{ color: "rgba(213,237,245,0.5)" }}
            >
              {item}
            </a>
          ))}
        </div>

        <MagneticButton strength={0.15}>
          <a
            href="#join"
            data-cursor="Go"
            className="px-5 py-2 text-[10px] font-mono font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(17,199,202,0.25)]"
            style={{
              background: "var(--color-strong-cyan)",
              color: "var(--color-yale-blue)",
            }}
          >
            Join Now
          </a>
        </MagneticButton>
      </div>
    </nav>
  );
}

function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 1.5 });

      tl.fromTo("[data-hero-tag]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo("[data-hero-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "power4.inOut" }, "-=0.5")
        .fromTo("[data-hero-word]", { y: 120, opacity: 0, rotateX: -35 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.3, stagger: 0.12, ease: "power4.out" }, "-=1.0")
        .fromTo("[data-hero-sub]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, "-=0.6")
        .fromTo("[data-hero-cta]", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
        .fromTo("[data-hero-scroll]", { opacity: 0 }, { opacity: 0.4, duration: 1 }, "-=0.2");

      gsap.to("[data-hero-parallax]", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
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

      <div data-hero-parallax className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-32 w-full">
        <div className="max-w-[900px]">
          <div
            data-hero-tag
            className="font-mono text-[10px] tracking-[0.35em] uppercase mb-10 opacity-0 inline-flex items-center gap-4"
            style={{ color: "var(--color-strong-cyan)" }}
          >
            <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
            Est. 2024 — Youth Development
          </div>

          <div className="overflow-hidden mb-3" data-hero-line>
            <div className="h-px w-32 origin-left" style={{ background: "var(--color-strong-cyan)" }} />
          </div>

          <h1
            className="font-serif text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.88] font-light tracking-tight mb-10"
            style={{ color: "var(--color-foreground)", perspective: "800px" }}
          >
            <span className="block overflow-hidden">
              <span data-hero-word className="inline-block" style={{ transformOrigin: "bottom" }}>Building</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-word className="inline-block gradient-text font-semibold italic" style={{ transformOrigin: "bottom" }}>Tomorrow&apos;s</span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-word className="inline-block" style={{ transformOrigin: "bottom" }}>Leaders</span>
            </span>
          </h1>

          <p
            data-hero-sub
            className="text-base sm:text-lg max-w-md leading-relaxed mb-14 opacity-0"
            style={{ color: "var(--color-steel-blue)" }}
          >
            Legions Club empowers the next generation through mentorship,
            community engagement, and the relentless pursuit of excellence.
          </p>

          <div data-hero-cta className="flex flex-wrap items-center gap-5 opacity-0">
            <MagneticButton strength={0.2}>
              <a
                href="#join"
                data-cursor="Join"
                className="inline-flex items-center gap-3 px-8 py-4 text-xs font-mono font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(17,199,202,0.3)]"
                style={{ background: "var(--color-strong-cyan)", color: "var(--color-yale-blue)" }}
              >
                Join the Movement
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a
                href="#glimpse"
                data-cursor="View"
                className="inline-flex items-center gap-3 px-8 py-4 text-xs font-mono font-medium tracking-[0.15em] uppercase rounded-full border transition-all duration-500 hover:bg-[rgba(17,199,202,0.06)]"
                style={{ borderColor: "rgba(17,199,202,0.2)", color: "var(--color-strong-cyan)" }}
              >
                See Our Work
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      <div data-hero-scroll className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0">
        <span className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color: "var(--color-strong-cyan)" }}>
          Scroll
        </span>
        <div className="w-px h-14 animate-pulse-glow" style={{ background: "var(--color-strong-cyan)" }} />
      </div>
    </section>
  );
}

function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-stagger]");
    els.forEach((el, i) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 sm:py-40" style={{ background: "var(--color-yale-blue)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-4" data-stagger>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-strong-cyan)" }}>
                About Us
              </span>
            </div>
            <TextReveal
              as="h2"
              className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] font-light"
              style={{ color: "var(--color-foreground)" }}
            >
              Our Mission
            </TextReveal>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <FadeUp delay={0.1}>
              <p className="text-lg sm:text-xl leading-relaxed" style={{ color: "var(--color-azure-mist)" }}>
                Legions Club exists to cultivate extraordinary young individuals
                who will shape the future. We believe every young person carries
                the potential for greatness — our role is to ignite that spark.
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-base leading-relaxed opacity-70" style={{ color: "var(--color-azure-mist)" }}>
                Through carefully designed programs, world-class mentorship, and a
                community that champions ambition, we create environments where
                young leaders don&apos;t just learn — they transform.
              </p>
            </FadeUp>

            <LineReveal className="my-8" delay={0.3} />

            <div className="grid sm:grid-cols-3 gap-8">
              {[
                { num: "500+", label: "Youth Impacted" },
                { num: "50+", label: "Mentors" },
                { num: "12", label: "Programs" },
              ].map((stat, i) => (
                <FadeUp key={stat.label} delay={0.3 + i * 0.08}>
                  <div>
                    <div className="font-serif text-4xl sm:text-5xl font-light mb-2" style={{ color: "var(--color-strong-cyan)" }}>
                      {stat.num}
                    </div>
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--color-steel-blue)" }}>
                      {stat.label}
                    </div>
                  </div>
                </FadeUp>
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
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
        }
      );
    });
  }, []);

  const programs = [
    { tag: "01", title: "Leadership Academy", desc: "Intensive leadership development through real-world challenges, public speaking, and strategic thinking workshops.", accent: "var(--color-strong-cyan)" },
    { tag: "02", title: "Mentorship Circle", desc: "One-on-one pairing with industry professionals who guide, inspire, and open doors for the next generation.", accent: "var(--color-turquoise)" },
    { tag: "03", title: "Community Impact", desc: "Hands-on projects that create measurable change in local communities while building character and purpose.", accent: "var(--color-neon-ice)" },
    { tag: "04", title: "Creative Lab", desc: "A space for young innovators to explore technology, art, and design thinking through collaborative projects.", accent: "var(--color-slate-indigo)" },
  ];

  return (
    <section ref={sectionRef} id="programs" className="relative py-28 sm:py-40" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-strong-cyan)" }}>
              Programs
            </span>
          </div>
          <TextReveal
            as="h2"
            className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] font-light max-w-2xl"
            style={{ color: "var(--color-foreground)" }}
          >
            Where Ambition Meets Opportunity
          </TextReveal>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {programs.map((p) => (
            <div
              key={p.tag}
              data-card
              data-cursor="Explore"
              className="group glass-card rounded-2xl p-8 sm:p-10 transition-all duration-700 hover:translate-y-[-4px] hover:shadow-[0_20px_60px_rgba(17,199,202,0.06)]"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: p.accent }}>
                  {p.tag}
                </span>
                <div className="w-8 h-8 rounded-full flex items-center justify-center border opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-1"
                  style={{ borderColor: p.accent, color: p.accent }}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium mb-4" style={{ color: "var(--color-foreground)" }}>
                {p.title}
              </h3>
              <p className="leading-relaxed opacity-60 text-sm" style={{ color: "var(--color-azure-mist)" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section
      id="impact"
      className="relative py-28 sm:py-40 overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--background) 0%, var(--color-yale-blue) 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-strong-cyan)" }}>
            Our Impact
          </span>
          <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
        </div>

        <TextReveal
          as="h2"
          className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.9] font-light mb-20"
          style={{ color: "var(--color-foreground)" }}
        >
          Numbers That Speak
        </TextReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {[
            { value: "98%", label: "Completion Rate", accent: "var(--color-strong-cyan)" },
            { value: "4.9", label: "Mentor Rating", accent: "var(--color-turquoise)" },
            { value: "85%", label: "College Acceptance", accent: "var(--color-neon-ice)" },
            { value: "3x", label: "Leadership Growth", accent: "var(--color-slate-indigo)" },
          ].map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1} y={60}>
              <div className="text-center p-6 sm:p-8 rounded-2xl transition-all duration-700 hover:bg-[rgba(17,199,202,0.03)]">
                <div
                  className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light mb-4 glow"
                  style={{ color: stat.accent }}
                >
                  {stat.value}
                </div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--color-steel-blue)" }}>
                  {stat.label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section id="join" className="relative py-28 sm:py-44 overflow-hidden" style={{ background: "var(--background)" }}>
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px]"
          style={{ background: "var(--color-strong-cyan)" }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--color-strong-cyan)" }}>
            Get Involved
          </span>
          <div className="w-8 h-px" style={{ background: "var(--color-strong-cyan)" }} />
        </div>

        <TextReveal
          as="h2"
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] font-light mb-10"
          style={{ color: "var(--color-foreground)" }}
        >
          Ready to Lead?
        </TextReveal>

        <FadeUp delay={0.2}>
          <p className="text-base sm:text-lg max-w-lg mx-auto mb-14 leading-relaxed" style={{ color: "var(--color-steel-blue)" }}>
            Whether you&apos;re a young leader seeking growth or a mentor ready
            to make a difference, there&apos;s a place for you in the Legions.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-5">
            <MagneticButton strength={0.2}>
              <a
                href="#"
                data-cursor="Apply"
                className="inline-flex items-center gap-3 px-10 py-5 text-xs font-mono font-medium tracking-[0.15em] uppercase rounded-full transition-all duration-500 hover:shadow-[0_0_50px_rgba(17,199,202,0.3)]"
                style={{ background: "var(--color-strong-cyan)", color: "var(--color-yale-blue)" }}
              >
                Apply Now
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <a
                href="#"
                data-cursor="Mentor"
                className="inline-flex items-center gap-3 px-10 py-5 text-xs font-mono font-medium tracking-[0.15em] uppercase rounded-full border transition-all duration-500 hover:bg-[rgba(17,199,202,0.06)]"
                style={{ borderColor: "rgba(17,199,202,0.2)", color: "var(--color-strong-cyan)" }}
              >
                Become a Mentor
              </a>
            </MagneticButton>
          </div>
        </FadeUp>
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
      <CustomCursor />
      <Background3D />
      <Navbar />
      <main className="flex flex-col min-h-screen" style={{ background: "var(--background)" }}>
        <HeroSection />
        <Marquee
          items={["Leadership", "Mentorship", "Community", "Excellence", "Innovation", "Growth", "Purpose", "Impact"]}
          className="py-8 sm:py-12 border-y"
        />
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
