"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import Link from "next/link";
import { projects } from "../data/site";

const featured = projects.slice(0, 3);

const playbook = [
  { n: "01", title: "Identify Needs", desc: "We consult with local leaders, schools, and hospitals to find areas where targeted action can create immediate relief or long-term growth." },
  { n: "02", title: "Mobilize Resources", desc: "Using our network, we crowdfund, secure in-kind donations, and organize volunteer squads faster than traditional NGOs." },
  { n: "03", title: "Execute", desc: "We show up. Whether it's planting trees, painting wards, or distributing rations, our volunteers do the physical work." },
  { n: "04", title: "Report Back", desc: "Complete transparency. Every shilling raised and every hour worked is documented and shared with our donors and community." },
];

export default function Home() {
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: storyRef, offset: ["start end", "end start"] });
  const storyY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <StatsCounter />
      </section>

      <section ref={storyRef} className="mx-auto max-w-5xl px-6 py-24">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-6">Our Story</p>
        </ScrollReveal>
        <motion.div style={{ y: storyY }}>
          <ScrollReveal delay={0.1}>
            <p className="font-serif text-3xl md:text-5xl leading-[1.15] tracking-tight">
              What started in 2022 as a small group of high school students has evolved into one of Dar es Salaam&apos;s most active youth-led service organizations.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-muted mt-8 text-lg leading-relaxed max-w-2xl">
              We saw a gap between wanting to help and actually doing the work — so we bridged it.
              From renovating cancer patient housing to coastal cleanups and tree planting, our mandate is simple:
              direct action, zero bureaucracy, total transparency.
            </p>
          </ScrollReveal>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Selected Initiatives</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">Our Work</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((p, i) => (
            <ProjectCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              category={p.category}
              image={p.image}
              index={`0${i + 1}`}
              description={p.description}
            />
          ))}
        </div>
        <ScrollReveal delay={0.3}>
          <div className="mt-16 text-center">
            <Link
              href="/projects"
              className="text-xs uppercase tracking-[0.2em] border border-line rounded-full px-8 py-3 hover:border-accent hover:text-accent transition-colors"
            >
              View All Projects
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-line">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">The Playbook</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-16">How We Operate</h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {playbook.map((step, i) => (
            <ScrollReveal key={step.n} delay={i * 0.1}>
              <div className="flex gap-6">
                <span className="font-serif text-6xl text-line select-none">{step.n}</span>
                <div>
                  <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-line">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Community Voices</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">The Impact We Leave</h2>
        </ScrollReveal>
        <TestimonialMarquee />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-32 text-center border-t border-line">
        <ScrollReveal>
          <h2 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">Ready to serve?</h2>
          <p className="text-muted max-w-lg mx-auto mb-10">
            Whether you want to volunteer on the frontlines or partner with us to fund the next major initiative, there is a place for you here.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/volunteer" className="px-8 py-3 rounded-full bg-fg text-bg text-sm tracking-wide hover:opacity-90 transition">
              Become a Volunteer
            </Link>
            <Link href="/volunteer" className="px-8 py-3 rounded-full border border-line text-sm tracking-wide hover:border-accent hover:text-accent transition">
              Partner With Us
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
