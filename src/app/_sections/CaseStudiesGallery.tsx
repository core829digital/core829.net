"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCursor } from "@/components/ui/CustomCursor";
import { CASE_STUDIES } from "@/lib/caseStudies";

gsap.registerPlugin(ScrollTrigger);

export function CaseStudiesGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { setCursor } = useCursor();

  useEffect(() => {
    if (prefersReduced) return;
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      pin: false,
      onUpdate: (self) => {
        const track = trackRef.current;
        if (!track) return;
        const scrollWidth = track.scrollWidth - window.innerWidth;
        if (scrollWidth <= 0) return;
        gsap.set(track, { x: -self.progress * scrollWidth });
      },
    });

    return () => { st.kill(); };
  }, [prefersReduced]);

  return (
    <section ref={sectionRef} className="relative min-h-[400vh]">
      <div className="sticky top-0 min-h-dvh overflow-hidden flex flex-col justify-center">
        <div className="absolute top-20 left-0 right-0 z-10">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-8">
              <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Proof</span>
              <h2 className="text-display text-4xl md:text-6xl tracking-tight mt-4">Work that speaks.</h2>
            </div>
          </div>
        </div>
        <div ref={trackRef} className="flex gap-12 items-center" style={{ paddingLeft: "50vw", willChange: "transform" }}>
          {CASE_STUDIES.filter((cs) => cs.slug !== "core829-crm").map((cs) => (
            <Link key={cs.slug} href={`/work/${cs.slug}`} className="group flex-shrink-0 w-[70vw] md:w-[40vw] h-[60vh] bg-graphite rounded-2xl p-12 flex flex-col justify-end relative overflow-hidden border border-mist"
              onMouseEnter={() => { setCursor("link", "View"); }}
              onMouseLeave={() => { setCursor("default"); }}>
              <div className="relative z-10">
                <span className="font-mono text-xs tracking-wider uppercase text-signal">{cs.category}</span>
                <h3 className="text-display text-2xl md:text-3xl tracking-tight mt-2">{cs.client}</h3>
                <p className="mt-3 text-ink/60 text-sm leading-relaxed line-clamp-3">{cs.problem}</p>
                {cs.testimonial && cs.testimonial.rating > 0 && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-ink/60">
                    <span className="text-signal">{renderStars(cs.testimonial.rating)}</span>
                    <span>{cs.testimonial.rating.toFixed(2)} / 5</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function renderStars(rating: number): string {
  const full = Math.floor(rating);
  const fraction = rating - full;
  let s = "";
  for (let i = 0; i < full; i++) s += "★";
  if (fraction >= 0.25) s += "★";
  return s;
}
