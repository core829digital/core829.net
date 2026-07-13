import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./authHelpers";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("caseStudies").take(50);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("caseStudies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const create = mutation({
  args: {
    slug: v.string(),
    client: v.string(),
    summary: v.string(),
    metric: v.number(),
    metricLabel: v.string(),
    serviceTags: v.array(v.string()),
    content: v.string(),
    published: v.boolean(),
    token: v.string(),
    gallery: v.optional(v.array(v.string())),
    heroAssetUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { token: _t, ...fields } = args;
    return await ctx.db.insert("caseStudies", {
      ...fields,
      gallery: fields.gallery || [],
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("caseStudies"),
    token: v.string(),
    slug: v.optional(v.string()),
    client: v.optional(v.string()),
    summary: v.optional(v.string()),
    metric: v.optional(v.number()),
    metricLabel: v.optional(v.string()),
    serviceTags: v.optional(v.array(v.string())),
    content: v.optional(v.string()),
    published: v.optional(v.boolean()),
    gallery: v.optional(v.array(v.string())),
    heroAssetUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const { id, token: _t, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("caseStudies"), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
