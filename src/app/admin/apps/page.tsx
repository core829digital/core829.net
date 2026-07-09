"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";

export default function AdminApps() {
  const token = getSessionToken();
  const apps = useQuery(api.rentableApps.list);
  const create = useMutation(api.rentableApps.create);
  const update = useMutation(api.rentableApps.update);
  const remove = useMutation(api.rentableApps.remove);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [editActive, setEditActive] = useState(false);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newTagline, setNewTagline] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newFeatures, setNewFeatures] = useState("");

  const filtered = (apps ?? []).filter((a) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Apps</h1>
          <p className="text-ink/50 text-sm mt-1">{apps?.length ?? 0} rentable apps</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)}
          className="px-4 py-2 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
        >{showCreate ? "Cancel" : "New App"}</button>
      </div>

      {showCreate && (
        <div className="bg-graphite rounded-2xl border border-mist p-6 space-y-4">
          <h3 className="text-lg font-medium">New Rentable App</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Name" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
            <input type="text" value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="Slug (e.g. booking-system)" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Category (e.g. Sales)" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
            <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="Monthly price" className="bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
          </div>
          <input type="text" value={newTagline} onChange={(e) => setNewTagline(e.target.value)} placeholder="Tagline" className="w-full bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
          <textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description" rows={3} className="w-full bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal resize-none" />
          <input type="text" value={newFeatures} onChange={(e) => setNewFeatures(e.target.value)} placeholder="Features (comma-separated)" className="w-full bg-paper border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal" />
          <div className="flex gap-2">
            <button onClick={async () => {
              if (!newName || !newSlug || !newCategory || !newPrice) return;
              await create({
                name: newName.trim(),
                slug: newSlug.trim(),
                category: newCategory.trim(),
                tagline: newTagline.trim(),
                description: newDesc.trim(),
                monthlyPrice: parseFloat(newPrice),
                features: newFeatures.split(",").map((f) => f.trim()).filter(Boolean),
                active: true,
                token,
              });
              setNewName(""); setNewSlug(""); setNewCategory(""); setNewTagline(""); setNewDesc(""); setNewPrice(""); setNewFeatures(""); setShowCreate(false);
            }} className="px-4 py-2 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors">Create</button>
          </div>
        </div>
      )}

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search apps..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
      />

      {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No apps.</p>}

      <div className="space-y-2">
        {filtered.map((a) => (
          <div key={a._id} className="bg-graphite rounded-2xl border border-mist p-4 flex items-center justify-between gap-4 hover:border-white/10 transition-colors">
            {editingId === a._id ? (
              <div className="flex gap-2 flex-1 flex-wrap items-center">
                <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)}
                  className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-sm outline-none w-32" placeholder="Price" />
                <select value={editActive ? "true" : "false"} onChange={(e) => setEditActive(e.target.value === "true")}
                  className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-sm outline-none">
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                <button onClick={async () => { await update({ id: a._id, token, monthlyPrice: parseFloat(editPrice), active: editActive }); setEditingId(null); }}
                  className="px-3 py-1.5 bg-signal text-ink text-xs font-mono rounded-xl">Save</button>
                <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs font-mono text-ink/40">Cancel</button>
              </div>
            ) : (
              <>
                <div className="min-w-0">
                  <p className="font-medium">{a.name}</p>
                  <p className="text-sm text-ink/60">{a.category} — €{a.monthlyPrice}/mo</p>
                </div>
                <div className="flex gap-2 items-center shrink-0">
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${a.active ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {a.active ? "Active" : "Inactive"}
                  </span>
                  <button onClick={() => { setEditingId(a._id); setEditPrice(a.monthlyPrice.toString()); setEditActive(a.active); }}
                    className="text-xs text-ink/40 hover:text-ink font-mono">Edit</button>
                  <button onClick={() => { if (confirm("Delete app?")) remove({ id: a._id, token }); }}
                    className="text-xs text-red-400/60 hover:text-red-400 font-mono">Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
