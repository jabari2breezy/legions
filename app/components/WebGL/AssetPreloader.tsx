'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

interface PreloadContextValue {
  isLoaded: boolean;
  progress: number;
}

const PreloadContext = createContext<PreloadContextValue>({ isLoaded: false, progress: 0 });

export function useAssetPreload() {
  return useContext(PreloadContext);
}

export function AssetPreloader({ urls, children }: { urls: string[]; children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!urls.length) {
      setIsLoaded(true);
      return;
    }

    const manager = new THREE.LoadingManager();
    manager.onProgress = (_url, loaded, total) => {
      setProgress(Math.round((loaded / total) * 100));
    };
    manager.onLoad = () => {
      setTimeout(() => setIsLoaded(true), 300);
    };
    manager.onError = (url) => {
      console.error(`Failed to preload asset: ${url}`);
    };

    const loader = new THREE.TextureLoader(manager);
    urls.forEach((url) => loader.load(url));

    const failsafe = setTimeout(() => setIsLoaded(true), 8000);
    return () => clearTimeout(failsafe);
  }, [urls]);

  return (
    <PreloadContext.Provider value={{ isLoaded, progress }}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 10000,
              background: "var(--color-bg-deep)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontVariantNumeric: "tabular-nums",
                fontSize: "clamp(2rem, 6vw, 4rem)",
                fontWeight: 600,
                color: "var(--color-text-primary)",
                letterSpacing: "-0.02em",
              }}
            >
              {progress}%
            </span>
            <div
              style={{
                width: 160,
                height: 1,
                background: "var(--color-border-subtle)",
                marginTop: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                style={{ position: "absolute", inset: 0, background: "var(--color-text-primary)" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PreloadContext.Provider>
  );
}
