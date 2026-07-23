"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ColumnsSlider from "@/components/ColumnsSlider";
import ScrollReveal from "@/components/ScrollReveal";
import Link from "next/link";
import { projects, galleryImages } from "../../data/site";

function ProjectChapter({
  project,
  index,
  isActive,
}: {
  project: (typeof projects)[0];
  index: number;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="min-h-screen flex items-center py-20">
      <div className={`mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center ${isEven ? "" : "direction-rtl"}`}>
        <motion.div
          style={{ y: imgY }}
          className={`md:col-span-7 relative aspect-[4/5] rounded-2xl overflow-hidden ${isEven ? "md:order-1" : "md:order-2"}`}
        >
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        </motion.div>

        <div className={`md:col-span-5 ${isEven ? "md:order-2" : "md:order-1"}`}>
          <motion.div
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-accent mb-4">
              0{index + 1} — {project.category}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">{project.title}</h2>
            <p className="text-muted leading-relaxed mb-8">{project.description}</p>
            <div className="flex gap-8 mb-8">
              {project.stats.map((s, i) => (
                <div key={i}>
                  <p className="font-serif text-2xl">{s.value}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted mt-1">{s.label}</p>
                </div>
              ))}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs uppercase tracking-[0.2em] border border-line rounded-full px-6 py-2.5 hover:border-accent hover:text-accent transition-colors"
            >
              View Project
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProgressIndicator({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {projects.map((p, i) => (
        <div key={p.slug} className="flex items-center gap-3">
          <div
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? "bg-accent scale-125" : "bg-line"
            }`}
          />
          <span
            className={`text-xs tracking-[0.15em] transition-all duration-300 ${
              i === activeIndex ? "text-fg opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
            }`}
          >
            0{i + 1}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = chapterRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.4 }
    );

    chapterRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-20">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Our Work</p>
          <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-6">Projects That Matter</h1>
          <p className="text-muted text-lg max-w-2xl">
            Five initiatives where Legions has directed funding, sweat, and community power.
            Each one a chapter of impact.
          </p>
        </ScrollReveal>
      </section>

      <ProgressIndicator activeIndex={activeIndex} />

      {projects.map((p, i) => (
        <div
          key={p.slug}
          ref={(el) => { chapterRefs.current[i] = el; }}
        >
          <ProjectChapter project={p} index={i} isActive={i === activeIndex} />
        </div>
      ))}

      <section className="mx-auto max-w-7xl px-6 py-24 border-t border-line">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-4">Gallery</p>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-12">In the Field</h2>
        </ScrollReveal>
        <ColumnsSlider items={galleryImages} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-32 text-center border-t border-line">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight mb-6">Join the next chapter</h2>
          <p className="text-muted max-w-lg mx-auto mb-10">
            Every project starts with someone showing up. That someone could be you.
          </p>
          <Link
            href="/volunteer"
            className="px-8 py-3 rounded-full bg-fg text-bg text-sm tracking-wide hover:opacity-90 transition"
          >
            Get Involved
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}
