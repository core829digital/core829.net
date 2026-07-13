"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function AnimationEnhancer() {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReduced) return;

    mainRef.current = document.getElementById("main-content") as HTMLDivElement | null;

    const ctx = gsap.context(() => {
      const main = mainRef.current;
      if (!main) return;

      // GPU-accelerate all GSAP-animated elements
      const willChangeEls = main.querySelectorAll("[data-anim]");
      willChangeEls.forEach((el) => {
        (el as HTMLElement).style.willChange = "transform, opacity";
      });

      // 1. HERO: 3D depth parallax on mouse — separate layers move at different speeds
      const hero = main.querySelector("[data-anim='hero']");
      if (hero) {
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

      // 2. CAPABILITY STRIP: morphing blob overlay
      const strip = main.querySelector("[data-anim='strip']");
      if (strip) {
        const blob = document.createElement("div");
        blob.className = "pointer-events-none absolute inset-0 opacity-[0.04]";
        blob.style.cssText = "background:radial-gradient(600px circle at 50% 50%,var(--color-signal),transparent 70%);filter:blur(40px);";
        strip.appendChild(blob);
        gsap.to(blob, {
          backgroundPosition: "100% 100%",
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: strip,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
        gsap.to(blob, {
          scale: 1.2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. SERVICES STACK: each card gets unique animation
      const serviceCards = main.querySelectorAll("[data-anim='service-card']");
      serviceCards.forEach((card, i) => {
        const numeral = card.querySelector("[data-numeral]");
        const content = card.querySelector("[data-card-content]");
        const border = card.querySelector("[data-card-border]");

        if (numeral) {
          gsap.fromTo(numeral,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1, opacity: 1,
              scrollTrigger: { trigger: card, start: "top 75%", end: "top 25%", scrub: 1.5 },
              ease: "back.out(2)",
            }
          );
        }

        if (content && i === 0) {
          gsap.fromTo(content,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              scrollTrigger: { trigger: card, start: "top 70%", end: "top 30%", scrub: 1 },
              ease: "none",
            }
          );
        }

        if (border && i === 1) {
          gsap.to(border, {
            "--border-angle": "360deg",
            scrollTrigger: { trigger: card, start: "top 80%", end: "top 20%", scrub: 1 },
            ease: "none",
          } as gsap.TweenVars);
        }

        if (i === 2) {
          gsap.fromTo(card,
            { rotateY: 15, transformPerspective: 1000 },
            {
              rotateY: 0,
              scrollTrigger: { trigger: card, start: "top 75%", end: "top 25%", scrub: 1.5 },
              ease: "power2.out",
            }
          );
        }

        if (i === 3) {
          gsap.fromTo(card,
            { filter: "blur(8px) brightness(0.6)" },
            {
              filter: "blur(0px) brightness(1)",
              scrollTrigger: { trigger: card, start: "top 80%", end: "top 20%", scrub: 1 },
              ease: "none",
            }
          );
        }

        if (i === 4) {
          const particles: HTMLSpanElement[] = [];
          for (let p = 0; p < 6; p++) {
            const dot = document.createElement("span");
            dot.className = "absolute w-1 h-1 rounded-full bg-signal pointer-events-none";
            dot.style.cssText = `top:${Math.random()*100}%;left:${Math.random()*100}%;opacity:0;`;
            card.appendChild(dot);
            particles.push(dot);
          }
          gsap.to(particles, {
            opacity: 1,
            scale: 2,
            stagger: 0.15,
            duration: 0.6,
            scrollTrigger: {
              trigger: card, start: "top 70%", end: "top 30%", scrub: 1,
            },
          });
        }

        if (i === 5) {
          gsap.to(card, {
            boxShadow: "0 0 60px rgba(225,6,0,0.15)",
            scrollTrigger: { trigger: card, start: "top 80%", end: "top 20%", scrub: 1 },
            ease: "none",
          });
        }

        if (i === 6) {
          gsap.fromTo(card,
            { y: 100 },
            {
              y: 0,
              scrollTrigger: { trigger: card, start: "top 90%", end: "top 40%", scrub: 1 },
              ease: "elastic.out(1, 0.3)",
            }
          );
        }
      });

      // 4. FLOW MAP: constellation particle connections (enhanced)
      const flowMap = main.querySelector("[data-anim='flowmap']");
      if (flowMap) {
        const particles: HTMLSpanElement[] = [];
        for (let i = 0; i < 30; i++) {
          const p = document.createElement("span");
          p.className = "absolute w-[2px] h-[2px] rounded-full bg-signal pointer-events-none";
          p.style.cssText = `top:${Math.random()*100}%;left:${Math.random()*100}%;opacity:${0.1 + Math.random()*0.4};`;
          flowMap.appendChild(p);
          particles.push(p);
        }
        gsap.to(particles, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          opacity: "random(0.05, 0.5)",
          duration: "random(2, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: { each: 0.1, grid: "auto" },
        });
      }

      // 5. CASE STUDIES: card 3D flip on hover
      const caseCards = main.querySelectorAll("[data-anim='case-card']");
      caseCards.forEach((card) => {
        card.addEventListener("pointerenter", () => {
          gsap.to(card, {
            rotateY: -3,
            rotateX: 2,
            scale: 1.02,
            duration: 0.5,
            ease: "power2.out",
          });
        });
        card.addEventListener("pointerleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
          });
        });
        gsap.fromTo(card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1,
            scrollTrigger: { trigger: card, start: "top 85%", end: "top 45%", scrub: 1.2 },
            ease: "power2.out",
          }
        );
      });

      // 6. PROCESS TEASER: fluid particle pipeline enhancement
      const process = main.querySelector("[data-anim='process']");
      if (process) {
        const bubbles: HTMLSpanElement[] = [];
        for (let i = 0; i < 12; i++) {
          const b = document.createElement("span");
          b.className = "absolute rounded-full pointer-events-none";
          const size = 2 + Math.random() * 6;
          b.style.cssText = `width:${size}px;height:${size}px;background:var(--color-signal);opacity:0.08;bottom:-${size}px;left:${Math.random()*100}%;`;
          process.appendChild(b);
          bubbles.push(b);
        }
        bubbles.forEach((b, i) => {
          gsap.to(b, {
            y: -(process.scrollHeight + 40),
            x: `random(-20, 20)`,
            opacity: 0.15,
            duration: 3 + Math.random() * 4,
            repeat: -1,
            delay: i * 0.4,
            ease: "none",
          });
        });
      }

      // 7. RENT TEASER: 3D floating product cards
      const rentCards = main.querySelectorAll("[data-anim='rent-card']");
      rentCards.forEach((card, i) => {
        gsap.set(card, { transformPerspective: 800 });
        card.addEventListener("pointermove", (e: Event) => {
          const me = e as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = ((me.clientX - rect.left) / rect.width - 0.5) * 20;
          const y = ((me.clientY - rect.top) / rect.height - 0.5) * -20;
          gsap.to(card, {
            rotateY: x,
            rotateX: y,
            duration: 0.6,
            ease: "power2.out",
          });
        });
        card.addEventListener("pointerleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.4)",
          });
        });

        const floatY = 5 + (i % 3) * 3;
        gsap.to(card, {
          y: -floatY,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });

      // 8. CTA BAND: particle burst
      const cta = main.querySelector("[data-anim='cta']");
      if (cta) {
        const burstParticles: HTMLSpanElement[] = [];
        for (let i = 0; i < 20; i++) {
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
              const dist = 80 + Math.random() * 120;
              gsap.fromTo(p,
                { opacity: 0.8, scale: 1, x: 0, y: 0 },
                {
                  opacity: 0,
                  scale: 0,
                  x: Math.cos(angle) * dist,
                  y: Math.sin(angle) * dist,
                  duration: 1 + Math.random(),
                  ease: "power2.out",
                  delay: i * 0.03,
                }
              );
            });
          },
        });
      }

      // 9. Infinite rotating geometric ornament on each section
      const sections = main.querySelectorAll("section");
      sections.forEach((section, i) => {
        if (i % 2 !== 0) return;
        const ornament = document.createElement("div");
        ornament.className = "pointer-events-none absolute opacity-[0.02]";
        const size = 60 + (i % 4) * 40;
        ornament.style.cssText = `width:${size}px;height:${size}px;top:${10+(i*7)%80}%;right:${5+(i*13)%90}%;border:1px solid var(--color-signal);border-radius:${i%3===0?'50%':i%3===1?'4px':'0'};`;
        if (i % 3 === 2) {
          ornament.style.transform = "rotate(45deg)";
        }
        section.appendChild(ornament);
        gsap.to(ornament, {
          rotation: 360,
          duration: 20 + (i % 5) * 5,
          repeat: -1,
          ease: "none",
        });
      });

      // 10. Shimmer borders on cards
      const bordered = main.querySelectorAll("[data-shimmer]");
      bordered.forEach((el) => {
        const shimmer = document.createElement("div");
        shimmer.className = "pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden opacity-0";
        shimmer.innerHTML = `<div style="position:absolute;inset:-100%;width:300%;height:300%;background:conic-gradient(from 0deg,transparent,rgba(225,6,0,0.08),transparent 60%);animation:rotate-slow 6s linear infinite;"></div>`;
        el.appendChild(shimmer);
        el.addEventListener("pointerenter", () => gsap.to(shimmer, { opacity: 1, duration: 0.3 }));
        el.addEventListener("pointerleave", () => gsap.to(shimmer, { opacity: 0, duration: 0.5 }));
      });

      // 11. Scroll-driven parallax depth on images
      const imgs = main.querySelectorAll("[data-parallax-img]");
      imgs.forEach((img) => {
        gsap.fromTo(img,
          { y: -30 },
          {
            y: 30,
            scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: 1.5 },
            ease: "none",
          }
        );
      });

      // 12. Staggered cascade reveal for grids
      const grids = main.querySelectorAll("[data-cascade]");
      grids.forEach((grid) => {
        const children = Array.from(grid.children);
        gsap.fromTo(children,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            stagger: 0.06,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: grid,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 13. Text scramble effect on hover for headings
      const scrambles = main.querySelectorAll("[data-scramble]");
      scrambles.forEach((el) => {
        const original = el.textContent || "";
        el.addEventListener("pointerenter", () => {
          const chars = "!<>-_\\/[]{}—=+*^?#________";
          let iterations = 0;
          const interval = setInterval(() => {
            el.textContent = original
              .split("")
              .map((char, index) => {
                if (index < iterations) return original[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join("");
            if (iterations >= original.length) clearInterval(interval);
            iterations += 1 / 3;
          }, 30);
        });
      });

      // 14. Gradient mesh background that follows scroll
      const mesh = main.querySelector("[data-anim='mesh']");
      if (mesh) {
        gsap.to(mesh, {
          backgroundPosition: "100% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: mesh,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // 15. Counter momentum effect on stat numbers
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
              { val: 0 },
              { val: 0 },
              {
                val: target,
                duration: 2.5,
                ease: "power3.out",
                onUpdate: function () {
                  const v = Math.round(this.targets()[0].val);
                  stat.textContent = `${prefix}${v}${suffix}`;
                },
              }
            );
          },
        });
      });

      // 16. Expanding ring on CTA buttons
      const ctas = main.querySelectorAll("[data-ring]");
      ctas.forEach((cta) => {
        cta.addEventListener("click", (e: Event) => {
          const me = e as MouseEvent;
          const ring = document.createElement("span");
          const rect = cta.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          ring.style.cssText = `position:absolute;top:${me.clientY - rect.top - size/2}px;left:${me.clientX - rect.left - size/2}px;width:${size}px;height:${size}px;border-radius:50%;background:rgba(225,6,0,0.3);pointer-events:none;`;
          cta.appendChild(ring);
          gsap.to(ring, {
            scale: 3,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ring.remove(),
          });
        });
      });

      // 17. Inline SVG waves at section transitions
      const waveSections = main.querySelectorAll("[data-wave]");
      waveSections.forEach((section, i) => {
        const wave = document.createElement("div");
        wave.className = "pointer-events-none absolute bottom-0 left-0 right-0 h-16 overflow-hidden opacity-[0.03]";
        wave.innerHTML = `<svg viewBox="0 0 1440 64" preserveAspectRatio="none" style="width:100%;height:100%;"><path d="M0,32 Q360,0 720,32 T1440,32" fill="none" stroke="var(--color-signal)" stroke-width="2"><animate attributeName="d" values="M0,32 Q360,0 720,32 T1440,32;M0,32 Q360,64 720,32 T1440,32;M0,32 Q360,0 720,32 T1440,32" dur="${5+i*2}s" repeatCount="indefinite"/></path></svg>`;
        section.appendChild(wave);
      });

      // 18. Floating label effects on form inputs
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

      // 19. Scroll-reactive opacity on sticky elements
      const stickies = main.querySelectorAll("[data-fade-sticky]");
      stickies.forEach((sticky) => {
        gsap.fromTo(sticky,
          { opacity: 0.3 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: sticky,
              start: "top 30%",
              end: "top 0%",
              scrub: 1,
            },
          }
        );
      });

      // 20. Animated background gradient on hero-like sections
      const grads = main.querySelectorAll("[data-gradient-bg]");
      grads.forEach((grad) => {
        gsap.to(grad, {
          backgroundPosition: "100% 100%",
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // 21. Connection lines between related elements
      const connContainers = main.querySelectorAll("[data-connections]");
      connContainers.forEach((container) => {
        const items = container.querySelectorAll("[data-conn-item]");
        if (items.length < 2) return;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "pointer-events-none absolute inset-0 w-full h-full opacity-[0.04]");
        svg.style.cssText = "z-index:0;";
        container.appendChild(svg);
        for (let i = 0; i < items.length - 1; i++) {
          for (let j = i + 1; j < items.length; j++) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("stroke", "var(--color-signal)");
            line.setAttribute("stroke-width", "0.5");
            line.setAttribute("stroke-dasharray", "4 4");
            svg.appendChild(line);
            const updatePos = () => {
              const r1 = items[i].getBoundingClientRect();
              const r2 = items[j].getBoundingClientRect();
              const cr = container.getBoundingClientRect();
              line.setAttribute("x1", String(r1.left + r1.width / 2 - cr.left));
              line.setAttribute("y1", String(r1.top + r1.height / 2 - cr.top));
              line.setAttribute("x2", String(r2.left + r2.width / 2 - cr.left));
              line.setAttribute("y2", String(r2.top + r2.height / 2 - cr.top));
            };
            updatePos();
            window.addEventListener("resize", updatePos);
          }
        }
      });

      // 22. Split-flap style number animation on prices
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
                {
                  y: "0%", rotateX: 0,
                  duration: 0.6,
                  delay: i * 0.05,
                  ease: "back.out(1.7)",
                }
              );
            });
          },
        });
      });

      // 23. Rotating geometric shadow on hoverable sections
      const shadows = main.querySelectorAll("[data-shadow-rotate]");
      shadows.forEach((shadow) => {
        gsap.to(shadow, {
          boxShadow: "0 0 80px rgba(225,6,0,0.1)",
          scrollTrigger: { trigger: shadow, start: "top 80%", end: "bottom 20%", scrub: 2 },
          ease: "sine.inOut",
        });
      });

      // 24. Pulsing dot indicators
      const dots = main.querySelectorAll("[data-pulse-dot]");
      dots.forEach((dot) => {
        gsap.to(dot, {
          scale: 2,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: "power2.out",
        });
      });

      // 25. Infinite orbital rings around section headings
      const headings = main.querySelectorAll("h1, h2");
      headings.forEach((heading, i) => {
        if (i > 8) return;
        const ring = document.createElement("div");
        ring.className = "pointer-events-none absolute opacity-[0.03]";
        const rSize = 20 + (i % 5) * 15;
        ring.style.cssText = `width:${rSize}px;height:${rSize}px;border:1px solid var(--color-signal);border-radius:50%;top:-${rSize+10}px;left:${5+(i*13)%80}%;`;
        heading.parentElement?.appendChild(ring);
        gsap.to(ring, {
          rotation: 360,
          scale: 1.5 + (i % 3) * 0.3,
          opacity: 0.08,
          duration: 8 + i * 2,
          repeat: -1,
          ease: "none",
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, [pathname, prefersReduced]);

  return null;
}
