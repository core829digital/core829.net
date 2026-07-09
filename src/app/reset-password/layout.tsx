import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your Core829 account password.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
