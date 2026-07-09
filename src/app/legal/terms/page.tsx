import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <section className="pt-40 section-padding">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <h1 className="text-display text-4xl md:text-6xl tracking-tight">Terms of Service</h1>
          <div className="mt-12 text-ink/60 space-y-6">
            <p>
              These terms govern your use of Core829&apos;s services. This is a placeholder and
              should be reviewed by legal counsel before going live.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Services</h2>
            <p>
              Core829 provides software development, design, consulting, and rentable web application
              services as described in the project scope or service agreement.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Intellectual Property</h2>
            <p>
              Upon full payment, you own all custom code, designs, and deliverables produced
              specifically for your project. Core829 retains the right to use generic methodologies
              and tooling.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Payment Terms</h2>
            <p>
              Payment terms are defined per project agreement. Rentable apps are billed monthly and
              may be cancelled at any time.
            </p>
            <h2 className="text-ink text-xl font-display mt-8">Limitation of Liability</h2>
            <p>
              Core829&apos;s liability is limited to the amount paid for the specific service giving rise
              to the claim.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
