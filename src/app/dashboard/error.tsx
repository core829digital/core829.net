"use client";

import { useEffect } from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh bg-paper text-ink flex items-center justify-center">
      <div className="text-center space-y-4 max-w-md">
        <span className="font-mono text-red-400 text-xs uppercase tracking-[0.2em]">Error</span>
        <h1 className="text-display text-2xl tracking-tight">Something went wrong</h1>
        <p className="text-ink/60 text-sm">{error.message || "An unexpected error occurred."}</p>
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
