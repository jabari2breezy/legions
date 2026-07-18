"use client";

import { useEffect, useRef } from "react";

function Particle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
  return (
    <div
      className="absolute rounded-full animate-float"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: "var(--color-strong-cyan)",
        opacity: 0.12,
        animationDelay: `${delay}s`,
        animationDuration: `${8 + delay * 2}s`,
        filter: `blur(${size > 4 ? 1 : 0}px)`,
      }}
    />
  );
}

function Orb({ color, x, y, size, duration }: { color: string; x: string; y: string; size: string; duration: string }) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.07,
        animation: `orbMove ${duration} ease-in-out infinite`,
        filter: "blur(40px)",
      }}
    />
  );
}

const particles = Array.from({ length: 35 }, (_, i) => ({
  id: i,
  delay: Math.random() * 6,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
}));

export function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      containerRef.current.style.setProperty("--mx", `${x * 12}px`);
      containerRef.current.style.setProperty("--my", `${y * 12}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(17,199,202,0.04) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(62,93,224,0.03) 0%, transparent 50%)",
        "--mx": "0px",
        "--my": "0px",
        transform: "translate(var(--mx), var(--my))",
        transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      } as React.CSSProperties}
    >
      <Orb color="#11C7CA" x="15%" y="25%" size="450px" duration="22s" />
      <Orb color="#3E5DE0" x="65%" y="55%" size="380px" duration="28s" />
      <Orb color="#41EFE7" x="40%" y="80%" size="320px" duration="34s" />

      {[350, 500, 650].map((size, i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            left: `${20 + i * 25}%`,
            top: `${30 + i * 15}%`,
            width: size,
            height: size,
            borderColor: "rgba(17,199,202,0.03)",
            animation: `spin ${22 + i * 8}s linear infinite`,
          }}
        />
      ))}

      {particles.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(17,199,202,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
