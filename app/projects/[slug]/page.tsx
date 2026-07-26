"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Nav } from "@/app/components/layout/Nav";
import { SiteFooter } from "@/app/components/layout/SiteFooter";
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
        <div style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{ textAlign: "center" }}>
            <h1 style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 4rem)",
              marginBottom: 16,
            }}>Project Not Found</h1>
            <Link href="/projects" style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "14px 32px",
              borderRadius: 100,
              background: "var(--mint)",
              color: "var(--indigo-deep)",
            }}>Back to Projects</Link>
          </div>
        </div>
        <SiteFooter />
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
  return (
    <div style={{
      position: "relative",
      height: "80vh",
      minHeight: 500,
      display: "flex",
      alignItems: "flex-end",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img
          src={`/projects/${project.heroImage.filename}`}
          alt={project.heroImage.alt}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(36,26,110,0.9) 0%, rgba(36,26,110,0.3) 60%, transparent 100%)",
      }} />
      <div style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(2rem, 5vw, 4rem)",
        width: "100%",
        maxWidth: 900,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--ink-dim)",
            marginBottom: 16,
          }}>
            <Link href="/projects" style={{ color: "var(--mint)", transition: "color 0.3s" }}>Projects</Link>
            <span>/</span>
            <span>{project.title}</span>
          </div>
          <span style={{
            display: "inline-block",
            padding: "5px 14px",
            border: "1px solid var(--mint)",
            color: "var(--mint)",
            fontSize: "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>{project.category}</span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}>{project.title}</h1>
          <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--ink-dim)", maxWidth: 550, marginBottom: 12 }}>
            {project.shortDescription}
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: "0.75rem", color: "var(--ink-dim)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--mint)" }} />
            {project.timeframe.displayLabel}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectStory({ project }: { project: Project }) {
  return (
    <div style={{
      padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
      borderTop: "1px solid var(--grid-border)",
      borderBottom: "1px solid var(--grid-border)",
    }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: "clamp(40px, 6vw, 96px)",
        alignItems: "start",
      }}>
        <div>
          <p style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--mint)",
            marginBottom: 12,
          }}>Story</p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}>The story</h2>
        </div>
        <div>
          {project.storyParagraphs.map((p, i) => (
            <motion.p
              key={i}
              style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-dim)", maxWidth: "55ch", marginBottom: 16 }}
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

      <div style={{
        display: "flex",
        gap: 40,
        marginTop: "clamp(48px, 6vw, 96px)",
        borderTop: "1px solid var(--grid-border)",
        paddingTop: 32,
        flexWrap: "wrap",
      }}>
        {project.stats.map((s, i) => (
          <div key={i}>
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em",
              color: "var(--mint)",
              lineHeight: 1,
            }}>{s.value}</p>
            <p style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--ink-dim)",
              marginTop: 4,
            }}>{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectGallery({ project }: { project: Project }) {
  const allImages = project.groups.flatMap((g) => g.images);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  if (allImages.length === 0) return null;

  return (
    <>
      <div style={{
        padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
        borderTop: "1px solid var(--grid-border)",
        borderBottom: "1px solid var(--grid-border)",
      }}>
        <div style={{ marginBottom: "clamp(32px, 4vw, 64px)" }}>
          <p style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--mint)",
            marginBottom: 12,
          }}>Gallery</p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}>In the field</h2>
        </div>
        <div style={{ columns: "3 260px", columnGap: 10 }}>
          {allImages.map((img) => (
            <div
              key={img.id}
              style={{
                breakInside: "avoid",
                marginBottom: 10,
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => setLightbox({ src: `/projects/${img.filename}`, alt: img.alt, caption: img.caption })}
              onMouseEnter={() => cursorEnter("View")}
              onMouseLeave={cursorLeave}
            >
              <img
                src={`/projects/${img.filename}`}
                alt={img.alt}
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block", transition: "transform 0.4s" }}
              />
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.94)",
            zIndex: 500,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setLightbox(null)}
        >
          <button
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "white",
              fontSize: "1.5rem",
              cursor: "pointer",
              padding: 12,
              zIndex: 501,
            }}
            aria-label="Close lightbox"
          >&#10005;</button>
          <div
            style={{ maxWidth: "90vw", maxHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }}
            />
            {lightbox.caption && (
              <p style={{ color: "white", fontSize: "0.85rem", marginTop: 12, textAlign: "center" }}>
                {lightbox.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ProjectTestimonial({ project }: { project: Project }) {
  if (!project.testimonial) return null;

  return (
    <div style={{
      padding: "clamp(60px, 8vw, 120px) clamp(20px, 5vw, 64px)",
      borderTop: "1px solid var(--grid-border)",
      borderBottom: "1px solid var(--grid-border)",
      maxWidth: 800,
    }}>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(3rem, 5vw, 5rem)",
        lineHeight: 1,
        color: "var(--mint-soft)",
        opacity: 0.3,
        marginBottom: -8,
      }}>&ldquo;</div>
      <p style={{
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: "clamp(1.2rem, 2vw, 1.8rem)",
        lineHeight: 1.3,
        marginBottom: 24,
        fontStyle: "italic",
      }}>{project.testimonial.quote}</p>
      <p style={{
        fontSize: "0.65rem",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}>{project.testimonial.name}</p>
      <p style={{
        fontSize: "0.75rem",
        color: "var(--ink-dim)",
        marginTop: 4,
      }}>{project.testimonial.role}</p>
    </div>
  );
}
