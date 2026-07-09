"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-in" | "clip-up";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
  start?: string;
  scrub?: boolean | number;
  as?: "div" | "section" | "article" | "span";
}

const variantConfig: Record<RevealVariant, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
  "fade-up": { from: { opacity: 0, y: 48 }, to: { opacity: 1, y: 0 } },
  "fade-down": { from: { opacity: 0, y: -48 }, to: { opacity: 1, y: 0 } },
  "fade-left": { from: { opacity: 0, x: -48 }, to: { opacity: 1, x: 0 } },
  "fade-right": { from: { opacity: 0, x: 48 }, to: { opacity: 1, x: 0 } },
  "scale-in": { from: { opacity: 0, scale: 0.92 }, to: { opacity: 1, scale: 1 } },
  "clip-up": { from: { opacity: 0, clipPath: "inset(0 0 100% 0)" }, to: { opacity: 1, clipPath: "inset(0 0 0% 0)" } },
};

export function ScrollReveal({
  children,
  variant = "fade-up",
  className = "",
  delay = 0,
  duration = 0.7,
  stagger = 0,
  triggerOnScroll = true,
  start = "top 85%",
  scrub = false,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const childEls = el.children;
    const targets = stagger > 0 && childEls.length > 0 ? childEls : el;

    const from = { ...variantConfig[variant].from };
    const to = { ...variantConfig[variant].to };

    gsap.set(targets, from);

    const anim = gsap.fromTo(
      targets,
      from,
      {
        ...to,
        duration,
        delay,
        ease: "power3.out",
        stagger,
        scrollTrigger: triggerOnScroll
          ? {
              trigger: el,
              start,
              scrub: typeof scrub === "number" ? scrub : !!scrub || undefined,
            }
          : undefined,
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [variant, delay, duration, stagger, triggerOnScroll, start, scrub, prefersReduced]);

  return <Tag ref={ref} className={className}>{children}</Tag>;
}
