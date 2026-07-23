import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/project";
import ProjectDetailClient from "./ProjectDetailClient";

export const metadata = { title: "Project — Legions" };

export function generateStaticParams() {
  const dataDir = path.join(process.cwd(), "data/projects");
  const files = fs.readdirSync(dataDir).filter((f) => f.endsWith(".json"));
  return files.map((f) => ({ slug: f.replace(".json", "") }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "data/projects", `${slug}.json`);

  if (!fs.existsSync(filePath)) notFound();

  const project: Project = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden rounded-b-3xl mx-4">
        <Image
          src={`/projects/${project.heroImage.filename}`}
          alt={project.heroImage.alt}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <div className="absolute bottom-0 p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-3">
            {project.category}
          </p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight max-w-3xl">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Meta + Stats */}
      <section className="mx-auto max-w-5xl px-6 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <p className="text-xs uppercase tracking-[0.15em] text-muted">{project.timeframe.displayLabel}</p>
          <span className="inline-block mt-2 text-xs uppercase tracking-[0.15em] px-3 py-1 rounded-full border border-line text-muted">
            {project.timeframe.status}
          </span>
        </div>
        <div className="flex gap-10">
          {project.stats.map((s, i) => (
            <div key={i}>
              <p className="font-serif text-2xl">{s.value}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-6 py-16 border-t border-line">
        {project.storyParagraphs.map((p, i) => (
          <p key={i} className="text-muted leading-relaxed text-lg mb-6 last:mb-0">
            {p}
          </p>
        ))}
      </section>

      {/* Gallery */}
      <ProjectDetailClient project={project} />

      {/* Testimonial */}
      {project.testimonial && (
        <section className="mx-auto max-w-3xl px-6 py-20 border-t border-line">
          <p className="font-serif text-2xl md:text-3xl leading-relaxed">
            &ldquo;{project.testimonial.quote}&rdquo;
          </p>
          <div className="mt-6">
            <p className="text-sm font-medium">{project.testimonial.name}</p>
            <p className="text-xs text-muted tracking-wide">{project.testimonial.role}</p>
          </div>
        </section>
      )}

      {/* Related */}
      {project.relatedSlugs.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16 border-t border-line">
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-6">Related Projects</p>
          <div className="flex gap-4">
            {project.relatedSlugs.map((s) => (
              <Link
                key={s}
                href={`/projects/${s}`}
                className="px-6 py-3 rounded-full border border-line text-sm hover:border-accent hover:text-accent transition-colors"
              >
                {s.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Back */}
      <section className="mx-auto max-w-5xl px-6 py-12 text-center">
        <Link
          href="/projects"
          className="text-xs uppercase tracking-[0.2em] text-muted hover:text-fg transition-colors"
        >
          &larr; Back to Projects
        </Link>
      </section>
    </div>
  );
}
