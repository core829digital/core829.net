import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Log in to your Core829 dashboard.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
