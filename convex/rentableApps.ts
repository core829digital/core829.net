import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./authHelpers";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("rentableApps").take(50);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("rentableApps")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    tagline: v.string(),
    description: v.string(),
    monthlyPrice: v.number(),
    features: v.array(v.string()),
    active: v.boolean(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _t, ...fields } = args;
    return await ctx.db.insert("rentableApps", {
      ...fields,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("rentableApps"),
    token: v.string(),
    name: v.optional(v.string()),
    slug: v.optional(v.string()),
    category: v.optional(v.string()),
    tagline: v.optional(v.string()),
    description: v.optional(v.string()),
    monthlyPrice: v.optional(v.number()),
    features: v.optional(v.array(v.string())),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { id, token: _t, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("rentableApps"), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
