"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  tiltAmount?: number;
  glare?: boolean;
  onClick?: () => void;
}

export function InteractiveCard({
  children,
  className = "",
  tiltAmount = 10,
  glare = true,
  onClick,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltAmount;
    const rotateY = ((x - centerX) / centerX) * tiltAmount;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0.12,
        background: `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(250,250,250,0.3), transparent 60%)`,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
    });

    if (glare && glareRef.current) {
      gsap.to(glareRef.current, {
        opacity: 0,
        duration: 0.4,
      });
    }
  };

  return (
    <div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") onClick(); } : undefined}
      className={`relative overflow-hidden rounded-2xl [transform-style:preserve-3d] ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ willChange: prefersReduced ? "auto" : "transform" }}
    >
      {glare && !prefersReduced && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10 opacity-0"
          style={{ borderRadius: "inherit" }}
        />
      )}
      <div className="relative z-0 [transform:translateZ(20px)]">
        {children}
      </div>
    </div>
  );
}
