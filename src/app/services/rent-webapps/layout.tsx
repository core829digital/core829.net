import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent-a-WebApp",
  description: "Pre-built software tools licensed monthly. No development wait, no technical overhead.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
