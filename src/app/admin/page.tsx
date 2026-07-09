"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";

export default function AdminOverview() {
  const token = getSessionToken();

  const users = useQuery(api.auth.list, token ? { token } : "skip");
  const leads = useQuery(api.leads.list, token ? { token } : "skip");
  const requests = useQuery(api.projectRequests.list, token ? { token } : "skip");
  const projects = useQuery(api.projects.list, token ? { token } : "skip");
  const teamMembers = useQuery(api.teamMembers.list, token ? { token } : "skip");
  const quotes = useQuery(api.quotes.list, token ? { token } : "skip");

  const stats = [
    { label: "Leads", value: leads?.length ?? 0, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Requests", value: requests?.length ?? 0, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Quotes", value: quotes?.length ?? 0, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Active Projects", value: projects?.filter((p) => p.status !== "support")?.length ?? 0, color: "text-green-400", bg: "bg-green-500/10" },
    { label: "Team", value: teamMembers?.length ?? 0, color: "text-cyan-400", bg: "bg-cyan-500/10" },
    { label: "Users", value: users?.length ?? 0, color: "text-pink-400", bg: "bg-pink-500/10" },
  ];

  const pipeline = [
    { label: "Leads", count: leads?.length ?? 0, items: leads?.filter((l) => l.status === "new").length ?? 0, color: "bg-blue-500" },
    { label: "Requests", count: requests?.length ?? 0, items: requests?.filter((r) => r.status === "new").length ?? 0, color: "bg-purple-500" },
    { label: "Quotes", count: quotes?.length ?? 0, items: quotes?.filter((q) => q.status === "sent").length ?? 0, color: "bg-amber-500" },
    { label: "Projects", count: projects?.length ?? 0, items: projects?.filter((p) => p.status !== "support").length ?? 0, color: "bg-green-500" },
  ];

  const recentLeads = leads?.slice(0, 5) ?? [];
  const recentQuotes = quotes?.slice(0, 5) ?? [];
  const recentRequests = requests?.slice(0, 5) ?? [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-display text-3xl tracking-tight">Overview</h1>
        <p className="text-ink/50 text-sm mt-1">Pipeline e attività recenti.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-mist`}>
            <p className="text-ink/50 text-xs font-mono uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-semibold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-graphite rounded-2xl border border-mist p-6">
        <h2 className="text-display text-lg mb-4">Pipeline</h2>
        <div className="grid grid-cols-4 gap-3">
          {pipeline.map((p, i) => (
            <div key={p.label} className="relative">
              <div className={`${p.color} rounded-xl p-4 opacity-90`}>
                <p className="text-white/70 text-xs font-mono uppercase tracking-wider">{p.label}</p>
                <p className="text-white text-2xl font-semibold mt-1">{p.count}</p>
                <p className="text-white/60 text-xs mt-1">{p.items} pending</p>
              </div>
              {i < pipeline.length - 1 && (
                <div className="hidden md:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-ink/30 text-xl z-10">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-graphite rounded-2xl border border-mist p-5">
          <h3 className="text-sm font-mono text-ink/50 uppercase tracking-wider mb-3">Recent Leads</h3>
          {recentLeads.length === 0 && <p className="text-ink/40 text-sm">No leads yet.</p>}
          {recentLeads.map((l) => (
            <div key={l._id} className="py-2 border-b border-mist/50 last:border-0">
              <p className="text-sm font-medium">{l.name}</p>
              <p className="text-xs text-ink/50">{l.email} &middot; {l.serviceInterest}</p>
            </div>
          ))}
        </div>
        <div className="bg-graphite rounded-2xl border border-mist p-5">
          <h3 className="text-sm font-mono text-ink/50 uppercase tracking-wider mb-3">Recent Requests</h3>
          {recentRequests.length === 0 && <p className="text-ink/40 text-sm">No requests yet.</p>}
          {recentRequests.map((r) => (
            <div key={r._id} className="py-2 border-b border-mist/50 last:border-0">
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-ink/50">{r.email} &middot; {r.serviceInterest}</p>
            </div>
          ))}
        </div>
        <div className="bg-graphite rounded-2xl border border-mist p-5">
          <h3 className="text-sm font-mono text-ink/50 uppercase tracking-wider mb-3">Recent Quotes</h3>
          {recentQuotes.length === 0 && <p className="text-ink/40 text-sm">No quotes yet.</p>}
          {recentQuotes.map((q) => (
            <div key={q._id} className="py-2 border-b border-mist/50 last:border-0">
              <p className="text-sm font-medium">{q.title}</p>
              <p className="text-xs text-ink/50">{q.currency}{q.amount ?? "—"} &middot; {q.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
