"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "outline";
  className?: string;
  strength?: number;
  radius?: number;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  strength = 0.4,
  radius = 80,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const moveX = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
    const moveY = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.hypot(relX, relY);

      if (dist < radius) {
        moveX(relX * strength);
        moveY(relY * strength);
        el.style.setProperty("--magnetic-scale", "1");
      } else {
        moveX(0);
        moveY(0);
      }
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "back.out(1.4)" });
    };

    window.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, radius]);

  const baseStyles =
    "relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-widest uppercase transition-colors cursor-pointer overflow-hidden rounded-full";

  const variantStyles = {
    primary: "bg-signal text-ink hover:bg-signal-dim",
    ghost: "text-ink border border-mist hover:bg-white/5",
    outline: "text-ink border border-ink hover:bg-white/5 hover:text-signal",
  };

  const content = (
    <div ref={ref} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <span
        ref={labelRef}
        className="relative z-10 inline-block"
        style={{ letterSpacing: "0.1em" }}
        onMouseEnter={() => {
          gsap.to(labelRef.current, { letterSpacing: "0.12em", duration: 0.3, ease: "power2.out" });
        }}
        onMouseLeave={() => {
          gsap.to(labelRef.current, { letterSpacing: "0.1em", duration: 0.3, ease: "power2.out" });
        }}
      >
        {children}
      </span>
      <div
        className="absolute inset-0 bg-signal/5 rounded-full pointer-events-none"
        style={{ transform: "scale(0)", opacity: 0 }}
      />
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return <a href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{content}</a>;
  }
  return <button type="button" onClick={onClick} className="p-0 bg-none border-none cursor-pointer">{content}</button>;
}


