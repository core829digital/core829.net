import type { Metadata } from "next";
import WorkWithUsClient from "./WorkWithUsClient";

export const metadata: Metadata = {
  title: "Work With Us",
  description: "Join Core829 — we're always looking for talented developers, designers, and operators.",
};

export default function WorkWithUsPage() {
  return <WorkWithUsClient />;
}
