"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";

export default function AdminUsers() {
  const token = getSessionToken();
  const users = useQuery(api.auth.list, token ? { token } : "skip");
  const updateRole = useMutation(api.auth.updateRole);
  const removeUser = useMutation(api.auth.remove);
  const [search, setSearch] = useState("");

  const filtered = (users ?? []).filter((u) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Users</h1>
          <p className="text-ink/50 text-sm mt-1">{users?.length ?? 0} total users</p>
        </div>
      </div>

      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..." className="bg-graphite border border-mist rounded-xl px-4 py-2 text-sm outline-none focus:border-signal w-64"
      />

      {filtered.length === 0 && <p className="text-ink/40 text-sm py-8 text-center">No users found.</p>}

      <div className="space-y-2">
        {filtered.map((u) => (
          <div key={u._id} className="bg-graphite rounded-2xl border border-mist p-4 flex items-center justify-between gap-4 hover:border-white/10 transition-colors">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-medium">{u.name}</p>
                <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                  u.role === "admin" ? "bg-signal/10 text-signal" :
                  u.role === "client" ? "bg-blue-500/10 text-blue-400" :
                  "bg-purple-500/10 text-purple-400"
                }`}>{u.role}</span>
              </div>
              <p className="text-sm text-ink/60">{u.email} {u.company ? `· ${u.company}` : ""}</p>
              <p className="text-xs text-ink/30 font-mono mt-0.5">ID: {u._id}</p>
            </div>
            <div className="flex gap-2 items-center shrink-0">
              <select value={u.role} onChange={(e) => updateRole({ email: u.email, role: e.target.value as "admin" | "client" | "lead", token })}
                className="bg-paper border border-mist rounded-xl px-3 py-1.5 text-xs font-mono text-ink/60 outline-none"
              >
                <option value="lead">Lead</option>
                <option value="client">Client</option>
                <option value="admin">Admin</option>
              </select>
              <button onClick={() => { if (confirm(`Delete user ${u.name}?`)) removeUser({ userId: u._id, token }); }}
                className="text-xs text-red-400/60 hover:text-red-400 font-mono px-2"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
