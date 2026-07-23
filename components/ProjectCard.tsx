"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

type Props = {
  slug: string;
  title: string;
  category: string;
  image: string;
  index: string;
  description?: string;
};

export default function ProjectCard({ slug, title, category, image, index, description }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/projects/${slug}`} className="block">
        <div
          onMouseMove={handleMove}
          className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.25), transparent 70%)`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />

          <div className="absolute bottom-0 p-6">
            <span className="text-xs tracking-[0.2em] text-muted">{index} — {category}</span>
            <h3 className="font-serif text-2xl mt-2">{title}</h3>
            {description && (
              <p className="text-sm text-muted mt-2 line-clamp-2">{description}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
