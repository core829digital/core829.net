"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function CTABand() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(".cta-animate");
      gsap.fromTo(
        targets,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReduced]);

  return (
    <section ref={sectionRef} className="relative pt-28 pb-0 bg-graphite text-ink overflow-hidden">
      {}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" viewBox="0 0 1440 600">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)">
            <animate attributeName="opacity" values="0.3;0.6;0.3" dur="8s" repeatCount="indefinite" />
          </rect>
        </svg>
      </div>

      <div className="relative z-10 text-center">
        <div className="cta-animate">
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
            Ready?
          </span>
        </div>
        <h2 className="cta-animate text-display text-4xl md:text-7xl tracking-tight mt-6">
          Let&apos;s build
          <br />
          <span className="text-signal">something real.</span>
        </h2>
        <p className="cta-animate mt-6 text-ink/70 text-lg max-w-md mx-auto">
          Project, retainer, or rentable app — pick the model that fits you.
        </p>
        <div className="cta-animate mt-10">
          <MagneticButton href="/contact" variant="primary">
            Start a project
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
