"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";

export default function AdminCases() {
  const token = getSessionToken();
  const caseStudies = useQuery(api.caseStudies.list);
  const update = useMutation(api.caseStudies.update);
  const remove = useMutation(api.caseStudies.remove);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newClient, setNewClient] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newMetric, setNewMetric] = useState("");
  const [newMetricLabel, setNewMetricLabel] = useState("");
  const [newServiceTags, setNewServiceTags] = useState("");
  const [newContent, setNewContent] = useState("");

  const create = useMutation(api.caseStudies.create);

  const filtered = (caseStudies ?? []).filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.client.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Case Studies</h1>
          <p className="text-ink/50 text-sm mt-1">{caseStudies?.length ?? 0} case studies</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
        >{showCreate ? "Cancel" : "New Case"}</button>
      </div>

      {showCreate && (
        <div className="bg-graphite rounded-2xl border border-mist p-6 space-y-4">
          <h3 className="text-lg font-medium">New Case Study</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder="Client name" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
            <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="Slug (e.g. client-name)" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
          </div>
          <input type="text" value={newSummary} onChange={(e) => setNewSummary(e.target.value)} placeholder="Summary" className="w-full bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" value={newMetric} onChange={(e) => setNewMetric(e.target.value)} placeholder="Metric value (e.g. 40)" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
            <input type="text" value={newMetricLabel} onChange={(e) => setNewMetricLabel(e.target.value)} placeholder="Metric label (e.g. % increase)" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
          </div>
          <input type="text" value={newServiceTags} onChange={(e) => setNewServiceTags(e.target.value)} placeholder="Service tags (comma-separated)" className="w-full bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Content (HTML or markdown)" rows={4} className="w-full bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal resize-none" />
          <div className="flex gap-2">
            <button onClick={async () => {
              if (!newClient || !newSlug || !newSummary || !newMetric || !newMetricLabel) return;
              await create({
                client: newClient.trim(),
                slug: newSlug.trim(),
                summary: newSummary.trim(),
                metric: parseFloat(newMetric),
                metricLabel: newMetricLabel.trim(),
                serviceTags: newServiceTags.split(",").map((s) => s.trim()).filter(Boolean),
                content: newContent.trim(),
                published: false,
                token,
              });
              setNewClient(""); setNewSlug(""); setNewSummary(""); setNewMetric(""); setNewMetricLabel(""); setNewServiceTags(""); setNewContent(""); setShowCreate(false);
            }} className="px-4 py-2 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors">Create</button>
          </div>
        </div>
      )}

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search cases..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
      />

      {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No case studies.</p>}

      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c._id} className="bg-graphite rounded-2xl border border-mist p-4 flex items-center justify-between gap-4 hover:border-white/10 transition-colors">
            <div className="min-w-0">
              <p className="font-medium">{c.client}</p>
              <p className="text-sm text-ink/60 line-clamp-1">{c.summary}</p>
              <p className="text-xs text-ink/40 mt-0.5">{c.metric} {c.metricLabel} · {c.serviceTags?.join(", ")}</p>
            </div>
            <div className="flex gap-2 items-center shrink-0">
              <button onClick={() => update({ id: c._id, token, published: !c.published })}
                className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                  c.published ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                }`}
              >{c.published ? "Published" : "Draft"}</button>
              <button onClick={() => { if (confirm("Delete case study?")) remove({ id: c._id, token }); }}
                className="text-xs text-red-400/60 hover:text-red-400 font-mono">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
