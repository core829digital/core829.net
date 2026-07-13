import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { CookieBanner } from "@/components/ui/CookieBanner";
import { Analytics } from "@/components/ui/Analytics";
import { AnimationEnhancer } from "@/components/motion/AnimationEnhancer";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import { Providers } from "@/components/ui/Providers";
import { Atmosphere } from "@/components/ui/Atmosphere";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Core829 — Build it. Rent it. Run it.",
    template: "%s | Core829",
  },
  description:
    "A software house that runs the entire digital stack: web, native software, product engineering, growth infrastructure, and rentable web applications.",
  openGraph: {
    title: "Core829 — Software House",
    description:
      "Build it. Rent it. Run it. Full-stack digital partner for businesses that need software that actually works.",
    url: "https://core829.net",
    siteName: "Core829",
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://core829.net"),
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "Core829 — Build it. Rent it. Run it.",
    description:
      "Build it. Rent it. Run it. Full-stack digital partner for businesses that need software that actually works.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  manifest: "/manifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Core829",
              url: "https://core829.net",
              description:
                "A software house that runs the entire digital stack: web, native software, product engineering, growth infrastructure, and rentable web applications.",
              email: "hello@core829.net",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:px-4 focus:py-2 focus:bg-signal focus:text-ink focus:text-sm focus:rounded-full focus:outline-none"
        >
          Skip to content
        </a>
        <Providers>
          <ToastProvider>
            <ScrollProgressBar />
            <Atmosphere />
            <AnimationEnhancer />
            <Analytics />
            <Navigation />
            <main id="main-content" className="flex-1">{children}</main>
            <CookieBanner />
            <Footer />
          </ToastProvider>
        </Providers>
      </body>
    </html>
  );
}

