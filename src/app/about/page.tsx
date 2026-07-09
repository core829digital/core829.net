import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "Core829 is a lean, senior-operators software house. Direct access to the person building your software.",
};

export default function AboutPage() {
  return <AboutContent />;
}
