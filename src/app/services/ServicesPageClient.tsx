"use client";

import { ServicesGrid } from "./ServicesGrid";
import { ProcessFlow } from "@/components/motion/ProcessFlow";
import { InfiniteLoopBackground } from "@/components/motion/InfiniteLoopBackground";

const SERVICES_FLOW = [
  { id: "problem", label: "Understand", duration: "1-2 days", deliverable: "Problem mapping & requirements" },
  { id: "solution", label: "Design", duration: "2-5 days", deliverable: "Solution architecture & proposal" },
  { id: "build", label: "Build", duration: "2-12 weeks", deliverable: "Working system in staging" },
  { id: "deliver", label: "Deliver", duration: "1-2 days", deliverable: "Production deployment & training" },
  { id: "evolve", label: "Evolve", duration: "Ongoing", deliverable: "Support, updates & iteration" },
];

export default function ServicesPageClient() {
  return (
    <>
      <InfiniteLoopBackground variant="wave" />
      <section data-anim="services-hero" className="pt-40 section-padding">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              Services
            </span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              Seven capabilities.
              <br />
              <span className="text-signal">One partner.</span>
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-2xl leading-relaxed">
              Core829 runs the full digital stack your business needs. Pick the capability that
              matters now — or let us handle the whole thing.
            </p>
          </div>
        </div>
      </section>

      <ProcessFlow
        stages={SERVICES_FLOW}
        title="Every service follows"
        subtitle="the same rigour."
        badge="Delivery model"
      />

      <section data-anim="services-grid" className="section-padding pt-0">
        <ServicesGrid />
      </section>
    </>
  );
}
