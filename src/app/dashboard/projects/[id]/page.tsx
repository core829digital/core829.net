"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useConvex, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import { getSessionToken } from "@/lib/cookie";
import { useToast } from "@/components/ui/Toast";

export default function ProjectDetailPage() {
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
  const projectId = params.id as Id<"projects">;
  const project = useQuery(
    api.projects.getById,
    token && projectId ? { projectId, token } : "skip"
  );
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

  if (session === undefined || project === undefined) {
    return (
      <div className="pt-40 min-h-dvh flex items-center justify-center bg-paper text-ink">
        <p className="text-ink/60 font-mono text-sm">Loading...</p>
      </div>
    );
  }
  if (session === null) {
    router.push("/login?redirect=/dashboard");
    return null;
  }
  if (project === null) {
    return (
      <div className="pt-40 min-h-dvh bg-paper text-ink">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="text-ink/60">Project not found.</p>
          <Link href="/dashboard" className="text-signal text-sm mt-4 inline-block">&larr; Dashboard</Link>
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

  return (
    <div className="pt-40 min-h-dvh bg-paper text-ink">
      <div className="max-w-[1440px] mx-auto px-6">
        <Link href="/dashboard" className="text-signal text-xs font-mono uppercase tracking-wider hover:opacity-80">
          &larr; Dashboard
        </Link>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-display text-2xl md:text-4xl tracking-tight">{project.name}</h1>
                  {project.description && <p className="text-ink/60 mt-3">{project.description}</p>}
                </div>
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 text-ink/60 shrink-0">{project.stage}</span>
              </div>

              {project.price && (
                <div className="mb-4">
                  <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Prezzo</span>
                  <p className="text-display text-2xl text-signal mt-1">{project.currency === "EUR" ? "\u20AC" : "$"}{project.price.toLocaleString()}</p>
                </div>
              )}

              {project.iban && (
                <div className="mb-4">
                  <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">IBAN</span>
                  <p className="font-mono text-sm mt-1 text-ink/80">{project.iban}</p>
                </div>
              )}

              {project.timeline && project.timeline.length > 0 && (
                <div className="mt-6 pt-6 border-t border-mist">
                  <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Timeline</span>
                  <div className="mt-3 space-y-2">
                    {project.timeline.slice().reverse().map((event, i) => (
                      <div key={i} className="flex gap-3 text-sm">
                        <span className="text-ink/30 font-mono text-xs shrink-0 w-20">{new Date(event.date).toLocaleDateString("it-IT")}</span>
                        <span className="text-ink/60">{event.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {docs.length > 0 && (
              <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8">
                <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Documenti</span>
                <h2 className="text-display text-xl mt-2 mb-4">Documenti del progetto</h2>
                <div className="space-y-2">
                  {docs.map((doc) => (
                    <div key={doc._id} className="bg-paper rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        {doc.description && <p className="text-xs text-ink/50 mt-0.5">{doc.description}</p>}
                      </div>
                      <a href={`/api/storage/${doc.storageId}`} target="_blank" rel="noopener noreferrer"
                        className="text-signal text-xs font-mono uppercase tracking-wider hover:opacity-80">Scarica</a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-graphite rounded-2xl border border-mist p-6 lg:p-8 sticky top-32">
              <span className="text-ink/40 font-mono text-xs uppercase tracking-wider">Messaggi</span>
              <h2 className="text-display text-xl mt-2 mb-4">Conversazione</h2>

              <div className="space-y-3 max-h-[400px] overflow-y-auto mb-4 pr-2">
                {messages.length === 0 && <p className="text-ink/40 text-sm">Nessun messaggio ancora.</p>}
                {messages.map((msg) => (
                  <div key={msg._id} className={`p-3 rounded-xl ${msg.senderRole === "admin" ? "bg-signal/10 ml-4" : "bg-white/5 mr-4"}`}>
                    <p className="text-xs text-ink/40 font-mono mb-1">{msg.senderRole === "admin" ? "Admin" : "Tu"}</p>
                    <p className="text-sm text-ink/80">{msg.content}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input type="text" value={msgText} onChange={(e) => setMsgText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 bg-paper border border-mist rounded-full px-4 py-2 text-sm outline-none focus:border-signal transition-colors"
                />
                <button onClick={handleSend} disabled={sending || !msgText.trim()}
                  className="px-4 py-2 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors disabled:opacity-30"
                >
                  {sending ? "..." : "Invia"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
