"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { ProjectSummary } from "../../types/project";

export function ProjectCardQuiet({ project, index }: { project: ProjectSummary; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="project-card-quiet">
        <div className="project-card-quiet-image image-shimmer">
          <Image
            src={`/projects/${project.heroImage.filename}`}
            alt={project.heroImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="project-card-quiet-meta">
          <span className="project-card-quiet-index">{String(index + 1).padStart(2, "0")}</span>
          <h3>{project.title}</h3>
          <span className="project-card-quiet-category">{project.category}</span>
        </div>
      </Link>
    </motion.div>
  );
}
