"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import type { ActionCtx } from "./_generated/server";
import { internal } from "./_generated/api";
import crypto from "crypto";
import { signupSchema, loginSchema, passwordResetSchema, confirmResetSchema } from "./validation";

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;

function generateToken(): string {
  return crypto.randomBytes(48).toString("hex");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callQuery(ctx: ActionCtx, fn: any, args: Record<string, unknown>) {
  return ctx.runQuery(fn, args);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function callMutation(ctx: ActionCtx, fn: any, args: Record<string, unknown>) {
  return ctx.runMutation(fn, args);
}

async function hashPassword(password: string): Promise<string> {
  const { hash } = await import("argon2");
  return hash(password, {
    type: 2,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
}

async function verifyAndUpgradeHash(
  hash: string,
  password: string
): Promise<{ ok: boolean; newHash?: string }> {
  if (hash.startsWith("$2")) {
    const bcrypt = await import("bcryptjs");
    const valid = await bcrypt.compare(password, hash);
    if (valid) {
      const { hash: argonHash } = await import("argon2");
      const newHash = await argonHash(password, {
        type: 2,
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1,
      });
      return { ok: true, newHash };
    }
    return { ok: false };
  }
  const { verify } = await import("argon2");
  const ok = await verify(hash, password);
  return { ok };
}

export const signup = action({
  args: { email: v.string(), password: v.string(), name: v.string() },
  handler: async (ctx: ActionCtx, args) => {
    const parsed = signupSchema.safeParse(args);
    if (!parsed.success) throw new Error(parsed.error.issues[0].message);

    const key = `signup:${parsed.data.email}`;
    const limits = await callQuery(ctx, internal.auth.getRateLimits, { key });
    if (limits.length > 0 && limits[0].attempts >= 3) {
      throw new Error("Too many attempts. Try again later.");
    }

    const existing = await callQuery(ctx, internal.auth.getUserByEmail, { email: parsed.data.email });
    if (existing) {
      await callMutation(ctx, internal.auth.recordFailedAttempt, { key });
      throw new Error("Email already registered");
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const userId = await callMutation(ctx, internal.auth.createUser, {
      email: parsed.data.email,
      passwordHash,
      name: parsed.data.name,
      role: "lead",
    });

    const token = generateToken();
    await callMutation(ctx, internal.auth.createSession, {
      userId,
      token,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    });

    return { token, userId, role: "lead" };
  },
});

export const login = action({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx: ActionCtx, args) => {
    const parsed = loginSchema.safeParse(args);
    if (!parsed.success) throw new Error("Invalid email or password");

    const key = `login:${parsed.data.email}`;
    const limits = await callQuery(ctx, internal.auth.getRateLimits, { key });

    if (limits.length > 0) {
      const e = limits[0];
      if (e.blockedUntil && e.blockedUntil > Date.now())
        throw new Error("Too many attempts. Try again later.");
      if (e.attempts >= MAX_LOGIN_ATTEMPTS)
        throw new Error("Too many attempts. Try again later.");
    }

    const user = await callQuery(ctx, internal.auth.getUserByEmail, {
      email: parsed.data.email,
    });
    if (!user) {
      await callMutation(ctx, internal.auth.recordFailedAttempt, { key });
      throw new Error("Invalid email or password");
    }

    const result = await verifyAndUpgradeHash(user.passwordHash, parsed.data.password);
    if (!result.ok) {
      await callMutation(ctx, internal.auth.recordFailedAttempt, { key });
      throw new Error("Invalid email or password");
    }

    if (result.newHash) {
      await callMutation(ctx, internal.auth.updatePassword, {
        email: parsed.data.email,
        passwordHash: result.newHash,
      });
    }

    await callMutation(ctx, internal.auth.clearRateLimit, { key });

    const token = generateToken();
    await callMutation(ctx, internal.auth.createSession, {
      userId: user._id,
      token,
      expiresAt: Date.now() + SESSION_DURATION_MS,
    });

    return { token, userId: user._id, role: user.role, name: user.name };
  },
});

export const requestPasswordReset = action({
  args: { email: v.string() },
  handler: async (ctx: ActionCtx, args) => {
    const parsed = passwordResetSchema.safeParse(args);
    if (!parsed.success) return { success: true };

    const key = `reset:${parsed.data.email.toLowerCase()}`;
    const limits = await callQuery(ctx, internal.auth.getRateLimits, { key });
    if (limits.length > 0) {
      const e = limits[0];
      if (e.blockedUntil && e.blockedUntil > Date.now()) {
        return { success: true };
      }
      if (e.attempts >= 3) {
        return { success: true };
      }
    }
    await callMutation(ctx, internal.auth.recordFailedAttempt, { key });

    const user = await callQuery(ctx, internal.auth.getUserByEmail, {
      email: parsed.data.email,
    });
    if (!user) return { success: true };

    const token = generateToken();
    await callMutation(ctx, internal.auth.createPasswordResetToken, {
      email: parsed.data.email,
      token,
      expiresAt: Date.now() + 3600000,
    });

    if (process.env.RESEND_API_KEY?.startsWith("re_")) {
      try {
        const { Resend } = await import("resend");
        await new Resend(process.env.RESEND_API_KEY).emails.send({
          from: "Core829 <noreply@core829.net>",
          to: parsed.data.email,
          subject: "Password Reset - Core829",
          html: `<a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://core829.net"}/reset-password?token=${token}">Reset your password</a>`,
        });
      } catch {
        // Email failure is non-critical for password reset flow
      }
    }

    return { success: true };
  },
});

export const confirmPasswordReset = action({
  args: { token: v.string(), newPassword: v.string() },
  handler: async (ctx: ActionCtx, args) => {
    const parsed = confirmResetSchema.safeParse(args);
    if (!parsed.success) throw new Error(parsed.error.issues[0].message);

    const { email } = await callMutation(ctx, internal.auth.consumePasswordResetToken, {
      token: parsed.data.token,
    });

    const passwordHash = await hashPassword(parsed.data.newPassword);
    await callMutation(ctx, internal.auth.updatePassword, {
      email,
      passwordHash,
    });
  },
});
