"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldSimplifyAnimations } from "@/lib/deviceCapability";

gsap.registerPlugin(ScrollTrigger);

interface ScrollPinSectionProps {
  children: ReactNode;
  className?: string;
  pinSpacing?: boolean;
  scrub?: boolean | number;
  start?: string;
  end?: string;
  markers?: boolean;
}

export function ScrollPinSection({
  children,
  className = "",
  pinSpacing = true,
  scrub = true,
  start = "top top",
  end = "bottom top",
}: ScrollPinSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldSimplifyAnimations()) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin: true,
        pinSpacing,
        start,
        end,
        scrub,
      });
    }, section);

    return () => ctx.revert();
  }, [pinSpacing, scrub, start, end]);

  return (
    <div ref={spacerRef} className="relative">
      <section ref={sectionRef} className={className}>
        {children}
      </section>
    </div>
  );
}
