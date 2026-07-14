"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useConvex, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { getSessionToken } from "@/lib/cookie";
import { useToast } from "@/components/ui/Toast";

export default function QuoteDetailPage() {
  const convex = useConvex();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const token = getSessionToken();
  const session = useQuery(api.auth.validateSession, token ? { token } : "skip");
  const user = useQuery(
    api.profile.getProfile,
    token && session ? { token, userId: session.userId } : "skip"
  );
  const quoteId = params.id as Id<"quotes">;
  const quote = useQuery(
    api.quotes.get,
    token && quoteId ? { quoteId, token } : "skip"
  );
  const userProjects = useQuery(
    api.projects.getByUser,
    token && session ? { userId: session.userId, token } : "skip"
  ) ?? [];
  const hasMultipleProjects = userProjects.length > 1;
  const project = userProjects.length === 1 ? userProjects[0] : null;
  const messages = useQuery(
    api.messages.list,
    token && project ? { projectId: project._id, token } : "skip"
  ) ?? [];
  const docs = useQuery(
    api.documents.list,
    token && project ? { projectId: project._id, token } : "skip"
  ) ?? [];

  const [msgText, setMsgText] = useState("");
  const [sending, setSending] = useState(false);
  const [acting, setActing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (session === undefined || quote === undefined) {
    return (
      <div className="pt-40 min-h-dvh bg-paper text-ink animate-pulse">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="h-3 w-24 bg-white/5 rounded-full mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8">
                <div className="h-8 w-64 bg-white/10 rounded-lg mb-3" />
                <div className="h-12 w-40 bg-white/10 rounded-lg mb-4" />
                <div className="h-4 w-32 bg-white/5 rounded-full" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8 sticky top-32">
                <div className="h-4 w-24 bg-white/5 rounded-full mb-3" />
                <div className="h-6 w-32 bg-white/10 rounded-lg mb-4" />
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 w-full bg-white/5 rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (session === null) {
    router.push("/login?redirect=/dashboard/quotes/" + quoteId);
    return null;
  }
  if (quote === null) {
    return (
      <div className="pt-40 min-h-dvh bg-paper text-ink">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-ink/60">Preventivo non trovato.</p>
          <Link href="/dashboard/quotes" className="text-signal text-sm mt-4 inline-block">
            &larr; Torna ai preventivi
          </Link>
        </div>
      </div>
    );
  }

  const handleSend = async () => {
    if (!msgText.trim() || !user || !project) return;
    setSending(true);
    try {
      const token = getSessionToken();
      if (!token) return;
      await convex.mutation(api.messages.send, {
        projectId: project._id,
        senderId: user._id,
        senderRole: "client",
        content: msgText.trim(),
        token,
      });
      setMsgText("");
    } catch {
      toast("Failed to send message", "error");
    } finally {
      setSending(false);
    }
  };

  const handleAcceptQuote = async () => {
    if (acting) return;
    setActing(true);
    try {
      const token = getSessionToken();
      if (!token) return;
      await convex.mutation(api.quotes.updateStatus, {
        quoteId: quote._id,
        status: "accepted",
        token,
      });
    } catch {
      toast("Failed to accept quote", "error");
    } finally {
      setActing(false);
    }
  };

  const handleRejectQuote = async () => {
    if (acting) return;
    setActing(true);
    try {
      const token = getSessionToken();
      if (!token) return;
      await convex.mutation(api.quotes.updateStatus, {
        quoteId: quote._id,
        status: "rejected",
        token,
      });
    } catch {
      toast("Failed to reject quote", "error");
    } finally {
      setActing(false);
    }
  };

  const statusLabel: Record<string, string> = {
    draft: "Bozza",
    sent: "Inviato",
    accepted: "Accettato",
    rejected: "Rifiutato",
  };

  return (
    <div className="pt-40 min-h-dvh bg-paper text-ink">
      <div className="max-w-[1440px] mx-auto px-6">
        <Link
          href="/dashboard/quotes"
          className="text-signal text-xs font-mono uppercase tracking-wider hover:opacity-80"
        >
          &larr; Torna ai preventivi
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-display text-2xl md:text-4xl tracking-tight">{quote.title}</h1>
                  {quote.description && (
                    <p className="text-ink/60 mt-3">{quote.description}</p>
                  )}
                </div>
                <span className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full shrink-0 ${
                  quote.status === "draft" ? "bg-yellow-500/10 text-yellow-400" :
                  quote.status === "sent" ? "bg-blue-500/10 text-blue-400" :
                  quote.status === "accepted" ? "bg-green-500/10 text-green-400" :
                  "bg-red-500/10 text-red-400"
                }`}>
                  {statusLabel[quote.status]}
                </span>
              </div>

              {quote.amount && (
                <div className="mb-6">
                  <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Importo</span>
                  <p className="text-display text-3xl md:text-5xl tracking-tight text-signal mt-1">
                    {quote.currency === "EUR" ? "€" : "$"}{quote.amount.toLocaleString()}
                  </p>
                </div>
              )}

              <p className="text-xs text-ink/40">
                Creato il {new Date(quote.createdAt).toLocaleDateString("it-IT")}
              </p>

              {quote.status === "sent" && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleAcceptQuote}
                    className="px-6 py-2.5 bg-green-500/10 text-green-400 text-xs font-mono uppercase tracking-wider rounded-full hover:bg-green-500/20 transition-colors"
                  >
                    Accetta preventivo
                  </button>
                  <button
                    onClick={handleRejectQuote}
                    className="px-6 py-2.5 bg-red-500/10 text-red-400 text-xs font-mono uppercase tracking-wider rounded-full hover:bg-red-500/20 transition-colors"
                  >
                    Rifiuta
                  </button>
                </div>
              )}

              {quote.pdfStorageId && (
                <div className="mt-6 pt-6 border-t border-mist">
                  <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Documento PDF</span>
                  <div className="mt-2">
                    <a
                      href={`/api/storage/${quote.pdfStorageId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-signal/10 text-signal text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal/20 transition-colors"
                    >
                      Scarica PDF
                    </a>
                  </div>
                </div>
              )}
          </div>

            {project && project.iban && (
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8">
                <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Pagamento</span>
                <h2 className="text-display text-xl mt-2 mb-4">Coordinate bancarie</h2>
                <div className="bg-paper rounded-xl p-4 font-mono text-sm tracking-wider text-ink/80">
                  {project.iban}
                </div>
                {project.price && (
                  <p className="text-sm text-ink/60 mt-3">
                    Totale: {project.currency === "EUR" ? "€" : "$"}{project.price.toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {project && docs.length > 0 && (
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8">
                <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Documenti</span>
                <h2 className="text-display text-xl mt-2 mb-4">Documenti del progetto</h2>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <div key={doc._id} className="bg-paper rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        {doc.description && (
                          <p className="text-xs text-ink/50 mt-0.5">{doc.description}</p>
                        )}
                      </div>
                      <a
                        href={`/api/storage/${doc.storageId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-signal text-xs font-mono uppercase tracking-wider hover:opacity-80"
                      >
                        Scarica
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project && (
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8">
                <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Progetto</span>
                <h2 className="text-display text-xl mt-2 mb-2">{project.name}</h2>
                <span className={`inline-block text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-ink/60`}>
                  {project.stage}
                </span>
                {project.timeline && project.timeline.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {project.timeline.slice().reverse().map((event, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="text-ink/30 font-mono text-xs shrink-0 w-20">
                          {new Date(event.date).toLocaleDateString("it-IT")}
                        </span>
                        <span className="text-ink/60">{event.event}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            {!project && !hasMultipleProjects ? null : hasMultipleProjects ? (
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8 sticky top-32">
                <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Progetti</span>
                <h2 className="text-display text-xl mt-2 mb-4">Messaggi e documenti</h2>
                <p className="text-sm text-ink/60">
                  Visualizza i messaggi e i documenti dalla pagina del progetto nel tuo{" "}
                  <Link href="/dashboard/projects" className="text-signal hover:underline">dashboard progetti</Link>.
                </p>
              </div>
            ) : (
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8 sticky top-32">
                <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Messaggi</span>
                <h2 className="text-display text-xl mt-2 mb-4">Conversazione</h2>

                <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4 pr-2">
                  {messages.length === 0 && (
                    <p className="text-ink/40 text-sm">Nessun messaggio ancora.</p>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`p-3 rounded-xl ${
                        msg.senderRole === "admin"
                          ? "bg-signal/10 ml-4"
                          : "bg-white/5 mr-4"
                      }`}
                    >
                      <p className="text-xs text-ink/40 font-mono mb-1">
                        {msg.senderRole === "admin" ? "Admin" : "Tu"}
                      </p>
                      <p className="text-sm text-ink/80">{msg.content}</p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={msgText}
                    onChange={(e) => setMsgText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 bg-paper border border-mist rounded-full px-4 py-2 text-sm outline-none focus:border-signal transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={sending || !msgText.trim()}
                    className="px-4 py-2 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors disabled:opacity-30"
                  >
                    {sending ? "..." : "Invia"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
