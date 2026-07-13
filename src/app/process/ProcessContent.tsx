"use client";

import { PROCESS_STEPS } from "@/lib/brand";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProcessFlow } from "@/components/motion/ProcessFlow";
import { InfiniteLoopBackground } from "@/components/motion/InfiniteLoopBackground";
import { ILLUS_MAP } from "./ProcessIllustrations";

const PROCESS_FLOW = PROCESS_STEPS.map((s) => ({
  id: s.id,
  label: s.name,
  duration: s.duration,
  deliverable: s.description.split(".")[0] + ".",
}));

export function ProcessContent() {
  return (
    <>
      <InfiniteLoopBackground variant="orbits" />
      <section data-anim="process-hero" className="pt-40 section-padding">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              The 829 Method
            </span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              How we build.
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-2xl leading-relaxed">
              A structured, transparent process from first conversation to running system. No black
              boxes, no surprises, no &ldquo;we&rsquo;ll figure it out later.&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>

      <ProcessFlow
        stages={PROCESS_FLOW}
        title="A process, not a"
        subtitle="black box."
        badge="The 829 Method"
        variant="vibrant"
      />

      <section data-anim="process-steps" className="section-padding pt-0">
        {PROCESS_STEPS.map((step, i) => (
          <ScrollReveal key={step.id} variant="fade-up" delay={i * 0.06}>
            <div className="grid-12 py-20 border-t border-mist items-center">
              <div className="col-span-12 md:col-span-1">
                <span className="font-mono text-6xl md:text-8xl font-bold text-signal">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="col-span-12 md:col-span-5 mt-4 md:mt-0">
                <h2 className="text-display text-3xl md:text-5xl tracking-tight">{step.name}</h2>
                <p className="mt-6 text-ink/60 leading-relaxed max-w-lg">{step.description}</p>
                <span className="inline-block mt-4 font-mono text-xs text-ink/60 uppercase tracking-wider">
                  Typical duration: {step.duration}
                </span>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-8 mt-8 md:mt-0">
                <div className="w-full aspect-video bg-graphite rounded-xl overflow-hidden">
                  {(() => {
                    const Illus = ILLUS_MAP[step.icon];
                    return Illus ? <Illus /> : <span className="text-ink/30 text-xs font-mono">{step.icon}</span>;
                  })()}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      <section data-anim="process-footer" className="section-padding bg-graphite">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-8">
            <h2 className="text-display text-3xl md:text-5xl tracking-tight">
              Each stage has a clear output. You&apos;ll always know what&apos;s next.
            </h2>
            <p className="mt-6 text-ink/50 leading-relaxed">
              Discovery happens via a structured call where we map your requirements, constraints,
              and success metrics. Scope is documented in a shared spec. Design uses Figma with
              weekly reviews. Development runs in 2-week sprints with Slack updates and a live
              staging environment. QA includes automated tests and a manual handover session before
              launch.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
