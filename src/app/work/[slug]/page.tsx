import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/caseStudies";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study" };
  return {
    title: `${cs.client} — Case Study`,
    description: cs.problem.slice(0, 160),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (
    <>
      <section className="pt-40 section-padding">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <Link
              href="/work"
              className="font-mono text-xs text-ink/60 hover:text-signal transition-colors uppercase tracking-wider"
            >
              ← Back to work
            </Link>
            <span className="block mt-16 font-mono text-signal text-xs uppercase tracking-[0.2em]">
              {cs.category}
            </span>
            <h1 className="text-display text-4xl md:text-7xl tracking-tight mt-4">
              {cs.client}
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <h2 className="text-display text-2xl md:text-3xl tracking-tight text-ink/80">The problem</h2>
            <p className="mt-4 text-lg text-ink/70 leading-relaxed">{cs.problem}</p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <h2 className="text-display text-2xl md:text-3xl tracking-tight text-ink/80">What was built</h2>
            <ul className="mt-6 space-y-4">
              {cs.built.map((item, i) => (
                <li key={i} className="flex gap-4 text-ink/70 leading-relaxed">
                  <span className="text-signal font-mono text-sm flex-shrink-0 mt-1">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {cs.testimonial && cs.testimonial.rating > 0 && (
        <section className="section-padding pt-0">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-8 md:col-start-3 bg-graphite rounded-2xl border border-mist p-8 md:p-12">
              <blockquote className="text-lg md:text-xl text-ink/80 leading-relaxed italic">
                &ldquo;{cs.testimonial.text}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-ink/60 font-mono">{cs.testimonial.attribution}</span>
                <span className="text-signal text-sm">{renderStars(cs.testimonial.rating)} {cs.testimonial.rating.toFixed(2)} / 5</span>
              </div>
              {cs.testimonial.draft && (
                <p className="mt-4 text-xs text-ink/40 font-mono italic">
                  [DRAFT — pending client approval]
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {cs.metric !== null && cs.metricLabel && (
        <section className="section-padding pt-0">
          <div className="grid-12">
            <div className="col-span-12 md:col-span-4 md:col-start-3 bg-graphite rounded-2xl border border-mist p-8 text-center">
              <span className="text-display text-5xl md:text-7xl text-signal font-bold">{cs.metric}</span>
              <span className="block mt-2 text-sm text-ink/60 font-mono uppercase tracking-wider">{cs.metricLabel}</span>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding pt-0">
        <div className="grid-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3 flex gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-signal text-ink text-sm font-medium tracking-widest uppercase rounded-full hover:bg-signal-dim transition-colors"
            >
              Start a project
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center px-8 py-4 border border-mist text-ink text-sm font-medium tracking-widest uppercase rounded-full hover:bg-white/5 transition-colors"
            >
              All case studies
            </Link>
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
