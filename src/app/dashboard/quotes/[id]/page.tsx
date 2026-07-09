"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { getSessionToken } from "@/lib/cookie";
import { useToast } from "@/components/ui/Toast";

export default function QuoteDetailPage() {
  const convex = useConvex();
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<Doc<"users"> | null>(null);
  const [quote, setQuote] = useState<Doc<"quotes"> | null>(null);
  const [project, setProject] = useState<Doc<"projects"> | null>(null);
  const [messages, setMessages] = useState<Doc<"projectMessages">[]>([]);
  const [docs, setDocs] = useState<Doc<"projectDocuments">[]>([]);
  const [loading, setLoading] = useState(true);
  const [msgText, setMsgText] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quoteId = params.id as Id<"quotes">;

  useEffect(() => {
    const token = getSessionToken();
    if (!token) {
      router.push("/login?redirect=/dashboard/quotes/" + quoteId);
      return;
    }

    const init = async () => {
      try {
        const session = await convex.query(api.auth.validateSession, { token });
        if (!session) {
          router.push("/login?redirect=/dashboard/quotes/" + quoteId);
          return;
        }

        const profile = await convex.query(api.profile.getProfile, {
          userId: session.userId as any,
        });
        if (profile) setUser(profile as any);

        const q = await convex.query(api.quotes.get, { quoteId, token });
        setQuote(q);

        const userProjects = await convex.query(api.projects.getByUser, {
          userId: session.userId as any,
          token,
        });

        const proj = userProjects[0] ?? null;
        setProject(proj);

        if (proj) {
          const [allMsgs, allDocs] = await Promise.all([
            convex.query(api.messages.list, { projectId: proj._id, token }),
            convex.query(api.documents.list, { projectId: proj._id, token }),
          ]);
          setMessages(allMsgs);
          setDocs(allDocs);
        }
      } catch {
        toast("Failed to load quote", "error");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [convex, router, quoteId, toast]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      });
      setMsgText("");
      const updated = await convex.query(api.messages.list, { projectId: project._id, token });
      setMessages(updated);
    } catch {
      toast("Failed to send message", "error");
    } finally {
      setSending(false);
    }
  };

  const handleAcceptQuote = async () => {
    if (!quote) return;
    try {
      const token = getSessionToken();
      if (!token) return;
      await convex.mutation(api.quotes.updateStatus, {
        quoteId: quote._id,
        status: "accepted",
        token,
      });
      setQuote({ ...quote, status: "accepted" });
    } catch {
      toast("Failed to accept quote", "error");
    }
  };

  const handleRejectQuote = async () => {
    if (!quote) return;
    try {
      const token = getSessionToken();
      if (!token) return;
      await convex.mutation(api.quotes.updateStatus, {
        quoteId: quote._id,
        status: "rejected",
        token,
      });
      setQuote({ ...quote, status: "rejected" });
    } catch {
      toast("Failed to reject quote", "error");
    }
  };

  if (loading) {
    return (
      <div className="pt-40 min-h-dvh flex items-center justify-center bg-paper text-ink">
        <p className="text-ink/60 font-mono text-sm">Loading...</p>
      </div>
    );
  }

  if (!quote) {
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
            {project && (
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
