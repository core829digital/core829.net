"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/Toast";

export default function AdminQuotes() {
  const token = getSessionToken();
  const quotes = useQuery(api.quotes.list, token ? { token } : "skip");
  const users = useQuery(api.auth.list, token ? { token } : "skip");
  const requests = useQuery(api.projectRequests.list, token ? { token } : "skip");

  const createQuote = useMutation(api.quotes.create);
  const updatePrice = useMutation(api.quotes.updatePrice);
  const updateStatus = useMutation(api.quotes.updateStatus);
  const remove = useMutation(api.quotes.remove);

  const [showCreate, setShowCreate] = useState(false);
  const [newUserId, setNewUserId] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [priceInputs, setPriceInputs] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const [search, setSearch] = useState("");

  const filtered = (quotes ?? []).filter((q) => {
    if (!search) return true;
    const ql = search.toLowerCase();
    return q.title.toLowerCase().includes(ql);
  });

  const handleCreate = async () => {
    if (!newTitle || !newUserId) {
      toast("Select a user", "error");
      return;
    }
    try {
      await createQuote({
        userId: newUserId as any,
        title: newTitle,
        amount: newAmount ? parseFloat(newAmount) : undefined,
        currency: "EUR",
        token,
      });
      setNewUserId(""); setNewTitle(""); setNewAmount(""); setShowCreate(false);
    } catch { toast("Failed to create quote", "error"); }
  };

  const handleSetPrice = async (quoteId: string, amount: number) => {
    try {
      await updatePrice({ quoteId: quoteId as any, amount, token });
      setPriceInputs((p) => ({ ...p, [quoteId]: "" }));
    } catch { toast("Failed to update price", "error"); }
  };

  const getRelatedRequest = (quote: Doc<"quotes">) =>
    quote.projectRequestId ? requests?.find((r) => r._id === quote.projectRequestId) : null;

  const getRelatedUser = (quote: Doc<"quotes">) =>
    quote.userId ? users?.find((u) => u._id === quote.userId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Quotes</h1>
          <p className="text-ink/50 text-sm mt-1">{quotes?.length ?? 0} total quotes</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim transition-colors"
        >{showCreate ? "Cancel" : "New Quote"}</button>
      </div>

      {showCreate && (
        <div className="bg-graphite rounded-2xl border border-mist p-5 space-y-3">
          <h3 className="text-sm font-mono text-ink/50 uppercase tracking-wider">Create Quote</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <select value={newUserId} onChange={(e) => setNewUserId(e.target.value)}
              className="bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
            >
              <option value="">Select user (optional)</option>
              {users?.map((u) => <option key={u._id} value={u._id}>{u.name} ({u.email})</option>)}
            </select>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title *"
              className="bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
            />
            <input type="number" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} placeholder="Amount (EUR)"
              className="bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none"
            />
            <button onClick={handleCreate} disabled={!newTitle}
              className="bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim transition-colors disabled:opacity-30"
            >Create</button>
          </div>
        </div>
      )}

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search quotes..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
      />

      {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No quotes.</p>}

      <div className="space-y-2">
        {filtered.map((q) => {
          const relatedUser = getRelatedUser(q);
          const relatedRequest = getRelatedRequest(q);
          return (
            <div key={q._id} className="bg-graphite rounded-2xl border border-mist p-5 hover:border-white/10 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium">{q.title}</p>
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                      q.status === "draft" ? "bg-gray-500/10 text-gray-400" :
                      q.status === "sent" ? "bg-blue-500/10 text-blue-400" :
                      q.status === "accepted" ? "bg-green-500/10 text-green-400" :
                      "bg-red-500/10 text-red-400"
                    }`}>{q.status}</span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/60">
                    <span>Amount: {q.currency}{q.amount ?? "—"}</span>
                    {relatedUser && <span>User: {relatedUser.name}</span>}
                    {relatedRequest && <span>Request: {relatedRequest.name} ({relatedRequest.serviceInterest})</span>}
                    {q.pdfStorageId && <span className="text-signal">Has PDF</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <select value={q.status} onChange={(e) => updateStatus({ quoteId: q._id, status: e.target.value as any, token })}
                    className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-xs font-mono text-ink/60 outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <button onClick={() => { if (confirm("Delete quote?")) remove({ quoteId: q._id, token }); }}
                    className="text-xs text-red-400/60 hover:text-red-400 font-mono text-center"
                  >Delete</button>
                </div>
              </div>
              {q.status === "draft" && (
                <div className="mt-3 pt-3 border-t border-mist flex items-center gap-3">
                  <input type="number" value={priceInputs[q._id] ?? ""} onChange={(e) => setPriceInputs((p) => ({ ...p, [q._id]: e.target.value }))}
                    placeholder="Set price (EUR)" className="flex-1 bg-paper border border-mist rounded-xl px-3 py-1.5 text-sm outline-none w-48"
                    onKeyDown={(e) => { if (e.key === "Enter") { const v = parseFloat(priceInputs[q._id]); if (!isNaN(v)) handleSetPrice(q._id, v); }}}
                  />
                  <button onClick={() => { const v = parseFloat(priceInputs[q._id]); if (!isNaN(v)) handleSetPrice(q._id, v); }}
                    className="px-4 py-1.5 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim"
                  >Set Price & Send</button>
                </div>
              )}
              {q.status === "accepted" && (
                <div className="mt-3 pt-3 border-t border-mist">
                  <p className="text-xs text-green-400/80 font-mono">Quote accepted. Ready to create project.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
