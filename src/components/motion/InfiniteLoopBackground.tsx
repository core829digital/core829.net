"use client";

import { useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isLowEndDevice } from "@/lib/deviceCapability";

interface InfiniteLoopBackgroundProps {
  variant?: "dots" | "grid" | "wave" | "pulse" | "orbits";
  density?: "low" | "medium" | "high";
}

export function InfiniteLoopBackground({ variant = "dots", density = "medium" }: InfiniteLoopBackgroundProps) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.display = entry.isIntersecting ? "" : "none";
      },
      { rootMargin: "1000px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced]);

  if (prefersReduced || isLowEndDevice()) return null;

  const count = density === "low" ? 3 : density === "high" ? 8 : 5;

  if (variant === "orbits") {
    return (
      <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="w-full h-full opacity-[0.03]">
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute inset-0"
              style={{
                top: "50%", left: "50%",
                width: `${30 * ring}%`, height: `${20 * ring}%`,
                margin: `${-10 * ring}% 0 0 ${-15 * ring}%`,
                border: "0.5px solid var(--color-signal)",
                borderRadius: "50%",
                transform: `rotate(${ring * 30}deg)`,
                animation: `spin ${20 + ring * 10}s linear infinite`,
              }}
            />
          ))}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="w-full h-full opacity-[0.04]" style={{ background: "repeating-linear-gradient(90deg, transparent, transparent 40px, var(--color-signal) 40px, var(--color-signal) 41px)", backgroundSize: "80px 100%", animation: "wave-slide 6s linear infinite" }} />
        <style>{`@keyframes wave-slide { to { background-position: -80px 0; } }`}</style>
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="w-full h-full opacity-[0.03]">
          <div className="absolute rounded-full border border-signal" style={{ top: "30%", left: "20%", animation: "pulse-ring 5s ease-out infinite" }} />
          <div className="absolute rounded-full border border-signal" style={{ top: "70%", left: "80%", animation: "pulse-ring 4s ease-out infinite 1s" }} />
          <div className="absolute rounded-full border border-signal" style={{ top: "50%", left: "50%", animation: "pulse-ring 7s ease-out infinite 2s" }} />
        </div>
        <style>{`@keyframes pulse-ring { 0% { width:0;height:0;opacity:0.5; } 100% { width:400px;height:400px;margin:-200px 0 0 -200px;opacity:0; } }`}</style>
      </div>
    );
  }

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    cx: 10 + (i * 140) % 90,
    cy: 10 + (i * 97) % 90,
    r: 1 + (i % 3),
    delay: i * 0.7,
    dur: 3 + (i % 3) * 2,
  }));

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="w-full h-full opacity-[0.03]">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-signal"
            style={{
              left: `${p.cx}%`, top: `${p.cy}%`,
              width: `${p.r * 2}px`, height: `${p.r * 2}px`,
              animation: `dot-pulse ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
        {Array.from({ length: 2 }, (_, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute w-1 h-1 rounded-full bg-signal"
            style={{
              animation: `orbit-${i} ${8 + i * 3}s linear infinite`,
            }}
          />
        ))}
        <style>{`
          @keyframes dot-pulse { 0%,100% { opacity:0; } 50% { opacity:0.8; } }
          @keyframes orbit-0 { 0% { transform:translate(30vw,50vh); } 25% { transform:translate(60vw,30vh); } 50% { transform:translate(70vw,50vh); } 75% { transform:translate(50vw,70vh); } 100% { transform:translate(30vw,50vh); } }
          @keyframes orbit-1 { 0% { transform:translate(70vw,50vh); } 25% { transform:translate(80vw,40vh); } 50% { transform:translate(90vw,50vh); } 75% { transform:translate(80vw,60vh); } 100% { transform:translate(70vw,50vh); } }
        `}</style>
      </div>
    </div>
  );
}
