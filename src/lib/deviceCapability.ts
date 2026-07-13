export type Tier = "low" | "mid" | "high";

export function getDeviceTier(): Tier {
  if (typeof window === "undefined") return "high";

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;

  if (mem !== undefined && cores !== undefined) {
    if (mem <= 2 || cores <= 2) return "low";
    if (mem <= 4 || cores <= 4) return "mid";
    return "high";
  }

  if (cores !== undefined) {
    if (cores <= 2) return "low";
    if (cores <= 4) return "mid";
    return "high";
  }

  const isMobile = /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent);
  if (isMobile) return "mid";

  return "high";
}

export function isLowEndDevice(): boolean {
  return getDeviceTier() === "low";
}

export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function shouldSimplifyAnimations(): boolean {
  return isLowEndDevice() || shouldReduceMotion();
}
