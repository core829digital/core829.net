import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";
import { requireAdmin } from "./authHelpers";

export const getUserByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();
  },
});

export const createUser = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("client"), v.literal("lead")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      email: args.email,
      passwordHash: args.passwordHash,
      name: args.name,
      role: args.role,
      createdAt: Date.now(),
    });
  },
});

export const createSession = mutation({
  args: {
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("sessions", {
      userId: args.userId,
      token: args.token,
      expiresAt: args.expiresAt,
      createdAt: Date.now(),
    });
  },
});

export const deleteSession = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});

export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) return null;
    if (session.expiresAt < Date.now()) return null;

    const user = await ctx.db.get(session.userId);
    if (!user) return null;

    return { userId: user._id, role: user.role, name: user.name, email: user.email };
  },
});

export const getRateLimits = query({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .collect();
  },
});

export const recordFailedAttempt = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    const now = Date.now();
    const MAX_LOGIN_ATTEMPTS = 5;
    const RATE_LIMIT_BLOCK_MS = 30 * 60 * 1000;

    if (!existing) {
      await ctx.db.insert("rateLimits", {
        key: args.key,
        attempts: 1,
        lastAttempt: now,
      });
      return;
    }

    const newAttempts = existing.attempts + 1;
    const blockUntil = newAttempts >= MAX_LOGIN_ATTEMPTS ? now + RATE_LIMIT_BLOCK_MS : undefined;

    await ctx.db.patch(existing._id, {
      attempts: newAttempts,
      lastAttempt: now,
      blockedUntil: blockUntil,
    });
  },
});

export const clearRateLimit = mutation({
  args: { key: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("rateLimits")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (existing) {
      await ctx.db.delete(existing._id);
    }
  },
});

export const cleanExpiredSessions = mutation({
  args: {},
  handler: async (ctx) => {
    const sessions = await ctx.db.query("sessions").collect();
    const now = Date.now();
    for (const session of sessions) {
      if (session.expiresAt < now) {
        await ctx.db.delete(session._id);
      }
    }
  },
});

export const createPasswordResetToken = mutation({
  args: { email: v.string(), token: v.string(), expiresAt: v.number() },
  handler: async (ctx, args) => {
    await ctx.db.insert("passwordResetTokens", {
      email: args.email,
      token: args.token,
      expiresAt: args.expiresAt,
      used: false,
    });
  },
});

export const consumePasswordResetToken = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const entry = await ctx.db
      .query("passwordResetTokens")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!entry) throw new Error("Invalid or expired token");
    if (entry.used) throw new Error("Token already used");
    if (entry.expiresAt < Date.now()) throw new Error("Token expired");
    await ctx.db.patch(entry._id, { used: true });
    return { email: entry.email };
  },
});

export const updatePassword = mutation({
  args: { email: v.string(), passwordHash: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, { passwordHash: args.passwordHash });
  },
});

export const updateRole = mutation({
  args: { email: v.string(), role: v.union(v.literal("admin"), v.literal("client"), v.literal("lead")), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, { role: args.role });
  },
});

export const list = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const users = await ctx.db.query("users").collect();
    return users.map((u) => {
      const { passwordHash, ...rest } = u;
      return rest;
    });
  },
});

export const remove = mutation({
  args: { userId: v.id("users"), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.userId);
  },
});
