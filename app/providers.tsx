"use client";

import { ReactNode, createContext, useContext, useState, useCallback } from "react";
import { Preloader } from "@/app/components/primitives/Preloader";
import { SmoothScroll } from "@/app/components/primitives/SmoothScroll";
import { CustomCursor } from "@/app/components/primitives/CustomCursor";
import { CursorGlow } from "@/app/components/primitives/CursorGlow";
import { GridOverlay } from "@/app/components/primitives/GridOverlay";

const PreloaderContext = createContext<{
  complete: () => void;
  done: boolean;
}>({ complete: () => {}, done: false });

export const usePreloader = () => useContext(PreloaderContext);

export function Providers({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const complete = useCallback(() => setDone(true), []);

  return (
    <PreloaderContext.Provider value={{ complete, done }}>
      <SmoothScroll>
        {!done && <Preloader onComplete={complete} />}
        <CustomCursor />
        <CursorGlow />
        <main style={{ visibility: done ? "visible" : "hidden" }}>
          <GridOverlay />
          {children}
        </main>
      </SmoothScroll>
    </PreloaderContext.Provider>
  );
}
