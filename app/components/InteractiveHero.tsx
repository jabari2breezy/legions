"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;

      gsap.to(imageRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7 }
      )
        .fromTo(
          ".hero-title-main",
          { y: 70, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 1.05 },
          "-=0.4"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.7"
        )
        .fromTo(
          ".hero-button",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(63,224,197,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_20%),linear-gradient(180deg,#080816_0%,#11113a_55%,#15144d_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      <div className="container relative z-20 mx-auto flex min-h-[100svh] items-center px-[var(--spacing-section-x)] pt-28 pb-16">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="hero-badge glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 mb-8">
              <span className="h-2 w-2 rounded-full bg-[var(--color-cyan)]" />
              <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-cyan)]">
                Est. 2022 • Dar es Salaam
              </span>
            </div>

            <h1
              className="hero-title-main max-w-xl text-balance font-semibold tracking-[-0.06em] text-white leading-[0.88]"
              style={{ fontSize: "clamp(4rem, 10vw, 8.5rem)" }}
            >
              Youth-led action, rendered with care.
            </h1>

            <p className="hero-subtitle mt-8 max-w-xl text-[var(--font-size-body-large)] leading-[var(--line-height-body)] text-[var(--color-text-secondary)]">
              Legions brings together students, volunteers, and partners to build cleaner coastlines, stronger communities, and places that feel worth showing up for.
            </p>

            <div className="hero-button mt-10 flex flex-col items-start gap-4 sm:flex-row">
              <Button href="/projects" variant="primary">
                Explore Our Work
              </Button>
              <Button href="/volunteer" variant="secondary">
                Join the Movement
              </Button>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Projects
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">5</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Volunteers
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">150+</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                  Raised
                </div>
                <div className="mt-2 text-2xl font-semibold text-white">TSH 12M+</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
              <div className="absolute inset-x-3 top-3 z-10 flex items-center justify-between rounded-full bg-black/20 px-4 py-2 backdrop-blur-md">
                <span className="text-[0.7rem] uppercase tracking-[0.28em] text-white/60">
                  Legions archive
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.28em] text-[var(--color-cyan)]">
                  Scroll to explore
                </span>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] lg:aspect-[5/6]">
                <Image
                  ref={imageRef}
                  src="/hero-attached.jpg"
                  alt="Legions community action collage"
                  fill
                  priority
                  className="object-cover opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080816] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="max-w-md rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-md">
                    <p className="text-sm leading-relaxed text-white/80">
                      A calmer, more editorial way to experience the work — built for clarity, trust, and momentum.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
