"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useConvex } from "convex/react";
import { api } from "../../../convex/_generated/api";

function ResetForm() {
  const searchParams = useSearchParams();
  const convex = useConvex();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const resetToken = searchParams.get("token");
  const isConfirming = !!resetToken;

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await convex.action(api.auth_actions.requestPasswordReset, { email });
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await convex.action(api.auth_actions.confirmPasswordReset, {
        token: resetToken!,
        newPassword: password,
      });
      setSent(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <section className="min-h-dvh flex items-center justify-center pt-20">
        <div className="w-full max-w-md px-6 text-center">
          <h1 className="text-display text-4xl tracking-tight">
            {isConfirming ? "Password updated" : "Check your email"}
          </h1>
          <p className="mt-4 text-ink/50">
            {isConfirming
              ? "Your password has been reset. You can now log in."
              : "If an account exists with that email, you'll receive a password reset link shortly."}
          </p>
        </div>
      </section>
    );
  }

  if (isConfirming) {
    return (
      <section className="min-h-dvh flex items-center justify-center pt-20">
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-10">
            <h1 className="text-display text-4xl md:text-5xl tracking-tight">Set new password</h1>
          </div>
          <form onSubmit={handleConfirmReset} className="space-y-5">
            {error && (
              <div role="alert" className="p-4 rounded-xl bg-signal/5 border border-signal/20 text-sm text-signal">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="reset-password-new" className="block text-xs font-mono uppercase tracking-wider text-ink/40 mb-2">
                New password
              </label>
              <input
                id="reset-password-new"
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
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-dvh flex items-center justify-center pt-20">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-10">
          <h1 className="text-display text-4xl md:text-5xl tracking-tight">Reset password</h1>
          <p className="mt-4 text-ink/50 text-sm">Enter your email and we&apos;ll send you a reset link.</p>
        </div>
        <form onSubmit={handleRequestReset} className="space-y-5">
          {error && (
            <div role="alert" className="p-4 rounded-xl bg-signal/5 border border-signal/20 text-sm text-signal">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="reset-email" className="block text-xs font-mono uppercase tracking-wider text-ink/40 mb-2">
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 rounded-xl border border-mist bg-graphite text-sm focus:outline-none focus:border-signal"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-signal text-ink text-sm font-mono uppercase tracking-wider hover:bg-signal-dim transition-colors disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh flex items-center justify-center"><p className="text-ink/60">Loading...</p></div>}>
      <ResetForm />
    </Suspense>
  );
}
