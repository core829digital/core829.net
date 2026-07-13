import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Core829's terms of service governing software development, design, consulting, and rentable web application services.",
};

export default function TermsPage() {
  return (
    <section className="pt-40 section-padding">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <h1 className="text-display text-4xl md:text-6xl tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm font-mono text-ink/40 tracking-wider">
            Last updated: July 2026
          </p>

          <div className="mt-12 text-ink/60 space-y-8 leading-relaxed">
            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using the Core829 website and services, you
                agree to be bound by these Terms of Service. If you do not agree
                with any part of these terms, you must not use our website or
                services.
              </p>
              <p className="mt-2">
                These terms apply to all visitors, users, clients, and any other
                person or entity accessing our services.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                2. About Core829
              </h2>
              <p>
                Core829 is a full-stack digital partner operating as a software
                house based in Italy, with remote teams working globally. We
                provide the following services:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>Custom web design and development</li>
                <li>Cross-platform mobile and desktop application development</li>
                <li>AI automation and workflow systems</li>
                <li>Custom CRM development</li>
                <li>Social media management</li>
                <li>Rentable web applications (SaaS-style monthly licensing)</li>
                <li>Technology consulting and advisory</li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                3. Service Agreements
              </h2>
              <p>
                Each project or engagement is governed by a separate service
                agreement, statement of work, or proposal that references these
                terms. The specific terms of each engagement — including scope,
                timeline, deliverables, and pricing — are defined in that
                agreement.
              </p>
              <p className="mt-2">
                In the event of a conflict between these Terms of Service and a
                signed service agreement, the signed service agreement shall
                prevail.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                4. Intellectual Property
              </h2>
              <p>
                <strong>Custom work:</strong> Upon full payment of all fees due
                under the relevant service agreement, Core829 assigns to the
                client all intellectual property rights in the custom code,
                designs, and deliverables produced specifically for that
                project. This excludes any underlying frameworks, libraries,
                tools, and methodologies that Core829 uses generally in its
                work, which remain Core829&rsquo;s intellectual property.
              </p>
              <p className="mt-2">
                <strong>Rentable web applications:</strong> Clients who license
                rentable web applications receive a right to use the application
                for the duration of their subscription. No ownership of the
                underlying code or intellectual property is transferred. Source
                code is not provided under the rental model unless otherwise
                agreed in writing.
              </p>
              <p className="mt-2">
                <strong>Core829 brand:</strong> Nothing in these terms grants
                you any right to use Core829&rsquo;s name, logo, or trademarks
                without prior written consent.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                5. Payment Terms
              </h2>
              <p>
                <strong>Project-based work:</strong> Payment terms are defined
                in the project proposal or service agreement. Typical terms
                include a deposit (30-50%) to begin work, with the balance due
                upon completion or milestone delivery. All amounts are in Euros
                (EUR) unless otherwise specified.
              </p>
              <p className="mt-2">
                <strong>Rentable web applications:</strong> Billed monthly in
                advance. Subscriptions may be cancelled at any time. If
                cancelled, you retain access to your data, which we export and
                deliver within 48 hours. No refunds are provided for partial
                months.
              </p>
              <p className="mt-2">
                <strong>Retainer agreements:</strong> Billed monthly based on
                the agreed retainer amount. Unused hours expire at the end of
                each billing period unless otherwise agreed in writing.
              </p>
              <p className="mt-2">
                <strong>Late payment:</strong> Invoices unpaid after 30 days
                from the invoice date may incur interest at the statutory rate
                under Italian law (D.Lgs. 231/2002). Core829 reserves the right
                to suspend work on projects with outstanding invoices exceeding
                30 days past due.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                6. Client Responsibilities
              </h2>
              <p>As a client of Core829, you agree to:</p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  Provide accurate, complete, and timely information necessary
                  for the execution of the project
                </li>
                <li>
                  Review and approve deliverables within the agreed review
                  periods — delays in feedback may affect timelines
                </li>
                <li>
                  Ensure you have the authority to enter into the agreement and
                  that your content and materials do not infringe on any
                  third-party rights
                </li>
                <li>
                  Provide access to systems, APIs, and third-party accounts as
                  reasonably necessary for the project
                </li>
                <li>
                  Not use our services for any unlawful purpose or in violation
                  of any applicable laws
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                7. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, Core829&rsquo;s
                total liability arising out of or related to these terms or the
                services provided shall not exceed the total amount paid by the
                client to Core829 for the specific service giving rise to the
                claim during the 12-month period preceding the event giving rise
                to the liability.
              </p>
              <p className="mt-2">
                In no event shall Core829 be liable for:
              </p>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Any indirect, incidental, special, or consequential damages</li>
                <li>Loss of profits, revenue, data, or business opportunities</li>
                <li>
                  Service interruptions caused by third-party infrastructure
                  (hosting providers, cloud services, etc.)
                </li>
                <li>
                  Any damages arising from the use or inability to use
                  deliverables created for the client
                </li>
              </ul>
              <p className="mt-2">
                This limitation does not apply in cases of fraud, gross
                negligence, wilful misconduct, or death or personal injury
                caused by negligence.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                8. Warranties
              </h2>
              <p>
                Core829 warrants that services will be performed in a
                professional and workmanlike manner in accordance with industry
                standards. For custom development projects, we warrant that the
                delivered code will substantially conform to the agreed
                specification for a period of 90 days following final delivery
                (&ldquo;warranty period&rdquo;).
              </p>
              <p className="mt-2">
                During the warranty period, Core829 will correct any material
                non-conformities at no additional cost. This warranty does not
                cover modifications made by the client or third parties, or
                issues arising from changes to third-party platforms or
                dependencies outside our control.
              </p>
              <p className="mt-2">
                Except as expressly stated in this section, all services and
                deliverables are provided &ldquo;as is&rdquo; without any
                warranties, express or implied, including but not limited to
                implied warranties of merchantability or fitness for a particular
                purpose.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                9. Termination
              </h2>
              <p>
                <strong>By either party:</strong> The service agreement may be
                terminated by either party in accordance with the terms defined
                in the applicable service agreement. In the absence of specific
                termination terms:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  Either party may terminate the agreement by providing 30 days&rsquo;
                  written notice.
                </li>
                <li>
                  Core829 may terminate immediately if the client fails to pay
                  amounts due within 30 days after receiving a written notice of
                  non-payment.
                </li>
                <li>
                  Either party may terminate immediately if the other party
                  commits a material breach that remains uncured for 30 days
                  after written notice.
                </li>
              </ul>
              <p className="mt-2">
                Upon termination, the client shall pay for all work completed up
                to the date of termination. Core829 will deliver all work
                products completed as of the termination date upon receipt of
                payment.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                10. Confidentiality
              </h2>
              <p>
                Both parties agree to maintain the confidentiality of all
                proprietary information disclosed during the course of the
                engagement. Confidential information includes business plans,
                technical specifications, source code, financial data, and any
                other information marked as confidential or that a reasonable
                person would understand to be confidential.
              </p>
              <p className="mt-2">
                This obligation survives termination of the agreement for a
                period of five (5) years.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                11. Governing Law
              </h2>
              <p>
                These terms and any service agreements referencing them shall be
                governed by and construed in accordance with the laws of the
                Republic of Italy, without regard to its conflict of law
                provisions.
              </p>
              <p className="mt-2">
                The courts of Bologna, Italy, shall have exclusive jurisdiction
                over any disputes arising from these terms or the services
                provided, unless the parties agree in writing to arbitration.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                12. Dispute Resolution
              </h2>
              <p>
                Before initiating any legal proceedings, the parties agree to
                attempt to resolve any dispute through good-faith negotiations.
                If the dispute cannot be resolved within 30 days, the parties
                agree to attempt mediation through a mutually agreed mediator
                before pursuing litigation.
              </p>
              <p className="mt-2">
                Nothing in this section prevents either party from seeking
                injunctive relief to protect its intellectual property rights or
                confidential information.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                13. Website Use
              </h2>
              <p>
                The Core829 website is provided for informational purposes and
                as a gateway to our services. You agree not to:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>Use the website in any way that violates applicable laws</li>
                <li>
                  Attempt to gain unauthorised access to any part of the website
                  or our systems
                </li>
                <li>Use any automated means to access or scrape the website</li>
                <li>
                  Interfere with the proper functioning of the website or our
                  infrastructure
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                14. Changes to These Terms
              </h2>
              <p>
                We reserve the right to modify these Terms of Service at any
                time. Changes will be posted on this page with an updated
                &ldquo;Last updated&rdquo; date. Continued use of our services
                after any changes constitutes acceptance of the new terms. For
                material changes, we will notify clients directly via email.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                15. Contact Information
              </h2>
              <div className="bg-graphite border border-mist rounded-2xl p-6 space-y-2">
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
                  <strong>Company:</strong> Core829
                </p>
                <p>
                  <strong>Jurisdiction:</strong> Bologna, Italy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
