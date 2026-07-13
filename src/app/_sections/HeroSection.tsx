"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const Hero3DSceneLease = dynamic(() => import("@/components/three/Hero3DScene").then((m) => ({ default: m.Hero3DScene })), {
  ssr: false,
});

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const prefersReduced = useReducedMotion();
  const [show3D] = useState(true);

  useEffect(() => {
    if (prefersReduced) return;
    const ctx = gsap.context(() => {
      const chars = headlineRef.current?.querySelectorAll(".hero-char");
      if (chars?.length) {
        gsap.fromTo(
          chars,
          { opacity: 0, y: 60, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.03, ease: "power4.out", delay: 0.3 }
        );
      }

      const contentEls = sectionRef.current?.querySelectorAll(".hero-fade");
      if (contentEls?.length) {
        gsap.fromTo(
          contentEls,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 1 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReduced]);

  const headline = "Building\u00A0Tomorrow's\nSoftware\u00A0Today";
  const chars = headline.split("").map((char, i) => (
    <span key={i} className="hero-char inline-block">
      {char === "\n" ? <br /> : char}
    </span>
  ));

  return (
    <section
      ref={sectionRef}
      data-anim="hero"
      className="relative h-dvh bg-paper overflow-hidden"
    >
      <div data-depth="3" className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite to-transparent z-10 pointer-events-none" />
      <div data-depth="1" className="absolute top-20 right-[10%] w-32 h-32 rounded-full bg-signal/5 blur-3xl pointer-events-none" />
      <div data-depth="2" className="absolute bottom-40 left-[5%] w-24 h-24 rounded-full bg-signal/5 blur-2xl pointer-events-none" />

      <div className="absolute inset-0 right-0 w-full md:w-[60%] ml-auto">
        {show3D && <Hero3DSceneLease />}
      </div>

      <div className="relative z-20 h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div data-hero-content className="max-w-3xl">
            <span className="hero-fade font-mono text-signal text-xs tracking-[0.2em] uppercase block mb-6 opacity-0">
              Software House
            </span>
            <h1
              ref={headlineRef}
              className="text-display text-[clamp(36px,6vw,80px)] leading-[1.1] tracking-tight text-ink"
            >
              {prefersReduced ? <>Building&nbsp;Tomorrow&apos;s<br />Software&nbsp;Today</> : chars}
            </h1>
            <p className="hero-fade mt-6 text-base md:text-lg text-ink/70 max-w-xl leading-relaxed opacity-0">
                Core829 runs the full stack your business needs — web, native software,
                growth infrastructure, and rentable tools — so you own the system,
                not the vendor lock-in.
              </p>
              <div className="hero-fade mt-8 flex gap-3 flex-wrap opacity-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-signal text-ink text-xs font-medium tracking-widest uppercase rounded-full hover:bg-signal-dim transition-colors"
                >
                  Start a project
                </Link>
                <Link
                  href="/services/rent-webapps"
                  className="inline-flex items-center justify-center px-5 py-2.5 border border-ink/20 text-ink/80 text-xs font-medium tracking-widest uppercase rounded-full hover:bg-ink/10 hover:border-ink/40 transition-all"
                >
                  Explore rentable apps
                </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
        <span className="font-mono text-[10px] text-ink/60 tracking-[0.2em]">SCROLL</span>
        <div className="w-[1px] h-12 bg-ink/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-signal animate-scroll-indicator" />
        </div>
      </div>

      <style>{`
        @keyframes scroll-indicator { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
        .animate-scroll-indicator { animation: scroll-indicator 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
