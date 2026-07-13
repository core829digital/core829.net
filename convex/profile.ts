import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireSession } from "./authHelpers";

export const getProfile = query({
  args: { token: v.string(), userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    const caller = await requireSession(ctx, args.token);
    const targetId = args.userId ?? caller._id;
    if (caller.role !== "admin" && caller._id !== targetId) throw new Error("Forbidden");
    const user = await ctx.db.get(targetId);
    if (!user) return null;
    const clientRecord = await ctx.db
      .query("clients")
      .withIndex("by_userId", (q) => q.eq("userId", targetId))
      .first();
    const { passwordHash: _hash, ...safeUser } = user;
    return { ...safeUser, client: clientRecord ?? null };
  },
});

export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    company: v.optional(v.string()),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, name, company, token } = args;
    const caller = await requireSession(ctx, token);
    if (caller._id !== userId && caller.role !== "admin") throw new Error("Forbidden");
    const patch: Record<string, unknown> = {};
    if (name !== undefined) patch.name = name;
    if (company !== undefined) patch.company = company;
    if (Object.keys(patch).length > 0) await ctx.db.patch(userId, patch);
  },
});
