"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  stagger?: number;
  delay?: number;
  triggerOnScroll?: boolean;
}

export function SplitTextReveal({
  children,
  as: Tag = "div",
  className = "",
  stagger = 0.08,
  delay = 0,
  triggerOnScroll = true,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  useLayoutEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const lines = splitLines(el);

    gsap.set(lines, { yPercent: 110 });
    gsap.from(lines, {
      yPercent: 110,
      duration: 0.9,
      ease: "core829Reveal",
      stagger,
      delay,
      scrollTrigger: triggerOnScroll
        ? { trigger: el, start: "top 80%" }
        : undefined,
    });

    return () => {
      lines.forEach((line) => {
        const wrapper = line.parentElement;
        if (wrapper && wrapper.classList.contains("split-wrapper")) {
          wrapper.replaceWith(line);
        }
      });
    };
  }, [children, stagger, delay, triggerOnScroll, prefersReduced]);

  const TagName = Tag;

  return (
      <TagName ref={ref as unknown as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </TagName>
  );
}

function splitLines(el: HTMLElement): HTMLElement[] {
  const text = el.innerText || el.textContent || "";
  el.innerHTML = "";

  const brCount = (text.match(/\n/g) || []).length;
  const lines = text.split("\n");

  const elements: HTMLElement[] = [];

  lines.forEach((line, i) => {
    const wrapper = document.createElement("div");
    wrapper.className = "split-wrapper";
    wrapper.style.overflow = "hidden";

    const lineEl = document.createElement("span");
    lineEl.className = "split-line";
    lineEl.textContent = line || "\u00A0";
    lineEl.style.display = "inline-block";

    wrapper.appendChild(lineEl);
    el.appendChild(wrapper);
    elements.push(lineEl);

    if (i < brCount) {
      el.appendChild(document.createElement("br"));
    }
  });

  return elements;
}
