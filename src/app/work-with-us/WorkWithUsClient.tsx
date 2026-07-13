"use client";

import Link from "next/link";
import { ProcessFlow } from "@/components/motion/ProcessFlow";
import { InfiniteLoopBackground } from "@/components/motion/InfiniteLoopBackground";

const HIRING_FLOW = [
  { id: "apply", label: "Apply", duration: "15 min", deliverable: "Resume & intro submission" },
  { id: "review", label: "Review", duration: "2-3 days", deliverable: "Fit assessment & reply" },
  { id: "chat", label: "Chat", duration: "30 min", deliverable: "Technical & culture conversation" },
  { id: "trial", label: "Trial", duration: "1-2 weeks", deliverable: "Paid mini-project" },
  { id: "decide", label: "Decide", duration: "1 day", deliverable: "Offer & start plan" },
];

const OPENINGS = [
  {
    title: "Full-Stack Developer (Next.js / Convex)",
    type: "Full-time · Remote",
    description:
      "Build production web applications using Next.js, Convex, and TypeScript. You'll own features end-to-end — from schema design to polished UI — across client projects and internal tools.",
  },
  {
    title: "UI/UX Designer (Development-Aware)",
    type: "Full-time · Remote",
    description:
      "Design interfaces that actually ship. You should understand component architecture, responsive constraints, and motion design well enough to hand off to developers without friction — or implement it yourself.",
  },
  {
    title: "Mobile Developer (React Native / Flutter)",
    type: "Full-time · Remote",
    description:
      "Build cross-platform mobile applications from a single codebase. You'll work on client-facing apps and internal utilities, with a focus on performance and native feel.",
  },
  {
    title: "Operations & Project Manager",
    type: "Full-time · Remote",
    description:
      "Keep projects on track, clients informed, and internal workflows running smoothly. You'll manage timelines, scope changes, and delivery handoffs across multiple concurrent engagements.",
  },
];

export default function WorkWithUsClient() {
  return (
    <>
      <InfiniteLoopBackground variant="orbits" />
      <section className="pt-40 section-padding">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8">
            <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Careers</span>
            <h1 className="text-display text-5xl md:text-8xl tracking-tight mt-4">
              Work with us.
            </h1>
            <p className="mt-6 text-lg text-ink/60 max-w-xl leading-relaxed">
              We build software that actually works — for clients and for ourselves. If you care
              about craft, clarity, and shipping, we should talk.
            </p>
          </div>
        </div>
      </section>

      <ProcessFlow
        stages={HIRING_FLOW}
        title="Our hiring process:"
        subtitle="transparent, fast, fair."
        badge="Careers"
        variant="minimal"
      />

      <section className="section-padding pt-0">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OPENINGS.map((role) => (
              <div key={role.title} className="bg-graphite rounded-2xl border border-mist p-8 md:p-10">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-display text-xl md:text-2xl tracking-tight">{role.title}</h2>
                  <span className="text-xs font-mono uppercase tracking-wider text-signal whitespace-nowrap flex-shrink-0">
                    {role.type}
                  </span>
                </div>
                <p className="mt-4 text-ink/60 text-sm leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
            <h2 className="text-display text-3xl md:text-5xl tracking-tight">
              Don&apos;t see a fit?
            </h2>
            <p className="mt-4 text-ink/60 max-w-md mx-auto leading-relaxed">
              We&apos;re always open to conversations with talented people. Send us your background
              and what you&apos;re looking for.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-signal text-ink text-sm font-medium tracking-widest uppercase rounded-full hover:bg-signal-dim transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
