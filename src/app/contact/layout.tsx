import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Core829. Start a project, ask a question, or say hello.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
