"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function SignupPage() {
  const router = useRouter();
  const convex = useConvex();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await convex.action(api.auth_actions.signup, {
        email,
        password,
        name,
      });
      await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: result.token }),
      });
      router.push(result.role === "admin" ? "/admin" : "/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-dvh flex items-center justify-center pt-20">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-10">
          <span className="font-mono text-signal text-xs uppercase tracking-[0.2em]">Access</span>
          <h1 className="text-display text-4xl md:text-5xl tracking-tight mt-4">Create account</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div role="alert" className="p-4 rounded-xl bg-signal/5 border border-signal/20 text-sm text-signal">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="signup-name" className="block text-xs font-mono uppercase tracking-wider text-ink/40 mb-2">
              Name
            </label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-mist bg-graphite text-sm focus:outline-none focus:border-signal"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-xs font-mono uppercase tracking-wider text-ink/40 mb-2">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-mist bg-graphite text-sm focus:outline-none focus:border-signal"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-xs font-mono uppercase tracking-wider text-ink/40 mb-2">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full p-4 rounded-xl border border-mist bg-graphite text-sm focus:outline-none focus:border-signal"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-signal text-ink text-sm font-mono uppercase tracking-wider hover:bg-signal-dim transition-colors disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
          <p className="text-center text-xs text-ink/40">
            Already have an account?{" "}
            <Link href="/login" className="text-signal hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
