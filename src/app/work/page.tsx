import type { Metadata } from "next";
import WorkClient from "./WorkClient";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and projects from Core829.",
};

export default function WorkPage() {
  return <WorkClient />;
}
