export function SectionDivider({ variant = "wave" }: { variant?: "wave" | "dot" | "line" | "fade" }) {
  if (variant === "wave") {
    return (
      <div className="relative h-16 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 w-[200%] h-full left-[-50%]" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path
            d="M0,32 Q180,0 360,32 T720,32 T1080,32 T1440,32"
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth="0.5"
            opacity="0.06"
          >
            <animate attributeName="d"
              values="M0,32 Q180,0 360,32 T720,32 T1080,32 T1440,32;M0,32 Q180,64 360,32 T720,32 T1080,32 T1440,32;M0,32 Q180,0 360,32 T720,32 T1080,32 T1440,32"
              dur="6s" repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    );
  }
  if (variant === "dot") {
    return (
      <div className="flex items-center justify-center gap-2 py-8 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full bg-ink/10"
            style={{ animation: `pulse-slow ${1.5 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    );
  }
  if (variant === "line") {
    return (
      <div className="relative py-10 pointer-events-none">
        <div className="w-px h-16 mx-auto bg-gradient-to-b from-signal/0 via-signal/10 to-signal/0" />
      </div>
    );
  }
  return <div className="h-8 md:h-12" />;
}
