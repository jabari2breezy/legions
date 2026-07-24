"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
import { Section } from "@/app/components/primitives/Section";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";
import projectsIndex from "@/data/projects-index.json";
import type { Project } from "@/types/project";

function useProject(slug: string) {
  const [project, setProject] = useState<Project | null>(null);
  useEffect(() => {
    import(`@/data/projects/${slug}.json`)
      .then((m) => setProject(m.default || m))
      .catch(() => setProject(null));
  }, [slug]);
  return project;
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  useEffect(() => { params.then((p) => setSlug(p.slug)); }, [params]);
  const project = useProject(slug);

  if (!project) {
    return (
      <>
        <Nav />
        <div className="section-dark" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <h1 className="t-h1" style={{ marginBottom: 16 }}>Project Not Found</h1>
            <Link href="/projects" className="btn btn-primary">Back to Projects</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Nav />
      <ProjectHero project={project} />
      <ProjectStory project={project} />
      <ProjectGallery project={project} />
      <ProjectTestimonial project={project} />
      <SiteFooter />
    </>
  );
}

function ProjectHero({ project }: { project: Project }) {
  const idx = projectsIndex.findIndex((p) => p.slug === project.slug);

  return (
    <div className="pd-hero">
      <div className="pd-hero-bg">
        <img src={`/projects/${project.heroImage.filename}`} alt={project.heroImage.alt} />
      </div>
      <div className="pd-hero-overlay" />
      <div className="pd-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="pd-breadcrumb">
            <Link href="/projects">Projects</Link>
            <span>/</span>
            <span style={{ color: "var(--color-white)" }}>{project.title}</span>
          </div>
          <span className="pd-category-tag">{project.category}</span>
          <h1 className="pd-title">{project.title}</h1>
          <p className="pd-desc">{project.shortDescription}</p>
          <div className="pd-timeframe">
            <span className="pd-dot" />
            {project.timeframe.displayLabel}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectStory({ project }: { project: Project }) {
  return (
    <Section dark>
      <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
        <div className="about-grid-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "clamp(40px, 6vw, 96px)", alignItems: "start" }}>
          <div>
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>Story</p>
            <h2 className="t-h2">The story</h2>
          </div>
          <div>
            {project.storyParagraphs.map((p, i) => (
              <motion.p
                key={i}
                className="t-body-lg"
                style={{ marginBottom: 16, color: "var(--text-secondary-dark)", maxWidth: "55ch" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="pd-stats-row" style={{ display: "flex", gap: 40, marginTop: "var(--space-block)", borderTop: "1px solid var(--border-dark)", paddingTop: 32, flexWrap: "wrap" }}>
          {project.stats.map((s, i) => (
            <div key={i}>
              <p className="stat-value">{s.value}</p>
              <p className="stat-label-text">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const allImages = project.groups.flatMap((g) => g.images);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  if (allImages.length === 0) return null;

  return (
    <>
      <Section>
        <div className="container" style={{ paddingBlock: "var(--space-section)" }}>
          <div style={{ marginBottom: 48 }}>
            <p className="t-label" style={{ color: "var(--color-cyan)", marginBottom: 12 }}>Gallery</p>
            <h2 className="t-h1">In the field</h2>
          </div>
          <div className="gallery-masonry">
            {allImages.map((img) => (
              <div
                key={img.id}
                className="gallery-item"
                onClick={() => setLightbox({ src: `/projects/${img.filename}`, alt: img.alt, caption: img.caption })}
                onMouseEnter={() => cursorEnter("View")}
                onMouseLeave={cursorLeave}
              >
                <img src={`/projects/${img.filename}`} alt={img.alt} loading="lazy" />
                {img.caption && <p className="gallery-caption">{img.caption}</p>}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox-backdrop" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" aria-label="Close lightbox">✕</button>
          <div className="lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img className="lightbox-img" src={lightbox.src} alt={lightbox.alt} />
            {lightbox.caption && <p className="lightbox-caption">{lightbox.caption}</p>}
          </div>
        </div>
      )}
    </>
  );
}

function ProjectTestimonial({ project }: { project: Project }) {
  if (!project.testimonial) return null;

  return (
    <Section dark>
      <div className="container" style={{ paddingBlock: "var(--space-section)", maxWidth: 800 }}>
        <div className="testimonial-quote-mark">"</div>
        <p className="t-h2" style={{ marginBottom: 24 }}>{project.testimonial.quote}</p>
        <p className="testimonial-author">{project.testimonial.name}</p>
        <p className="testimonial-role">{project.testimonial.role}</p>
      </div>
    </Section>
  );
}
