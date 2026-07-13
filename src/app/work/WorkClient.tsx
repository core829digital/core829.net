"use client";

import Link from "next/link";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { ProcessFlow } from "@/components/motion/ProcessFlow";
import { InfiniteLoopBackground } from "@/components/motion/InfiniteLoopBackground";

const WORK_FLOW = [
  { id: "brief", label: "Brief", duration: "1-2 days", deliverable: "Problem statement & goals" },
  { id: "design", label: "Design", duration: "1-2 weeks", deliverable: "Approved prototype" },
  { id: "build", label: "Build", duration: "2-8 weeks", deliverable: "Live staging environment" },
  { id: "launch", label: "Launch", duration: "1-2 days", deliverable: "Production deployment" },
  { id: "impact", label: "Impact", duration: "Measured", deliverable: "Results & optimization" },
];

export default function WorkClient() {
  return (
    <>
      <InfiniteLoopBackground variant="pulse" />
      <section data-anim="work-hero" className="pt-40 section-padding">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              Work
            </span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              Case studies.
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-xl leading-relaxed">
              Real projects we&apos;ve built. Each case study outlines the problem,
              what was delivered, and the measurable impact.
            </p>
          </div>
        </div>
      </section>

      <ProcessFlow
        stages={WORK_FLOW}
        title="Every project follows"
        subtitle="the same path."
        badge="Delivery process"
      />

      <section data-anim="work-grid" className="section-padding pt-0">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="group bg-graphite rounded-2xl border border-mist p-8 md:p-12 hover:border-ink/20 transition-all duration-300"
              >
                <span className="font-mono text-signal text-xs uppercase tracking-wider">{cs.category}</span>
                <h2 className="text-display text-2xl md:text-3xl tracking-tight mt-4 group-hover:text-signal transition-colors">
                  {cs.client}
                </h2>
                <p className="mt-4 text-ink/60 text-sm leading-relaxed line-clamp-3">
                  {cs.problem}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {cs.serviceTags.map((tag) => (
                    <span key={tag} className="text-xs font-mono uppercase tracking-wider text-ink/40 px-3 py-1 bg-white/5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                {cs.testimonial && cs.testimonial.rating > 0 && (
                  <div className="mt-6 flex items-center gap-2 text-sm text-ink/60">
                    <span className="text-signal">{renderStars(cs.testimonial.rating)}</span>
                    <span>{cs.testimonial.rating.toFixed(2)} / 5</span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
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
