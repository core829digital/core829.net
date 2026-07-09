import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./authHelpers";
import { createLeadSchema } from "./validation";

export const list = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return [];
    await requireAdmin(ctx, args.token);
    return await ctx.db.query("leads").withIndex("by_createdAt").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneCountryCode: v.optional(v.string()),
    clientType: v.optional(v.union(v.literal("company"), v.literal("private"))),
    serviceInterest: v.string(),
    message: v.optional(v.string()),
    rentableAppId: v.optional(v.id("rentableApps")),
  },
  handler: async (ctx, args) => {
    const parsed = createLeadSchema.safeParse(args);
    if (!parsed.success) throw new Error(parsed.error.issues[0].message);
    const now = Date.now();
    return await ctx.db.insert("leads", {
      ...parsed.data,
      status: "new",
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("leads"),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("closed")
    ),
    token: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.token) throw new Error("Forbidden");
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("leads"), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
