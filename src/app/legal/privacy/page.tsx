import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="pt-40 section-padding">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <h1 className="text-display text-4xl md:text-6xl tracking-tight">Privacy Policy</h1>
          <div className="mt-12 prose prose-sm max-w-none text-ink/60 space-y-6">
            <p>
              This privacy policy outlines how Core829 collects, uses, and protects your personal
              data. This is a placeholder and should be reviewed by legal counsel before going live.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Data Collection</h2>
            <p>
              We collect information you provide directly: name, email, company, and project details
              when you submit our contact form or create an account.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Data Usage</h2>
            <p>
              Your data is used to respond to inquiries, provide services, send project updates, and
              improve our offerings. We never sell your data to third parties.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Data Storage</h2>
            <p>
              Data is stored securely in EU-based servers. We use industry-standard encryption for
              data in transit and at rest.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Contact</h2>
            <p>
              For privacy-related inquiries, contact us at hello@core829.net.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
