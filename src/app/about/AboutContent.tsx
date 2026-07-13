"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ProcessFlow } from "@/components/motion/ProcessFlow";
import { InfiniteLoopBackground } from "@/components/motion/InfiniteLoopBackground";

const STATS = [
  { value: "7+", label: "Services delivered" },
  { value: "Zero", label: "Account managers" },
  { value: "100%", label: "Senior operators" },
  { value: "48h", label: "Typical first response" },
];

const PILLARS = [
  {
    title: "Direct access",
    desc: "You talk to the person building your software. Decisions don't go through layers of account management — they happen in the conversation.",
  },
  {
    title: "Senior delivery",
    desc: "Every project is led by an experienced engineer who has shipped production software, not a junior following a playbook.",
  },
  {
    title: "Scalable capacity",
    desc: "Need a larger team? We activate a trusted network of specialists — designers, QA, DevOps — without inflating your costs with agency overhead.",
  },
  {
    title: "Full ownership",
    desc: "You own the source code, the IP, and the infrastructure. No proprietary platforms, no lock-in, no recurring license fees for things you paid to build.",
  },
];

const METHOD_PILLARS = [
  {
    numeral: "01",
    title: "Discovery first",
    desc: "We start with a structured conversation, not a proposal template. We map your current state, constraints, and definition of done before we write a single line of code.",
  },
  {
    numeral: "02",
    title: "Scope before build",
    desc: "Every project gets a written scope document with feature list, architecture, timeline, and pricing. You approve it before we start. No surprises.",
  },
  {
    numeral: "03",
    title: "Live from sprint one",
    desc: "You get access to a staging environment from the first sprint. No big reveal at the end — you see progress in real time and course-correct as we go.",
  },
  {
    numeral: "04",
    title: "Shipped with support",
    desc: "Launch isn't the end. You get a handover document, a direct support channel, and ongoing maintenance options. We don't disappear after deployment.",
  },
];

const ABOUT_FLOW = [
  { id: "discover", label: "Discovery", duration: "1 call", deliverable: "Requirements map & fit check" },
  { id: "scope", label: "Scope", duration: "2-3 days", deliverable: "Fixed-cost scope document" },
  { id: "build", label: "Build", duration: "2-12 weeks", deliverable: "Staging environment with live updates" },
  { id: "launch", label: "Launch", duration: "1-2 days", deliverable: "Production deployment & handover" },
  { id: "support", label: "Support", duration: "Ongoing", deliverable: "Direct Slack channel & maintenance" },
];

export function AboutContent() {
  return (
    <>
      <InfiniteLoopBackground variant="pulse" />
      <section data-anim="about-hero" className="pt-40 section-padding">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-7">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              About
            </span>
            <h1 className="text-display text-5xl md:text-7xl tracking-tight mt-4">
              Built by someone
              <br />
              <span className="text-signal">who builds.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.15} className="col-span-12 md:col-span-5 mt-8 md:mt-0">
            <p className="text-lg text-ink/60 leading-relaxed">
              Core829 is structured around a simple truth: the best software comes from direct
              collaboration with the person writing the code. No account managers, no layers of
              abstraction between you and the engineer building your product.
            </p>
            <p className="mt-6 text-ink/50 leading-relaxed">
              This lean model means faster decisions, lower overhead, and a single point of
              accountability. When you need more capacity, we bring in trusted partner specialists
              — QA engineers, designers, DevOps — who work under the same standards.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section data-anim="about-stats" className="section-padding border-t border-mist">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-display text-4xl md:text-5xl text-signal tracking-tight">{s.value}</p>
                  <p className="mt-2 text-sm text-ink/50 font-mono uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section data-anim="about-pillars" className="section-padding border-t border-mist">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-4">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              How we work
            </span>
            <h2 className="text-display text-3xl md:text-4xl tracking-tight mt-4">
              The foundations
              <br />
              <span className="text-signal">that never change.</span>
            </h2>
          </ScrollReveal>
          <div className="col-span-12 md:col-span-7 md:col-start-6 mt-8 md:mt-0">
            <div className="grid gap-8">
              {PILLARS.map((p, i) => (
                <ScrollReveal key={p.title} variant="fade-up" delay={i * 0.08}>
                  <h3 className="text-display text-xl text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink/50 leading-relaxed">{p.desc}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section data-anim="about-method" className="section-padding border-t border-mist">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-5">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">
              The 829 Method
            </span>
            <h2 className="text-display text-3xl md:text-4xl tracking-tight mt-4">
              A process, not a black box.
            </h2>
            <p className="mt-6 text-ink/50 leading-relaxed">
              Every project follows the same four-phase framework. It keeps us predictable without
              being rigid — the structure stays, the details flex to fit your needs.
            </p>
          </ScrollReveal>
          <div className="col-span-12 md:col-span-6 md:col-start-7 mt-8 md:mt-0">
            {METHOD_PILLARS.map((m, i) => (
              <ScrollReveal key={m.title} variant="fade-up" delay={i * 0.1}>
                <div className="flex gap-6 py-8 border-t border-mist first:border-t-0 first:pt-0">
                  <span className="font-mono text-2xl text-signal font-bold shrink-0 w-10">
                    {m.numeral}
                  </span>
                  <div>
                    <h3 className="text-display text-xl text-ink">{m.title}</h3>
                    <p className="mt-2 text-sm text-ink/50 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ProcessFlow
        stages={ABOUT_FLOW}
        title="From first chat to"
        subtitle="running system."
        badge="The 829 Method"
      />

      <section data-anim="about-footer" className="section-padding border-t border-mist bg-graphite">
        <div className="grid-12">
          <ScrollReveal variant="fade-up" className="col-span-12 md:col-span-6">
            <h2 className="text-display text-3xl md:text-5xl tracking-tight">
              Based in Italy.
              <br />
              <span className="text-signal">Building anywhere.</span>
            </h2>
            <p className="mt-6 text-ink/50 leading-relaxed max-w-lg">
              Core829 was founded on the belief that businesses shouldn&apos;t have to choose between
              agency overhead and DIY chaos. You get the capability of a full software house with
              the accountability of a single senior operator.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1} className="col-span-12 md:col-span-4 md:col-start-9 mt-8 md:mt-0">
            <p className="text-ink/40 text-sm leading-relaxed">
               &ldquo;We don&apos;t scale by adding layers. We scale by staying lean and bringing in the
               right people per project. That&apos;s how you get agency-quality output without agency-
               sized overhead.&rdquo;
            </p>
            <div className="mt-6">
              <MagneticButton href="/contact" variant="primary">
                Start a conversation
              </MagneticButton>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
