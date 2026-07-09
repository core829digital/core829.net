"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(Draggable);

interface MarqueeTrackProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function MarqueeTrack({
  children,
  speed = 0.5,
  className = "",
}: MarqueeTrackProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const track = trackRef.current;
    if (!track) return;

    const width = track.scrollWidth / 2;
    const duration = width / (100 * speed);

    const loopTl = gsap.to(track, {
      xPercent: -50,
      duration,
      ease: "none",
      repeat: -1,
    });
    loopRef.current = loopTl;

    const onEnter = () => {
      gsap.to(loopTl, { timeScale: 0, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(loopTl, { timeScale: 1, duration: 0.4, ease: "power2.out" });
    };

    track.addEventListener("pointerenter", onEnter);
    track.addEventListener("pointerleave", onLeave);

    const draggable = Draggable.create(track, {
      type: "x",
      inertia: true,
      onDragStart: () => loopTl.pause(),
      onDrag: function () {
        if (this.deltaX) {
          loopTl.progress(loopTl.progress() + this.deltaX * 0.0001);
        }
      },
      onRelease: () => loopTl.resume(),
    })[0];

    return () => {
      loopTl.kill();
      draggable.kill();
      track.removeEventListener("pointerenter", onEnter);
      track.removeEventListener("pointerleave", onLeave);
    };
  }, [speed, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex gap-8">{children}</div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex gap-8 w-max cursor-grab active:cursor-grabbing" style={{ willChange: "transform" }}>
        {children}
        {children}
      </div>
    </div>
  );
}
