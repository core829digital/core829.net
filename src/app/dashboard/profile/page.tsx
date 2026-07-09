"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useConvex, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/Toast";
import { getSessionToken } from "@/lib/cookie";

export default function ProfilePage() {
  const convex = useConvex();
  const router = useRouter();
  const { toast } = useToast();
  const token = getSessionToken();
  const session = useQuery(api.auth.validateSession, token ? { token } : "skip");
  const user = useQuery(
    api.profile.getProfile,
    token && session ? { token, userId: session.userId } : "skip"
  ) as Doc<"users"> | null;
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (user && !initialized.current) {
      setName(user.name);
      setCompany(user.company ?? "");
      initialized.current = true;
    }
  }, [user]);

  if (session === undefined || user === undefined) {
    return (
      <div className="flex items-center justify-center py-40">
        <p className="text-ink/60 font-mono text-sm">Loading...</p>
      </div>
    );
  }
  if (session === null) {
    router.push("/login?redirect=/dashboard/profile");
    return null;
  }
  if (user === null) {
    return (
      <div className="flex items-center justify-center py-40">
        <div className="text-center">
          <p className="text-ink/60 font-mono text-sm">Could not load profile.</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2.5 bg-signal text-ink text-xs font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    try {
      const token = getSessionToken() ?? "";
      await convex.mutation(api.profile.updateProfile, {
        userId: user._id,
        name: name.trim(),
        company: company.trim() || undefined,
        token,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      toast("Failed to save profile", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-[640px] mx-auto px-6 py-8">
        <span className="font-mono text-signal text-xs tracking-[0.2em] uppercase">Settings</span>
        <h1 className="text-display text-3xl md:text-5xl tracking-tight mt-2 mb-12">Profile</h1>

        <div className="space-y-8">
          <div>
            <label htmlFor="profile-name" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Name</label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-graphite border border-mist rounded-2xl px-5 py-3.5 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
            />
          </div>

          <div>
            <label htmlFor="profile-email" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Email</label>
            <input
              id="profile-email"
              type="email"
              value={user.email}
              disabled
              className="w-full bg-graphite border border-mist rounded-2xl px-5 py-3.5 text-ink/50 outline-none cursor-not-allowed"
            />
            <p className="text-xs text-ink/30 mt-1.5 font-mono">Email cannot be changed.</p>
          </div>

          <div>
            <label htmlFor="profile-company" className="block text-xs font-mono uppercase tracking-wider text-ink/50 mb-2">Company</label>
            <input
              id="profile-company"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full bg-graphite border border-mist rounded-2xl px-5 py-3.5 text-ink placeholder:text-ink/20 outline-none focus:border-signal transition-colors"
            />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-signal text-ink text-sm font-mono uppercase tracking-wider rounded-full hover:bg-signal-dim transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            {saved && <span className="text-sm text-green-400 font-mono">Saved!</span>}
            <a
              href="/dashboard"
              className="text-sm font-mono uppercase tracking-wider text-ink/50 hover:text-ink transition-colors"
            >
              Back to dashboard
            </a>
          </div>
        </div>
      </div>
  );
}
