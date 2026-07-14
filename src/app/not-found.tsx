import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-paper text-ink px-6 text-center">
      <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">404</span>
      <h1 className="text-display text-6xl md:text-8xl tracking-tight mt-4">
        Lost in
        <br />
        <span className="text-signal">space.</span>
      </h1>
      <p className="mt-6 text-ink/60 text-lg max-w-md leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist, was moved, or never existed.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-10 flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-4 bg-signal text-ink text-sm font-medium tracking-widest uppercase rounded-full hover:bg-signal-dim transition-colors"
        >
          Back home
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 border border-mist text-ink text-sm font-medium tracking-widest uppercase rounded-full hover:bg-white/5 transition-colors"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
