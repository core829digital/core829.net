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
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-paper text-ink min-h-dvh flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md px-6">
          <span className="font-mono text-red-400 text-xs uppercase tracking-[0.2em]">500</span>
          <h1 className="text-display text-3xl tracking-tight">Server error</h1>
          <p className="text-ink/60 text-sm">We&apos;ve been notified and are looking into it.</p>
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
