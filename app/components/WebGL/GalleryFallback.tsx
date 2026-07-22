'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function detectLowPowerDevice(): boolean {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const cores = navigator.hardwareConcurrency || 4;
  return isMobile && cores <= 4;
}

export function useShouldUseWebGLGallery() {
  const [shouldUseWebGL, setShouldUseWebGL] = useState(true);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const supported = detectWebGLSupport();
    const lowPower = detectLowPowerDevice();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setShouldUseWebGL(supported && !lowPower && !reducedMotion);
    setChecked(true);
  }, []);

  return { shouldUseWebGL, checked };
}

export function GalleryFallback({ images }: { images: { id: string; url: string; alt: string }[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 12,
      }}
    >
      {images.map((img, i) => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
          style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: "0.5rem" }}
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            style={{ objectFit: "cover", transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            className="fallback-gallery-image"
          />
        </motion.div>
      ))}
    </div>
  );
}
