import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Core829's GDPR-compliant privacy policy. Learn how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
  return (
    <section className="pt-40 section-padding">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <h1 className="text-display text-4xl md:text-6xl tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm font-mono text-ink/40 tracking-wider">
            Last updated: July 2026
          </p>

          <div className="mt-12 text-ink/60 space-y-8 leading-relaxed">
            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                1. Who We Are
              </h2>
              <p>
                Core829 is a software house based in Italy, operating globally
                via distributed remote teams. We provide full-stack digital
                services including web development, mobile and desktop
                applications, AI automation, CRM systems, and social media
                management.
              </p>
              <p className="mt-2">
                Our registered email address is{" "}
                <a
                  href="mailto:hello@core829.net"
                  className="text-signal hover:underline"
                >
                  hello@core829.net
                </a>
                . For the purposes of the General Data Protection Regulation
                (GDPR) (EU Regulation 2016/679), Core829 acts as the data
                controller for the personal data you provide to us.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                2. What Data We Collect
              </h2>
              <p>
                We collect only the personal data that you voluntarily provide
                to us. Depending on your interaction with our site and
                services, this may include:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>Full name</li>
                <li>Email address</li>
                <li>Company name and role</li>
                <li>Phone number (if provided)</li>
                <li>
                  Project details, requirements, and any information you share
                  during the scoping or discovery process
                </li>
                <li>
                  Account credentials (hashed and salted passwords) if you
                  register on our platform
                </li>
                <li>Communication history including emails and messages</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                3. How We Collect Your Data
              </h2>
              <p>We collect personal data through the following means:</p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  <strong>Contact form:</strong> When you fill out the contact
                  form on our website, we collect your name, email, company, and
                  message.
                </li>
                <li>
                  <strong>Account registration:</strong> When you create an
                  account, we collect your name, email, and any profile
                  information you add.
                </li>
                <li>
                  <strong>Cookies:</strong> We use strictly necessary session
                  cookies for authentication and site functionality. These
                  cookies do not track you across websites. See our{" "}
                  <a
                    href="/legal/cookies"
                    className="text-signal hover:underline"
                  >
                    Cookie Policy
                  </a>{" "}
                  for details.
                </li>
                <li>
                  <strong>Direct communication:</strong> When you email us or
                  communicate via other channels, we retain the content of those
                  communications.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                4. Legal Basis for Processing
              </h2>
              <p>
                Under the GDPR, we process your personal data on the following
                legal bases:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  <strong>Consent (Article 6(1)(a)):</strong> When you
                  explicitly consent to us processing your data for a specific
                  purpose, such as subscribing to communications.
                </li>
                <li>
                  <strong>Contract performance (Article 6(1)(b)):</strong> When
                  processing is necessary to fulfil a contract with you, such as
                  delivering software development services or managing your
                  rental app subscription.
                </li>
                <li>
                  <strong>Legitimate interest (Article 6(1)(f)):</strong> When
                  processing is necessary for our legitimate business interests,
                  such as improving our services, responding to inquiries, and
                  maintaining the security of our platform — provided your
                  rights and interests do not override those interests.
                </li>
                <li>
                  <strong>Legal obligation (Article 6(1)(c)):</strong> When we
                  are required to process data to comply with applicable laws
                  and regulations.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                5. How We Use Your Data
              </h2>
              <p>We use your personal data for the following purposes:</p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  To respond to inquiries submitted through our contact form
                </li>
                <li>To provide, maintain, and improve our services</li>
                <li>
                  To manage accounts, subscriptions, and rental app access
                </li>
                <li>To communicate project updates, invoices, and support</li>
                <li>
                  To detect, prevent, and address technical issues and security
                  threats
                </li>
                <li>
                  To comply with legal obligations and enforce our terms of
                  service
                </li>
              </ul>
              <p className="mt-2">
                We do <strong>not</strong> use your data for automated
                decision-making or profiling that produces legal effects
                concerning you.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                6. Data Retention
              </h2>
              <p>
                We retain your personal data only as long as necessary to fulfil
                the purposes for which it was collected:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  <strong>Contact form inquiries:</strong> Retained for the
                  duration of the inquiry process plus 12 months after the last
                  communication.
                </li>
                <li>
                  <strong>Account data:</strong> Retained for the duration of
                  your account plus 12 months after account deletion or
                  termination, to the extent necessary for legal or
                  administrative purposes.
                </li>
                <li>
                  <strong>Project data:</strong> Retained for the duration of
                  the project engagement plus 36 months for warranty and
                  post-delivery support obligations.
                </li>
                <li>
                  <strong>Invoicing and financial records:</strong> Retained for
                  10 years as required by Italian tax and accounting laws.
                </li>
                <li>
                  <strong>Session cookies:</strong> Deleted when you close your
                  browser session.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                7. Your Rights Under GDPR
              </h2>
              <p>
                As a data subject under the GDPR, you have the following rights
                regarding your personal data:
              </p>
              <ul className="mt-3 space-y-3">
                <li>
                  <strong>Right of access (Article 15):</strong> You may request
                  confirmation of whether we process your data and, if so,
                  access to that data along with information about the
                  processing.
                </li>
                <li>
                  <strong>Right to rectification (Article 16):</strong> You may
                  request correction of inaccurate or incomplete data.
                </li>
                <li>
                  <strong>Right to erasure (&ldquo;right to be
                  forgotten&rdquo;, Article 17):</strong> You may request
                  deletion of your personal data when it is no longer necessary
                  for the purposes for which it was collected, subject to legal
                  retention obligations.
                </li>
                <li>
                  <strong>Right to restriction of processing (Article
                  18):</strong> You may request restriction of processing under
                  certain circumstances, such as when you contest the accuracy
                  of the data.
                </li>
                <li>
                  <strong>Right to data portability (Article 20):</strong> You
                  may request a copy of your data in a structured,
                  machine-readable format and have the right to transmit that
                  data to another controller.
                </li>
                <li>
                  <strong>Right to object (Article 21):</strong> You may object
                  to processing based on legitimate interest, including
                  direct marketing.
                </li>
                <li>
                  <strong>Rights related to automated decision-making (Article
                  22):</strong> You have the right not to be subject to a
                  decision based solely on automated processing that produces
                  legal effects. We do not engage in such processing.
                </li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at{" "}
                <a
                  href="mailto:hello@core829.net"
                  className="text-signal hover:underline"
                >
                  hello@core829.net
                </a>
                . We will respond within 30 days as required by the GDPR. You
                also have the right to lodge a complaint with your local data
                protection authority or with the Italian Data Protection
                Authority (Garante per la protezione dei dati personali).
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                8. Data Sharing and Third Parties
              </h2>
              <p>
                We do <strong>not</strong> sell, rent, or trade your personal
                data to third parties for any purpose.
              </p>
              <p className="mt-2">
                We share data only with trusted service providers that are
                strictly necessary to deliver our services:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  <strong>Convex:</strong> We use Convex as our application
                  database and backend provider. Data is stored on EU-based
                  servers. Convex is SOC 2 compliant and acts as a data
                  processor under our instruction.
                </li>
                <li>
                  <strong>Resend:</strong> We use Resend for transactional
                  emails (account notifications, project updates). Resend
                  processes email addresses solely for the purpose of delivering
                  emails on our behalf.
                </li>
              </ul>
              <p className="mt-2">
                We ensure all third-party processors are contractually bound to
                process data only in accordance with our instructions and
                applicable data protection law.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                9. International Data Transfers
              </h2>
              <p>
                Core829 is based in Italy. Our primary data storage and
                processing infrastructure is located within the European
                Economic Area (EEA). We do not routinely transfer personal data
                outside the EEA. Where a transfer is necessary, we ensure
                appropriate safeguards are in place, including Standard
                Contractual Clauses (SCCs) as approved by the European
                Commission.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                10. Data Security
              </h2>
              <p>
                We implement appropriate technical and organisational measures to
                protect your personal data against unauthorised access,
                alteration, disclosure, or destruction. These include:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>Encryption of data in transit (TLS 1.3)</li>
                <li>Encryption of data at rest</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>
                  Pseudonymisation and anonymisation where appropriate
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                11. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. When we do,
                we will revise the &ldquo;Last updated&rdquo; date at the top of
                this page. In the case of material changes, we will notify you
                via email or through a notice on our website.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                12. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this
                privacy policy or our data practices, please contact us:
              </p>
              <div className="mt-3 bg-graphite border border-mist rounded-2xl p-6 space-y-2">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@core829.net"
                    className="text-signal hover:underline"
                  >
                    hello@core829.net
                  </a>
                </p>
                <p>
                  <strong>Data Controller:</strong> Core829
                </p>
                <p>
                  <strong>Jurisdiction:</strong> Italy (European Union)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
