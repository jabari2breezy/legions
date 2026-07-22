'use client'

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorType = "default" | "gallery" | "cta" | "text";

interface CursorState {
  type: CursorType;
  label?: string;
}

const SPRING_CONFIG = { damping: 28, stiffness: 320, mass: 0.6 };

export function FluidCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springX = useSpring(mouseX, SPRING_CONFIG);
  const springY = useSpring(mouseY, SPRING_CONFIG);

  const [state, setState] = useState<CursorState>({ type: "default" });
  const [isPointerFine, setIsPointerFine] = useState(true);
  const magneticTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    function handleMove(e: MouseEvent) {
      const target = magneticTarget.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const pull = 0.35;
        mouseX.set(e.clientX + (cx - e.clientX) * pull);
        mouseY.set(e.clientY + (cy - e.clientY) * pull);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    }

    function handleOver(e: MouseEvent) {
      const el = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor-type]"
      );
      if (el) {
        setState({
          type: (el.dataset.cursorType as CursorType) || "default",
          label: el.dataset.cursorLabel,
        });
        if (el.hasAttribute("data-magnetic")) magneticTarget.current = el;
      } else {
        setState({ type: "default" });
        magneticTarget.current = null;
      }
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [isPointerFine, mouseX, mouseY]);

  if (!isPointerFine) return null;

  const sizeMap: Record<CursorType, number> = {
    default: 12,
    gallery: 84,
    cta: 64,
    text: 4,
  };
  const size = sizeMap[state.type];

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: state.type === "gallery" ? "difference" : "normal",
      }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor:
            state.type === "gallery" || state.type === "cta"
              ? "rgba(255,255,255,0.95)"
              : "rgba(255,255,255,0.7)",
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {state.type === "gallery" && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: "#000",
              textTransform: "uppercase",
            }}
          >
            {state.label || "View"}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}
