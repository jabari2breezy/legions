"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { cursorEnter, cursorLeave } from "@/app/utils/cursor";
import projectsIndex from "@/data/projects-index.json";

type ViewMode = "wheel" | "grid" | "list";
type FilterCategory = "ALL" | string;

const CATEGORIES = [
  "ALL",
  "COMMUNITY & SPECIAL NEEDS",
  "ENVIRONMENT",
  "FOOD RELIEF",
];

export function ProjectWheel() {
  const [viewMode, setViewMode] = useState<ViewMode>("wheel");
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const filteredProjects = activeFilter === "ALL"
    ? projectsIndex
    : projectsIndex.filter(
        (p) => p.category.toUpperCase().includes(activeFilter) ||
               (activeFilter === "COMMUNITY & SPECIAL NEEDS" && p.category.includes("Community")) ||
               (activeFilter === "ENVIRONMENT" && p.category.includes("Environment")) ||
               (activeFilter === "FOOD RELIEF" && p.category.includes("Food Relief"))
      );

  useEffect(() => {
    setIsMobile("ontouchstart" in window || window.innerWidth < 768);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  return (
    <section className="wheel-section" id="projects">
      <div className="wheel-controls">
        <div className="wheel-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`wheel-filter-pill ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="wheel-view-toggle">
          <button
            className={`wheel-view-btn ${viewMode === "wheel" ? "active" : ""}`}
            onClick={() => setViewMode("wheel")}
            aria-label="Wheel view"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <ellipse cx="8" cy="8" rx="7" ry="5" />
            </svg>
          </button>
          <button
            className={`wheel-view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            className={`wheel-view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
              <line x1="1" y1="3" x2="15" y2="3" />
              <line x1="1" y1="8" x2="15" y2="8" />
              <line x1="1" y1="13" x2="15" y2="13" />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === "wheel" && (
        <WheelView
          projects={filteredProjects}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isMobile={isMobile}
        />
      )}
      {viewMode === "grid" && (
        <GridView projects={filteredProjects} />
      )}
      {viewMode === "list" && (
        <ListView projects={filteredProjects} />
      )}

      {viewMode === "wheel" && filteredProjects.length > 0 && (
        <WheelMetadata
          project={filteredProjects[activeIndex] || filteredProjects[0]}
          index={activeIndex}
          total={filteredProjects.length}
        />
      )}
    </section>
  );
}

/* ─────────────────────────────────────
   3D WHEEL VIEW
   ───────────────────────────────────── */

function WheelView({
  projects,
  activeIndex,
  setActiveIndex,
  isMobile,
}: {
  projects: typeof projectsIndex;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  isMobile: boolean;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const velocityRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const rafRef = useRef<number>(0);

  const N = projects.length;
  const angleStep = (2 * Math.PI) / N;
  const radius = isMobile ? 280 : 500;

  const snapToNearest = useCallback(() => {
    const targetAngle = Math.round(rotation / angleStep) * angleStep;
    setRotation(targetAngle);
    const idx = (((-Math.round(rotation / angleStep)) % N) + N) % N;
    setActiveIndex(idx);
  }, [rotation, angleStep, N, setActiveIndex]);

  useEffect(() => {
    const animate = () => {
      if (!isDragging.current) {
        velocityRef.current *= 0.94;
        if (Math.abs(velocityRef.current) < 0.0005) {
          snapToNearest();
          return;
        }
        setRotation((prev) => prev + velocityRef.current);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [snapToNearest]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    velocityRef.current += e.deltaY * 0.001;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    velocityRef.current = dx * 0.003;
    setRotation((prev) => prev + dx * 0.003);
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={viewportRef}
      className="wheel-viewport"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ cursor: "grab", touchAction: "none" }}
    >
      <div className="wheel-3d-scene">
        {projects.map((project, i) => {
          const angle = angleStep * i + rotation;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const normalizedZ = (z + radius) / (2 * radius);
          const scale = 0.6 + normalizedZ * 0.6;
          const opacity = 0.2 + normalizedZ * 0.8;
          const blur = (1 - normalizedZ) * 4;
          const isActive = Math.abs(((i - activeIndex) % N + N) % N) === 0 ||
                           Math.abs(((i - activeIndex) % N + N) % N) === N;

          return (
            <div
              key={project.slug}
              className={`wheel-card ${isActive ? "active" : ""}`}
              style={{
                transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex: Math.round(normalizedZ * 100),
              }}
              onMouseEnter={() => !isMobile && cursorEnter("INSPECT", "wheel")}
              onMouseLeave={() => !isMobile && cursorLeave()}
              onClick={() => {
                setActiveIndex(i);
                velocityRef.current = 0;
                setRotation(-angleStep * i);
              }}
            >
              <img
                src={`/projects/${project.heroImage.filename}`}
                alt={project.heroImage.alt}
                loading="lazy"
              />
              <div className="wheel-card-overlay">
                <span className="wheel-card-category">{project.category}</span>
                <span className="wheel-card-title">{project.title}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   GRID VIEW
   ───────────────────────────────────── */

function GridView({ projects }: { projects: typeof projectsIndex }) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile("ontouchstart" in window || window.innerWidth < 768);
  }, []);

  return (
    <div className="wheel-grid-view">
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="wheel-grid-card"
          onMouseEnter={() => !isMobile && cursorEnter("INSPECT", "project")}
          onMouseLeave={() => !isMobile && cursorLeave()}
        >
          <img
            src={`/projects/${project.heroImage.filename}`}
            alt={project.heroImage.alt}
            loading="lazy"
          />
          <div className="wheel-grid-card-overlay">
            <span className="wheel-card-category">{project.category}</span>
            <span className="wheel-card-title">{project.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   LIST VIEW
   ───────────────────────────────────── */

function ListView({ projects }: { projects: typeof projectsIndex }) {
  return (
    <div className="wheel-list-view">
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="wheel-list-row"
        >
          <span className="wheel-list-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="wheel-list-title">{project.title}</span>
          <span className="wheel-list-cat">{project.category}</span>
          <span className="wheel-list-loc">DAR ES SALAAM</span>
          <span className="wheel-list-year">2022&ndash;PRESENT</span>
          <span className="wheel-list-arrow">&rarr;</span>
        </Link>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────
   ACTIVE CARD METADATA
   ───────────────────────────────────── */

function WheelMetadata({
  project,
  index,
  total,
}: {
  project: typeof projectsIndex[0];
  index: number;
  total: number;
}) {
  return (
    <div className="wheel-metadata">
      <p className="wheel-meta-id">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h3 className="wheel-meta-title">
        {project.title} &mdash; {project.category}
      </h3>
      <p className="wheel-meta-location">DAR ES SALAAM &middot; 2022&ndash;PRESENT</p>
      <Link
        href={`/projects/${project.slug}`}
        className="wheel-meta-cta"
        onMouseEnter={() => cursorEnter("VIEW", "project")}
        onMouseLeave={() => cursorLeave()}
      >
        Click to Inspect Case Study &rarr;
      </Link>
    </div>
  );
}
