import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Three ways to work with Core829: project builds for defined scope, monthly retainer for ongoing development, and rentable apps for instant capability.",
};

export default function PricingPage() {
  return <PricingContent />;
}
