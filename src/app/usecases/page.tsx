import type { Metadata } from "next";
import UseCasesClient from "./UseCasesClient";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "See how Core829's services apply across different industries and business types.",
};

export default function UseCasesPage() {
  return <UseCasesClient />;
}
