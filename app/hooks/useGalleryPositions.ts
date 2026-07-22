'use client'

import { useEffect, useState } from "react";
import { useSmoothScroll } from "../components/Providers/SmoothScroll";

export function useGalleryPositions(selector: string) {
  const { lenis } = useSmoothScroll();
  const [positions, setPositions] = useState<
    { id: string; x: number; y: number; width: number; height: number }[]
  >([]);

  useEffect(() => {
    function update() {
      const els = document.querySelectorAll<HTMLElement>(selector);
      const next = Array.from(els).map((el) => {
        const rect = el.getBoundingClientRect();
        return {
          id: el.dataset.id || "",
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        };
      });
      setPositions(next);
    }
    update();
    lenis?.on("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      lenis?.off("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [lenis, selector]);

  return positions;
}
