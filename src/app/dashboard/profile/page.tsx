"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { useToast } from "@/components/ui/Toast";
import { getSessionToken } from "@/lib/cookie";

export default function ProfilePage() {
  const convex = useConvex();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<Doc<"users"> | null>(null);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((r) => r.startsWith("session_token_client="))
          ?.split("=")[1];
        if (!token) {
          router.push("/login?redirect=/dashboard/profile");
          return;
        }

        const session = await convex.query(api.auth.validateSession, { token });
        if (!session) {
          router.push("/login?redirect=/dashboard/profile");
          return;
        }

        const profile = await convex.query(api.profile.getProfile, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          userId: session.userId as any,
        });
        if (profile) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setUser(profile as any);
          setName(profile.name);
          setCompany(profile.company ?? "");
        }
      } catch {
        toast("Failed to load profile", "error");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [convex, router, toast]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-40">
        <p className="text-ink/60 font-mono text-sm">Loading...</p>
      </div>
    );
  }

  if (!user) {
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
