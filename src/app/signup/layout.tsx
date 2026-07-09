import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Core829 account to manage projects and quotes.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
