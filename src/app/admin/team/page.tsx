"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/Toast";

export default function AdminTeam() {
  const token = getSessionToken();
  const members = useQuery(api.teamMembers.list, token ? { token } : "skip");
  const create = useMutation(api.teamMembers.create);
  const update = useMutation(api.teamMembers.update);
  const remove = useMutation(api.teamMembers.remove);
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [search, setSearch] = useState("");

  const filtered = (members ?? []).filter((m) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.role.toLowerCase().includes(q);
  });

  const startEdit = (m: Doc<"teamMembers">) => {
    setEditingId(m._id); setEditName(m.name); setEditEmail(m.email); setEditRole(m.role);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Team</h1>
          <p className="text-ink/50 text-sm mt-1">{members?.length ?? 0} team members</p>
        </div>
      </div>

      <div className="bg-graphite rounded-2xl border border-mist p-5">
        <h3 className="text-sm font-mono text-ink/50 uppercase tracking-wider mb-3">Add Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
            className="bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none" />
          <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role"
            className="bg-paper border border-mist rounded-xl px-3 py-2 text-sm outline-none" />
          <button onClick={async () => { if (name && email && role) { try { await create({ name, email, role, token }); setName(""); setEmail(""); setRole(""); } catch { toast("Failed to add member", "error"); } }}}
            className="bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim transition-colors"
          >Add</button>
        </div>
      </div>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search team..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
      />

      {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No team members.</p>}

      <div className="space-y-2">
        {filtered.map((m) => (
          <div key={m._id} className="bg-graphite rounded-2xl border border-mist p-4 flex items-center justify-between gap-4 hover:border-white/10 transition-colors">
            {editingId === m._id ? (
              <div className="flex gap-2 flex-1 flex-wrap">
                <input value={editName} onChange={(e) => setEditName(e.target.value)}
                  className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-sm outline-none flex-1 min-w-[120px]" />
                <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)}
                  className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-sm outline-none flex-1 min-w-[120px]" />
                <input value={editRole} onChange={(e) => setEditRole(e.target.value)}
                  className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-sm outline-none w-28" />
                 <button onClick={async () => { try { await update({ id: m._id, token, name: editName, email: editEmail, role: editRole }); setEditingId(null); } catch { toast("Failed to save", "error"); } }}
                  className="px-3 py-1.5 bg-signal text-ink text-xs font-mono rounded-xl">Save</button>
                <button onClick={() => setEditingId(null)} className="px-3 py-1.5 text-xs font-mono text-ink/40">Cancel</button>
              </div>
            ) : (
              <>
                <div className="min-w-0">
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-ink/60">{m.email} — {m.role}</p>
                </div>
                <div className="flex gap-2 items-center shrink-0">
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${m.active ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"}`}>
                    {m.active ? "Active" : "Inactive"}
                  </span>
                  <button onClick={() => startEdit(m)} className="text-xs text-ink/40 hover:text-ink font-mono">Edit</button>
                  <button onClick={async () => { if (confirm("Remove team member?")) { try { await remove({ id: m._id, token }); } catch { toast("Failed to remove", "error"); } } }}
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
