"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
import { useToast } from "@/components/ui/Toast";

export default function QuotesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const token = getSessionToken();
  const session = useQuery(api.auth.validateSession, token ? { token } : "skip");
  const quotes = useQuery(api.quotes.list, token ? { token } : "skip") ?? [];

  if (session === undefined) {
    return (
      <div className="flex items-center justify-center py-40">
        <p className="text-ink/60 font-mono text-sm">Loading...</p>
      </div>
    );
  }
  if (session === null) {
    router.push("/login?redirect=/dashboard/quotes");
    return null;
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-12">
        <div>
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Dashboard</span>
          <h1 className="text-display text-3xl md:text-5xl tracking-tight mt-2">
            My Quotes
          </h1>
        </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-5 py-2.5 border border-mist text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-white/5 transition-colors"
          >
            Back to dashboard
          </Link>
        </div>

        {quotes.length === 0 ? (
          <div className="bg-graphite rounded-2xl border border-mist p-12 text-center">
            <p className="text-ink/60 font-mono text-sm">No quotes yet.</p>
            <p className="text-ink/40 text-sm mt-2">
              Quotes will appear here after you request a project.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.map((quote) => (
              <Link
                key={quote._id}
                href={`/dashboard/quotes/${quote._id}`}
                className="bg-graphite rounded-2xl border border-mist p-6 hover:border-white/20 transition-colors block"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-display text-xl tracking-tight">{quote.title}</h3>
                  <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full ${
                    quote.status === "draft" ? "bg-yellow-500/10 text-yellow-400" :
                    quote.status === "sent" ? "bg-blue-500/10 text-blue-400" :
                    quote.status === "accepted" ? "bg-green-500/10 text-green-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>
                    {quote.status === "draft" ? "Draft" :
                     quote.status === "sent" ? "Sent" :
                     quote.status === "accepted" ? "Accepted" : "Declined"}
                  </span>
                </div>
                {quote.description && (
                  <p className="text-ink/60 text-sm mb-4 line-clamp-2">{quote.description}</p>
                )}
                {quote.amount && (
                  <p className="text-display text-2xl tracking-tight text-signal">
                    {quote.currency === "EUR" ? "€" : "$"}{quote.amount.toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-ink/40 mt-3">
                  {new Date(quote.createdAt).toLocaleDateString("it-IT")}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
  );
}
