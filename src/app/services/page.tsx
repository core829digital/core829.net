import type { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Seven capabilities. One partner. From custom web development and mobile apps to CRM creation and rentable tools.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
