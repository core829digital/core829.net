import type { Metadata } from "next";
import { ProcessContent } from "./ProcessContent";

export const metadata: Metadata = {
  title: "The 829 Method",
  description: "How Core829 builds software — from intake to ongoing support.",
};

export default function ProcessPage() {
  return <ProcessContent />;
}
