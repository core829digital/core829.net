import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Core829's cookie policy. We use only strictly necessary session cookies — no tracking, no analytics cookies.",
};

export default function CookiesPage() {
  return (
    <section className="pt-40 section-padding">
      <div className="grid-12">
        <div className="col-span-12 md:col-span-8 md:col-start-3">
          <h1 className="text-display text-4xl md:text-6xl tracking-tight">
            Cookie Policy
          </h1>
          <p className="mt-4 text-sm font-mono text-ink/40 tracking-wider">
            Last updated: July 2026
          </p>

          <div className="mt-12 text-ink/60 space-y-8 leading-relaxed">
            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                1. What Are Cookies
              </h2>
              <p>
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile) when you visit a website. They are
                widely used to make websites work more efficiently, provide a
                better user experience, and give information to website owners.
              </p>
              <p className="mt-2">
                Cookies can be &ldquo;session&rdquo; cookies (which are deleted
                when you close your browser) or &ldquo;persistent&rdquo; cookies
                (which remain on your device for a set period or until you
                delete them).
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                2. How We Use Cookies
              </h2>
              <p>
                At Core829, we take a minimal approach to cookies. We use only{" "}
                <strong>strictly necessary</strong> cookies that are essential
                for the basic functioning of our website and services.
              </p>
              <p className="mt-2">
                We do <strong>not</strong> use any tracking, analytics,
                advertising, or third-party marketing cookies. We believe in
                respecting your privacy by default.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                3. Types of Cookies We Use
              </h2>
              <div className="bg-graphite border border-mist rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-mist">
                      <th className="text-left p-4 text-ink font-display">
                        Cookie Type
                      </th>
                      <th className="text-left p-4 text-ink font-display">
                        Purpose
                      </th>
                      <th className="text-left p-4 text-ink font-display">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-mist">
                      <td className="p-4 font-mono text-xs">session_id</td>
                      <td className="p-4">
                        Authentication and session management — keeps you logged
                        in as you navigate the site
                      </td>
                      <td className="p-4">Session (deleted on browser close)</td>
                    </tr>
                    <tr className="border-b border-mist">
                      <td className="p-4 font-mono text-xs">
                        auth_token
                      </td>
                      <td className="p-4">
                        Secure authentication token for registered users
                      </td>
                      <td className="p-4">Session</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">
                        cookie_consent
                      </td>
                      <td className="p-4">
                        Remembers that you have accepted our cookie policy so we
                        do not show the banner again
                      </td>
                      <td className="p-4">Persistent (1 year)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                4. Legal Basis
              </h2>
              <p>
                Under the GDPR and the Italian Data Protection Code (D.Lgs.
                196/2003 as amended), strictly necessary cookies do not require
                your prior consent because they are essential for the operation
                of the website. However, we believe in transparency and
                provide this policy to inform you of what cookies we use and
                why.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                5. Third-Party Cookies
              </h2>
              <p>
                The following third-party services we use may set their own
                cookies as part of their core functionality:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  <strong>Convex (backend/database):</strong> Our application
                  backend uses session-based authentication that may set
                  essential cookies for maintaining your authenticated state.
                  Convex is SOC 2 compliant and processes data within the EEA.
                </li>
                <li>
                  <strong>Resend (email delivery):</strong> Resend may use
                  cookies for their email delivery service. These are strictly
                  necessary for transactional email functionality.
                </li>
              </ul>
              <p className="mt-2">
                If you have enabled analytics cookies via our cookie banner, we
                may use{" "}
                <strong>Google Analytics 4</strong> to collect anonymized usage
                data (page views, session duration, referrer). This is optional
                and only activated with your explicit consent. GA4 uses its own
                cookies (e.g.,{" "}
                <span className="font-mono text-xs">_ga</span>,{" "}
                <span className="font-mono text-xs">_gid</span>) to
                distinguish users. You can withdraw consent at any time by
                clearing your browser cookies.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                6. How to Control Cookies
              </h2>
              <p>
                Most web browsers allow you to control cookies through their
                settings. You can:
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1">
                <li>
                  Block all cookies (including strictly necessary ones —
                  this may break site functionality)
                </li>
                <li>Delete existing cookies from your browser</li>
                <li>
                  Set your browser to notify you when a cookie is being set
                </li>
              </ul>
              <p className="mt-2">
                Please note that blocking strictly necessary cookies may prevent
                certain parts of our website from functioning properly,
                particularly account authentication and session management.
              </p>
              <p className="mt-2">
                To learn how to manage cookies in your browser, visit:
              </p>
              <ul className="mt-1 list-disc list-inside space-y-1 text-sm">
                <li>
                  <a
                    href="https://support.google.com/chrome/answer/95647"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-signal hover:underline"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-signal hover:underline"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.apple.com/en-us/HT201265"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-signal hover:underline"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a
                    href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-signal hover:underline"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this cookie policy from time to time. Any changes
                will be posted on this page with an updated &ldquo;Last
                updated&rdquo; date. If we start using additional cookies, we
                will update this policy and, where required by law, seek your
                consent.
              </p>
            </div>

            <div>
              <h2 className="text-ink text-xl font-display mb-3">
                8. Contact Us
              </h2>
              <p>
                If you have any questions about our use of cookies, please
                contact us:
              </p>
              <div className="mt-3 bg-graphite border border-mist rounded-2xl p-6">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:hello@core829.net"
                    className="text-signal hover:underline"
                  >
                    hello@core829.net
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
