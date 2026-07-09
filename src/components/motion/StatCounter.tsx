"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  className?: string;
}

export function StatCounter({ value, suffix = "", prefix = "", label, className = "" }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      if (ref.current) ref.current.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    const obj = { val: 0 };

    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current?.parentElement,
        start: "top 80%",
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        }
      },
    });
  }, [value, suffix, prefix, prefersReduced]);

  return (
    <div className={className}>
      <span className="text-display text-5xl md:text-7xl tabular-nums" ref={ref}>
        {prefersReduced ? `${prefix}${value}${suffix}` : `${prefix}0${suffix}`}
      </span>
      <span className="block text-sm text-ink/60 mt-2">{label}</span>
    </div>
  );
}
