"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESS_STEPS } from "@/lib/brand";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function ProcessTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
        onUpdate: (self) => {
          gsap.to(line, {
            scaleX: self.progress,
          });
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReduced]);

  const steps = PROCESS_STEPS.slice(0, 4);

  return (
    <section ref={sectionRef} data-anim="process" className="py-24">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-8">
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
            The 829 Method
          </span>
          <h2 className="text-display text-4xl md:text-6xl tracking-tight mt-4">
            How we build.
          </h2>
        </div>
      </div>

      <div className="relative mt-20 px-6">
        {}
        <div className="absolute top-0 left-6 right-6 h-[1px] bg-mist origin-left"
          style={{ transform: "scaleX(0)" }}
          ref={lineRef}
        />

        {}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.id} className="relative pt-12">
              <div className={`absolute top-0 left-0 w-4 h-4 rounded-full border-2 -translate-y-1/2 ${
                i === 0 ? "bg-signal border-signal" : "border-mist"
              }`} />
              <span className="font-mono text-signal text-xs">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-display text-xl mt-2">{step.name}</h3>
              <p className="text-sm text-ink/60 mt-2 leading-relaxed">{step.description}</p>
              <span className="text-xs font-mono text-ink/60 mt-3 block">{step.duration}</span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 font-mono text-sm tracking-wider uppercase text-signal hover:text-signal-dim transition-colors group"
          >
            View the full method
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

