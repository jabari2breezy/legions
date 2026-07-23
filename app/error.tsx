"use client";
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
    <div className="h-dvh flex flex-col items-center justify-center gap-4 bg-bg text-fg font-sans">
      <p>Something didn&apos;t load correctly.</p>
      <button
        onClick={reset}
        className="px-6 py-3 rounded-full border border-line text-sm tracking-wide hover:border-accent hover:text-accent transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
