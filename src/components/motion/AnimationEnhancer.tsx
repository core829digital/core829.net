"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { isLowEndDevice, getDeviceTier, shouldSimplifyAnimations } from "@/lib/deviceCapability";

gsap.registerPlugin(ScrollTrigger);

function isHomePage() {
  if (typeof window === "undefined") return false;
  return window.location.pathname === "/";
}

export function AnimationEnhancer() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    const lowEnd = isLowEndDevice();
    const tier = getDeviceTier();
    const simple = shouldSimplifyAnimations();
    const home = isHomePage();

    mainRef.current = document.getElementById("main-content") as HTMLDivElement | null;

    const ctx = gsap.context(() => {
      const main = mainRef.current;
      if (!main) return;

      const gpu = (el: Element) => {
        (el as HTMLElement).style.willChange = "transform, opacity";
      };

      const dataEls = main.querySelectorAll("[data-anim]");
      dataEls.forEach(gpu);

      // ── 1. HERO: 3D depth parallax ──────────────────────────────
      const hero = main.querySelector("[data-anim='hero']");
      if (hero && !lowEnd) {
        const layers = hero.querySelectorAll("[data-depth]");
        const heroContent = hero.querySelector("[data-hero-content]");
        if (heroContent) {
          hero.addEventListener("pointermove", (e: Event) => {
            const me = e as MouseEvent;
            const rect = hero.getBoundingClientRect();
            const x = (me.clientX - rect.left) / rect.width - 0.5;
            const y = (me.clientY - rect.top) / rect.height - 0.5;
            layers.forEach((layer) => {
              const d = parseFloat((layer as HTMLElement).getAttribute("data-depth") || "0");
              gsap.to(layer, {
                x: x * d * 40,
                y: y * d * 40,
                duration: 1.2,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          });
        }
      }

      // ── 2. CAPABILITY STRIP: morphing blob ──────────────────────
      const strip = main.querySelector("[data-anim='strip']");
      if (strip && !lowEnd) {
        const blob = document.createElement("div");
        blob.className = "pointer-events-none absolute inset-0 opacity-[0.04]";
        blob.style.cssText = "background:radial-gradient(600px circle at 50% 50%,var(--color-signal),transparent 70%);filter:blur(40px);";
        strip.appendChild(blob);
        gsap.to(blob, {
          backgroundPosition: "100% 100%",
          ease: "sine.inOut",
          scrollTrigger: { trigger: strip, start: "top bottom", end: "bottom top", scrub: 2 },
        });
        gsap.to(blob, {
          scale: 1.2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // ── 3. SERVICES STACK: per-card scroll effects ─────────────
      const serviceCards = main.querySelectorAll("[data-anim='service-card']");
      if (home) {
        serviceCards.forEach((card, i) => {
          const numeral = card.querySelector("[data-numeral]");
          if (numeral && !simple) {
            gsap.fromTo(numeral,
              { scale: 0.5, opacity: 0 },
              {
                scale: 1, opacity: 1,
                scrollTrigger: { trigger: card, start: "top 75%", end: "top 25%", scrub: 1.5 },
                ease: "back.out(2)",
              }
            );
          }
          if (!lowEnd) {
            if (i === 2) {
              gsap.fromTo(card,
                { rotateY: 15, transformPerspective: 1000 },
                { rotateY: 0, scrollTrigger: { trigger: card, start: "top 75%", end: "top 25%", scrub: 1.5 }, ease: "power2.out" }
              );
            }
            if (i === 6) {
              gsap.fromTo(card,
                { y: 100 },
                { y: 0, scrollTrigger: { trigger: card, start: "top 90%", end: "top 40%", scrub: 1 }, ease: "elastic.out(1, 0.3)" }
              );
            }
          }
        });
      }

      // ── 4. FLOW MAP: constellation particles (reduced) ─────────
      const flowMap = main.querySelector("[data-anim='flowmap']");
      if (flowMap && !lowEnd && home) {
        const count = tier === "mid" ? 10 : 20;
        const particles: HTMLSpanElement[] = [];
        for (let i = 0; i < count; i++) {
          const p = document.createElement("span");
          p.className = "absolute w-[2px] h-[2px] rounded-full bg-signal pointer-events-none";
          p.style.cssText = `top:${Math.random()*100}%;left:${Math.random()*100}%;opacity:${0.1 + Math.random()*0.3};`;
          flowMap.appendChild(p);
          particles.push(p);
        }
        if (particles.length) {
          gsap.to(particles, {
            y: "random(-20, 20)", x: "random(-15, 15)",
            opacity: "random(0.05, 0.4)",
            duration: "random(3, 5)", repeat: -1, yoyo: true, ease: "sine.inOut",
            stagger: { each: 0.15, grid: "auto" },
          });
        }
      }

      // ── 5. CASE STUDIES: hover + scroll reveal ─────────────────
      const caseCards = main.querySelectorAll("[data-anim='case-card']");
      if (home) {
        caseCards.forEach((card) => {
          if (!lowEnd) {
            card.addEventListener("pointerenter", () => {
              gsap.to(card, { rotateY: -3, rotateX: 2, scale: 1.02, duration: 0.5, ease: "power2.out" });
            });
            card.addEventListener("pointerleave", () => {
              gsap.to(card, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
            });
          }
          gsap.fromTo(card,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, scrollTrigger: { trigger: card, start: "top 85%", end: "top 45%", scrub: 1.2 }, ease: "power2.out" }
          );
        });
      }

      // ── 6. PROCESS TEASER: bubble particles (reduced) ──────────
      const process = main.querySelector("[data-anim='process']");
      if (process && !lowEnd && home) {
        const count = tier === "mid" ? 4 : 8;
        const bubbles: HTMLSpanElement[] = [];
        for (let i = 0; i < count; i++) {
          const b = document.createElement("span");
          b.className = "absolute rounded-full pointer-events-none";
          const size = 2 + Math.random() * 4;
          b.style.cssText = `width:${size}px;height:${size}px;background:var(--color-signal);opacity:0.08;bottom:-${size}px;left:${Math.random()*100}%;`;
          process.appendChild(b);
          bubbles.push(b);
        }
        bubbles.forEach((b, i) => {
          gsap.to(b, {
            y: -(process.scrollHeight + 40),
            x: `random(-15, 15)`,
            opacity: 0.15,
            duration: 4 + Math.random() * 3,
            repeat: -1,
            delay: i * 0.5,
            ease: "none",
          });
        });
      }

      // ── 7. RENT TEASER: 3D tilt (reduced) ──────────────────────
      const rentCards = main.querySelectorAll("[data-anim='rent-card']");
      if (!lowEnd && home) {
        rentCards.forEach((card, i) => {
          gsap.set(card, { transformPerspective: 800 });
          card.addEventListener("pointermove", (e: Event) => {
            const me = e as MouseEvent;
            const rect = card.getBoundingClientRect();
            const x = ((me.clientX - rect.left) / rect.width - 0.5) * 20;
            const y = ((me.clientY - rect.top) / rect.height - 0.5) * -20;
            gsap.to(card, { rotateY: x, rotateX: y, duration: 0.6, ease: "power2.out" });
          });
          card.addEventListener("pointerleave", () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
          });
          const floatY = 5 + (i % 3) * 3;
          gsap.to(card, {
            y: -floatY, duration: 2.5 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: i * 0.4,
          });
        });
      }

      // ── 8. CTA BAND: particle burst (reduced) ──────────────────
      const cta = main.querySelector("[data-anim='cta']");
      if (cta && !lowEnd && home) {
        const count = tier === "mid" ? 8 : 12;
        const burstParticles: HTMLSpanElement[] = [];
        for (let i = 0; i < count; i++) {
          const p = document.createElement("span");
          p.className = "absolute w-1 h-1 rounded-full pointer-events-none";
          p.style.cssText = `background:var(--color-signal);top:50%;left:50%;opacity:0;`;
          cta.appendChild(p);
          burstParticles.push(p);
        }
        ScrollTrigger.create({
          trigger: cta,
          start: "top 80%",
          onEnter: () => {
            burstParticles.forEach((p, i) => {
              const angle = (i / burstParticles.length) * Math.PI * 2;
              const dist = 60 + Math.random() * 80;
              gsap.fromTo(p,
                { opacity: 0.8, scale: 1, x: 0, y: 0 },
                { opacity: 0, scale: 0, x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, duration: 0.8 + Math.random(), ease: "power2.out", delay: i * 0.03 }
              );
            });
          },
        });
      }

      // ── 9. Shimmer borders ─────────────────────────────────────
      const bordered = main.querySelectorAll("[data-shimmer]");
      bordered.forEach((el) => {
        const shimmer = document.createElement("div");
        shimmer.className = "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0";
        shimmer.innerHTML = `<div style="position:absolute;inset:-100%;width:300%;height:300%;background:conic-gradient(from 0deg,transparent,rgba(225,6,0,0.08),transparent 60%);animation:rotate-slow 6s linear infinite;"></div>`;
        el.appendChild(shimmer);
        el.addEventListener("pointerenter", () => gsap.to(shimmer, { opacity: 1, duration: 0.3 }));
        el.addEventListener("pointerleave", () => gsap.to(shimmer, { opacity: 0, duration: 0.5 }));
      });

      // ── 10. Staggered cascade reveal ────────────────────────────
      if (!simple) {
        const grids = main.querySelectorAll("[data-cascade]");
        grids.forEach((grid) => {
          const children = Array.from(grid.children);
          gsap.fromTo(children,
            { opacity: 0, y: 20, scale: 0.98 },
            {
              opacity: 1, y: 0, scale: 1,
              stagger: 0.06, duration: 0.6, ease: "power3.out",
              scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: "play none none none" },
            }
          );
        });
      }

      // ── 11. Counter animation ──────────────────────────────────
      if (!simple) {
        const stats = main.querySelectorAll("[data-counter]");
        stats.forEach((stat) => {
          const target = parseFloat(stat.getAttribute("data-target") || "0");
          const prefix = stat.getAttribute("data-prefix") || "";
          const suffix = stat.getAttribute("data-suffix") || "";
          let animated = false;
          ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            onEnter: () => {
              if (animated) return;
              animated = true;
              gsap.fromTo(
                { val: 0 }, { val: 0 },
                {
                  val: target, duration: 2, ease: "power3.out",
                  onUpdate: function () {
                    const v = Math.round(this.targets()[0].val);
                    stat.textContent = `${prefix}${v}${suffix}`;
                  },
                }
              );
            },
          });
        });
      }

      // ── 12. Expanding ring on CTA buttons ──────────────────────
      const ctas = main.querySelectorAll("[data-ring]");
      ctas.forEach((cta) => {
        cta.addEventListener("click", (e: Event) => {
          const me = e as MouseEvent;
          const ring = document.createElement("span");
          const rect = cta.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          ring.style.cssText = `position:absolute;top:${me.clientY - rect.top - size/2}px;left:${me.clientX - rect.left - size/2}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(225,6,0,0.3);pointer-events:none;`;
          cta.appendChild(ring);
          gsap.to(ring, { scale: 3, opacity: 0, duration: 0.6, ease: "power2.out", onComplete: () => ring.remove() });
        });
      });

      // ── 13. Floating label effects ─────────────────────────────
      const inputs = main.querySelectorAll("[data-float-label]");
      inputs.forEach((input) => {
        input.addEventListener("focus", () => {
          const label = input.parentElement?.querySelector("[data-label]");
          if (label) gsap.to(label, { y: -20, scale: 0.85, color: "var(--color-signal)", duration: 0.2 });
        });
        input.addEventListener("blur", () => {
          const label = input.parentElement?.querySelector("[data-label]");
          if (label && !(input as HTMLInputElement).value) {
            gsap.to(label, { y: 0, scale: 1, color: "rgba(250,250,250,0.4)", duration: 0.2 });
          }
        });
      });

      // ── 14. Background parallax on data-images ─────────────────
      if (!lowEnd) {
        const imgs = main.querySelectorAll("[data-parallax-img]");
        imgs.forEach((img) => {
          gsap.fromTo(img,
            { y: -20 },
            { y: 20, scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 1.5 }, ease: "none" }
          );
        });
      }

      // ── 15. Split-flap price animation ─────────────────────────
      if (!simple) {
        const prices = main.querySelectorAll("[data-flip-price]");
        prices.forEach((price) => {
          const val = parseFloat(price.getAttribute("data-flip-price") || "0");
          const formatted = val.toLocaleString();
          price.innerHTML = formatted
            .split("")
            .map((c) => `<span class="inline-block overflow-hidden" style="height:1em;"><span data-digit style="display:inline-block;transition:transform 0.6s cubic-bezier(0.34,1.56,0.64,1);">${c}</span></span>`)
            .join("");
          ScrollTrigger.create({
            trigger: price,
            start: "top 85%",
            onEnter: () => {
              const digits = price.querySelectorAll("[data-digit]");
              digits.forEach((d, i) => {
                gsap.fromTo(d,
                  { y: "100%", rotateX: -90 },
                  { y: "0%", rotateX: 0, duration: 0.6, delay: i * 0.05, ease: "back.out(1.7)" }
                );
              });
            },
          });
        });
      }

      // ── 16. Scroll-reactive sticky opacity ─────────────────────
      const stickies = main.querySelectorAll("[data-fade-sticky]");
      stickies.forEach((sticky) => {
        gsap.fromTo(sticky,
          { opacity: 0.3 },
          { opacity: 1, scrollTrigger: { trigger: sticky, start: "top 30%", end: "top 0%", scrub: 1 } }
        );
      });

      // ── 17. Animated gradient background ───────────────────────
      if (!lowEnd) {
        const grads = main.querySelectorAll("[data-gradient-bg]");
        grads.forEach((grad) => {
          gsap.to(grad, {
            backgroundPosition: "100% 100%",
            duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        });
      }

    }, mainRef);

    return () => ctx.revert();
  }, [pathname, prefersReduced]);

  return null;
}
