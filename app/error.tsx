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
        background: "var(--color-bg-deep)",
        color: "var(--color-text-primary)",
      }}
    >
      <p>Something didn&apos;t load correctly.</p>
      <button className="btn-secondary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
