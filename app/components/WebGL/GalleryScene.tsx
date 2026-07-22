'use client'

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { LiquidImageShader } from "./LiquidImageShader";
import { useSmoothScroll } from "../Providers/SmoothScroll";

interface GalleryImage {
  id: string;
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface GallerySceneProps {
  images: GalleryImage[];
}

function useDomToWorld() {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function update() {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
}

export function GalleryScene({ images }: GallerySceneProps) {
  const { velocity } = useSmoothScroll();
  const viewport = useDomToWorld();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
      }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 1, position: [0, 0, 500], near: 0.1, far: 10000 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ pointerEvents: "auto" }}
      >
        {images.map((img) => (
          <group
            key={img.id}
            position={[
              img.x - viewport.width / 2 + img.width / 2,
              -(img.y - viewport.height / 2 + img.height / 2),
              0,
            ]}
          >
            <LiquidImageShader
              imageUrl={img.url}
              width={img.width}
              height={img.height}
              scrollVelocity={velocity}
            />
          </group>
        ))}
      </Canvas>
    </div>
  );
}
