"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/Toast";

export default function AdminLeads() {
  const token = getSessionToken();
  const leads = useQuery(api.leads.list, token ? { token } : "skip");
  const updateStatus = useMutation(api.leads.updateStatus);
  const remove = useMutation(api.leads.remove);
  const createRequest = useMutation(api.projectRequests.create);
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [converting, setConverting] = useState<string | null>(null);

  const filtered = (leads ?? []).filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company ?? "").toLowerCase().includes(q);
    }
    return true;
  });

  const handleConvert = async (lead: Doc<"leads">) => {
    setConverting(lead._id);
    try {
      await createRequest({
        name: lead.name,
        email: lead.email,
        company: lead.company ?? undefined,
        serviceInterest: lead.serviceInterest,
        description: lead.message ?? "",
      });
      await updateStatus({ id: lead._id, status: "converted", token });
    } catch { toast("Failed to convert lead", "error"); }
    setConverting(null);
  };

  const statuses = ["all", "new", "contacted", "qualified", "converted", "closed"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Leads</h1>
          <p className="text-ink/50 text-sm mt-1">{leads?.length ?? 0} total leads</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search leads..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
        />
        <div className="flex gap-1 bg-graphite rounded-xl p-1 border border-mist">
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors ${statusFilter === s ? "bg-signal text-ink" : "text-ink/50 hover:text-ink"}`}
            >{s === "all" ? "All" : s}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No leads match your filters.</p>}

      <div className="space-y-2">
        {filtered.map((lead) => (
          <div key={lead._id} className="bg-graphite rounded-2xl border border-mist p-5 flex items-start justify-between gap-4 hover:border-white/10 transition-colors">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 mb-1">
                <p className="font-medium">{lead.name}</p>
                <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                  lead.status === "new" ? "bg-blue-500/10 text-blue-400" :
                  lead.status === "contacted" ? "bg-yellow-500/10 text-yellow-400" :
                  lead.status === "qualified" ? "bg-purple-500/10 text-purple-400" :
                  lead.status === "converted" ? "bg-green-500/10 text-green-400" :
                  "bg-red-500/10 text-red-400"
                }`}>{lead.status}</span>
              </div>
              <p className="text-sm text-ink/60">{lead.email} {lead.company ? `· ${lead.company}` : ""}</p>
              <p className="text-xs text-ink/40 mt-1">Service: {lead.serviceInterest}</p>
              {lead.message && <p className="text-sm text-ink/50 mt-2 bg-paper rounded-xl p-3">{lead.message}</p>}
              <p className="text-xs text-ink/30 mt-2 font-mono">ID: {lead._id}</p>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
                <select value={lead.status} onChange={(e) => updateStatus({ id: lead._id, status: e.target.value as any, token })}
                className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-xs font-mono text-ink/60 outline-none"
              >
                {statuses.filter((s) => s !== "all").map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => handleConvert(lead)} disabled={converting === lead._id || lead.status === "converted"}
                className="px-3 py-1.5 bg-signal/10 text-signal text-xs font-mono rounded-xl hover:bg-signal/20 transition-colors disabled:opacity-30"
              >
                {converting === lead._id ? "..." : "Convert to Request"}
              </button>
              <button onClick={() => { if (confirm("Delete this lead?")) remove({ id: lead._id, token }); }}
                className="text-xs text-red-400/60 hover:text-red-400 font-mono text-center"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
