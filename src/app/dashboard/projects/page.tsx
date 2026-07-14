"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
import { ListSkeleton } from "@/components/ui/DashboardSkeleton";

export default function ClientProjects() {
  const token = getSessionToken();
  const session = useQuery(api.auth.validateSession, token ? { token } : "skip");
  const projects = useQuery(
    api.projects.getByUser,
    token && session ? { userId: session.userId, token } : "skip"
  ) ?? [];

  if (session === undefined) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 animate-pulse">
            <div className="h-3 w-16 bg-white/5 rounded-full" />
            <div className="h-6 w-36 bg-white/10 rounded-lg" />
          </div>
          <div className="h-9 w-24 bg-white/5 animate-pulse rounded-xl" />
        </div>
        <ListSkeleton rows={3} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-display text-3xl tracking-tight">Projects</h1>
          <p className="text-ink/50 text-sm mt-1">{projects.length} total projects</p>
        </div>
        <Link href="/contact"
          className="px-4 py-2 bg-signal text-ink text-xs font-mono rounded-xl hover:bg-signal-dim transition-colors"
        >New Project</Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-graphite rounded-2xl border border-mist p-12 text-center">
          <p className="text-ink/60 font-mono text-sm">No projects yet.</p>
          <Link href="/contact" className="text-signal text-sm mt-2 inline-block hover:underline">Start a new project &rarr;</Link>
        </div>
      ) : (
        <div className="space-y-2">
          {projects.map((p) => (
            <Link key={p._id} href={`/dashboard/projects/${p._id}`}
              className="bg-graphite rounded-2xl border border-mist p-5 flex items-center justify-between gap-4 hover:border-white/20 transition-colors group"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="font-medium">{p.name}</p>
                  <span className="text-xs font-mono px-2.5 py-0.5 bg-white/5 rounded-full text-ink/60">{p.stage}</span>
                </div>
                {p.description && <p className="text-sm text-ink/60 line-clamp-1">{p.description}</p>}
                <div className="flex gap-3 mt-2 text-xs text-ink/40">
                  {p.price && <span className="text-signal font-mono">{p.currency}{p.price.toLocaleString()}</span>}
                  <span>{p.teamMemberIds.length} team members</span>
                  {p.timeline.length > 0 && <span>Updated: {new Date(p.timeline[p.timeline.length - 1].date).toLocaleDateString("it-IT")}</span>}
                </div>
              </div>
              <span className="text-signal text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
