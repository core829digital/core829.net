export const colors = {
  ink: "#FAFAFA",
  paper: "#0A0A0A",
  signal: "#E10600",
  "signal-dim": "#B80500",
  graphite: "#1A1A1A",
  mist: "#2A2A2A",
  ghost: "rgba(250, 250, 250, 0.04)",
} as const;

export const fonts = {
  display: "'Geist Display', 'Inter', system-ui, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Geist Mono', monospace",
} as const;

export const spacing = {
  sectionPadding: "100px",
  sectionPaddingMobile: "72px",
  gridGap: "24px",
  gridGapMobile: "16px",
  gridPadding: "24px",
  gridPaddingMobile: "16px",
  maxWidth: "1440px",
} as const;

export const easing = {
  reveal: "M0,0 C0.16,1 0.3,1 1,1",
  fast: "power2.out",
  smooth: "power3.out",
  elastic: "elastic.out(1, 0.4)",
} as const;
