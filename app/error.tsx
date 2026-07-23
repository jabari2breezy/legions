'use client'

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Site error boundary caught:", error);
  }, [error]);

  return (
    <div
      style={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "#15144d",
        color: "#F0F4F8",
        fontFamily: "'Outfit', -apple-system, sans-serif",
      }}
    >
      <p>Something didn&apos;t load correctly.</p>
      <button className="btn-secondary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
