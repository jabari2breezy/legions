"use client";

import { ReactNode, createContext, useContext, useState, useCallback } from "react";
import { Preloader } from "../components/primitives/Preloader";
import { SmoothScroll } from "../components/primitives/SmoothScroll";
import { CustomCursor } from "../components/primitives/CustomCursor";

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
        <main style={{ visibility: done ? "visible" : "hidden" }}>{children}</main>
      </SmoothScroll>
    </PreloaderContext.Provider>
  );
}
