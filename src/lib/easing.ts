import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export function registerEasing() {
  if (typeof window === "undefined") return;
  if ("deviceMemory" in navigator && (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 2) return;
  CustomEase.create("core829Reveal", "M0,0 C0.16,1 0.3,1 1,1");
}
