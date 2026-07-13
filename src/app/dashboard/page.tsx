"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { getSessionToken } from "@/lib/cookie";
export default function DashboardPage() {
  const router = useRouter();
  const token = getSessionToken();
  const session = useQuery(api.auth.validateSession, token ? { token } : "skip");
  const user = useQuery(
    api.profile.getProfile,
    token && session ? { token, userId: session.userId } : "skip"
  );
  const projects = useQuery(
    api.projects.getByUser,
    token && session ? { userId: session.userId, token } : "skip"
  ) ?? [];
  const quotes = useQuery(api.quotes.list, token ? { token } : "skip") ?? [];

  useEffect(() => {
    if (session === null) {
      router.push("/login?redirect=/dashboard");
    }
  }, [session, router]);

  if (session === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-ink/60 font-mono text-sm">Loading...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
  };

  const activeProjects = projects.filter((p) => p.status !== "support");
  const pendingQuotes = quotes.filter((q) => q.status === "sent" || q.status === "draft");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Dashboard</span>
          <h1 className="text-display text-3xl md:text-4xl tracking-tight mt-2">
            Welcome back, {user?.name?.split(" ")[0] ?? "User"}.
          </h1>
        </div>
        <div className="flex gap-2">
          <Link href="/contact"
            className="px-4 py-2 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
          >New Project</Link>
          <button onClick={handleLogout}
            className="px-4 py-2 border border-mist text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-white/5 transition-colors"
          >Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-graphite rounded-2xl border border-mist p-5">
          <p className="text-ink/40 text-xs font-mono uppercase tracking-wider">Active Projects</p>
          <p className="text-3xl font-semibold mt-1 text-signal">{activeProjects.length}</p>
        </div>
        <div className="bg-graphite rounded-2xl border border-mist p-5">
          <p className="text-ink/40 text-xs font-mono uppercase tracking-wider">Pending Quotes</p>
          <p className="text-3xl font-semibold mt-1 text-amber-400">{pendingQuotes.length}</p>
        </div>
        <div className="bg-graphite rounded-2xl border border-mist p-5">
          <p className="text-ink/40 text-xs font-mono uppercase tracking-wider">Total Projects</p>
          <p className="text-3xl font-semibold mt-1 text-blue-400">{projects.length}</p>
        </div>
      </div>

      {pendingQuotes.length > 0 && (
        <div className="bg-graphite rounded-2xl border border-amber-500/20 p-5">
          <h2 className="text-display text-lg mb-3">Pending Quotes</h2>
          <div className="space-y-2">
            {pendingQuotes.map((q) => (
              <Link key={q._id} href={`/dashboard/quotes/${q._id}`}
                className="flex items-center justify-between p-3 bg-paper rounded-xl hover:bg-white/5 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{q.title}</p>
                  <p className="text-xs text-ink/50">{q.currency}{q.amount ?? "—"} · {q.status}</p>
                </div>
                <span className="text-signal text-xs font-mono uppercase tracking-wider">View &rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-display text-xl">Your Projects</h2>
          <Link href="/dashboard/projects" className="text-signal text-xs font-mono uppercase tracking-wider hover:opacity-80">
            View all &rarr;
          </Link>
        </div>
        {activeProjects.length === 0 ? (
          <div className="bg-graphite rounded-2xl border border-mist p-12 text-center">
            <p className="text-ink/60 font-mono text-sm">No active projects yet.</p>
            <p className="text-ink/40 text-sm mt-2">Submit a request to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProjects.map((project) => (
              <Link key={project._id} href={`/dashboard/projects/${project._id}`}
                className="bg-graphite rounded-2xl border border-mist p-5 hover:border-white/20 transition-colors block"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-display text-lg tracking-tight">{project.name}</h3>
                  <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-0.5 bg-white/5 rounded-full text-ink/60">{project.stage}</span>
                </div>
                {project.description && <p className="text-ink/60 text-sm mb-3 line-clamp-1">{project.description}</p>}
                <div className="flex flex-wrap gap-3 text-xs">
                  {project.price && <span className="text-signal font-mono">{project.currency === "EUR" ? "\u20AC" : "$"}{project.price.toLocaleString()}</span>}
                  <span className="text-ink/40 font-mono">{project.teamMemberIds.length} team members</span>
                  {project.timeline.length > 0 && (
                    <span className="text-ink/40 font-mono">Last: {project.timeline[project.timeline.length - 1].event}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
