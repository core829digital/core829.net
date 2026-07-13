import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin, requireSession } from "./authHelpers";
import { createProjectRequestSchema } from "./validation";

export const list = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return [];
    await requireAdmin(ctx, args.token);
    return await ctx.db.query("projectRequests").withIndex("by_createdAt").order("desc").take(100);
  },
});

export const getByUser = query({
  args: { userId: v.id("users"), token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return [];
    const user = await requireSession(ctx, args.token);
    if (user.role !== "admin" && user._id !== args.userId) return [];
    return await ctx.db
      .query("projectRequests")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .take(50);
  },
});

export const create = mutation({
  args: {
    userId: v.optional(v.id("users")),
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneCountryCode: v.optional(v.string()),
    clientType: v.optional(v.union(v.literal("company"), v.literal("private"))),
    serviceInterest: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const parsed = createProjectRequestSchema.safeParse(args);
    if (!parsed.success) throw new Error(parsed.error.issues[0].message);
    return await ctx.db.insert("projectRequests", {
      ...parsed.data,
      userId: args.userId,
      status: "new",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("projectRequests"),
    status: v.union(
      v.literal("new"),
      v.literal("reviewing"),
      v.literal("quoted"),
      v.literal("approved"),
      v.literal("declined")
    ),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.id, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("projectRequests"), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});
