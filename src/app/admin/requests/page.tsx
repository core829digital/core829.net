"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/Toast";

export default function AdminRequests() {
  const token = getSessionToken();
  const requests = useQuery(api.projectRequests.list, token ? { token } : "skip");
  const users = useQuery(api.auth.list, token ? { token } : "skip");
  const updateStatus = useMutation(api.projectRequests.updateStatus);
  const remove = useMutation(api.projectRequests.remove);
  const createQuote = useMutation(api.quotes.create);
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [quoteTitle, setQuoteTitle] = useState("");
  const [creatingFor, setCreatingFor] = useState<string | null>(null);

  const filtered = (requests ?? []).filter((r) => {
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || r.serviceInterest.toLowerCase().includes(q);
    }
    return true;
  });

  const findUserId = (email: string) => users?.find((u) => u.email === email)?._id;

  const handleCreateQuote = async (req: Doc<"projectRequests">) => {
    setCreatingFor(req._id);
    const title = quoteTitle || `${req.name} — ${req.serviceInterest}`;
    try {
      const uid = findUserId(req.email);
      if (!uid) {
        toast("User not registered yet. Create a user account first.", "error");
        setCreatingFor(null);
        return;
      }
      await createQuote({
        userId: uid,
        projectRequestId: req._id,
        title,
        amount: undefined,
        currency: "EUR",
      });
      await updateStatus({ id: req._id, status: "quoted", token });
      setQuoteTitle("");
    } catch { toast("Failed to create quote", "error"); }
    setCreatingFor(null);
  };

  const statuses = ["all", "new", "reviewing", "quoted", "approved", "declined"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Requests</h1>
          <p className="text-ink/50 text-sm mt-1">{requests?.length ?? 0} total requests</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search requests..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
        />
        <div className="flex gap-1 bg-graphite rounded-xl p-1 border border-mist">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${statusFilter === s ? "bg-signal text-ink" : "text-ink/50 hover:text-ink"}`}
            >{s === "all" ? "All" : s}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No requests match your filters.</p>}

      <div className="space-y-2">
        {filtered.map((req) => (
          <div key={req._id} className="bg-graphite rounded-2xl border border-mist p-5 hover:border-white/10 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium">{req.name}</p>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                    req.status === "new" ? "bg-blue-500/10 text-blue-400" :
                    req.status === "reviewing" ? "bg-yellow-500/10 text-yellow-400" :
                    req.status === "quoted" ? "bg-purple-500/10 text-purple-400" :
                    req.status === "approved" ? "bg-green-500/10 text-green-400" :
                    "bg-red-500/10 text-red-400"
                  }`}>{req.status}</span>
                </div>
                <p className="text-sm text-ink/60">{req.email} {req.company ? `· ${req.company}` : ""} · {req.serviceInterest}</p>
                {req.description && <p className="text-sm text-ink/50 mt-2 bg-paper rounded-xl p-3">{req.description}</p>}
                <div className="flex gap-4 mt-2 text-xs text-ink/40">
                  {req.budget && <span>Budget: {req.budget}</span>}
                  {req.timeline && <span>Timeline: {req.timeline}</span>}
                </div>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <select value={req.status} onChange={(e) => updateStatus({ id: req._id, status: e.target.value as any, token })}
                  className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-xs font-mono text-ink/60 outline-none"
                >
                  {statuses.filter((s) => s !== "all").map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button onClick={() => { if (confirm("Delete request?")) remove({ id: req._id, token }); }}
                  className="text-xs text-red-400/60 hover:text-red-400 font-mono text-center"
                >Delete</button>
              </div>
            </div>
            {req.status !== "quoted" && req.status !== "declined" && (
              <div className="mt-4 pt-4 border-t border-mist flex items-center gap-3">
                <input type="text" value={creatingFor === req._id ? quoteTitle : ""} onChange={(e) => setQuoteTitle(e.target.value)}
                  onFocus={() => { setCreatingFor(req._id); setQuoteTitle(quoteTitle || `${req.name} — ${req.serviceInterest}`); }}
                  placeholder="Quote title..." className="flex-1 bg-paper border border-mist rounded-xl px-3 py-1.5 text-sm outline-none focus:border-signal"
                />
                <button onClick={() => handleCreateQuote(req)} disabled={creatingFor === req._id}
                  className="px-4 py-1.5 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim transition-colors disabled:opacity-30"
                >{creatingFor === req._id ? "..." : "Create Quote"}</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
