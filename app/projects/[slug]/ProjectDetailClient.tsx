"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/types/project";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const group = project.groups[selectedGroup];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 border-t border-line">
      {/* Group tabs */}
      <div className="flex gap-4 mb-10">
        {project.groups.map((g, i) => (
          <button
            key={g.groupId}
            onClick={() => setSelectedGroup(i)}
            className={`text-xs uppercase tracking-[0.15em] px-4 py-2 rounded-full border transition-colors ${
              i === selectedGroup
                ? "border-accent text-accent"
                : "border-line text-muted hover:border-muted"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Group description */}
      <AnimatePresence mode="wait">
        <motion.div
          key={group.groupId}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
        >
          {group.description && (
            <p className="text-muted mb-8">{group.description}</p>
          )}

          {/* Image grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.images.map((img) => (
              <div
                key={img.id}
                className={`relative overflow-hidden rounded-xl ${
                  img.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={`/projects/${img.filename}`}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
