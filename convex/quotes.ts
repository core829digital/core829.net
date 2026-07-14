import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireSession, requireAdmin } from "./authHelpers";

export const list = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    if (user.role === "admin") {
      return await ctx.db.query("quotes").order("desc").take(200);
    }
    return await ctx.db
      .query("quotes")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .order("desc")
      .take(200);
  },
});

export const create = mutation({
  args: {
    userId: v.id("users"),
    projectRequestId: v.optional(v.id("projectRequests")),
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.optional(v.number()),
    currency: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const caller = await requireSession(ctx, args.token);
    if (caller.role !== "admin" && caller._id !== args.userId) throw new Error("Forbidden");
    return await ctx.db.insert("quotes", {
      userId: args.userId,
      projectRequestId: args.projectRequestId,
      title: args.title,
      description: args.description,
      amount: args.amount,
      currency: args.currency,
      status: "draft",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updatePrice = mutation({
  args: { quoteId: v.id("quotes"), amount: v.number(), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.quoteId, { amount: args.amount, status: "sent", updatedAt: Date.now() });
  },
});

export const updateStatus = mutation({
  args: { quoteId: v.id("quotes"), status: v.union(v.literal("draft"), v.literal("sent"), v.literal("accepted"), v.literal("rejected")), token: v.string() },
  handler: async (ctx, args) => {
    const quote = await ctx.db.get(args.quoteId);
    if (!quote) throw new Error("Quote not found");
    const user = await requireSession(ctx, args.token);
    if (user.role !== "admin" && quote.userId !== user._id) throw new Error("Forbidden");
    await ctx.db.patch(args.quoteId, { status: args.status, updatedAt: Date.now() });
  },
});

export const updatePdfStorage = mutation({
  args: { quoteId: v.id("quotes"), pdfStorageId: v.string(), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.patch(args.quoteId, { pdfStorageId: args.pdfStorageId });
  },
});

export const get = query({
  args: { quoteId: v.id("quotes"), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    const quote = await ctx.db.get(args.quoteId);
    if (!quote) throw new Error("Quote not found");
    if (user.role !== "admin" && quote.userId !== user._id) throw new Error("Forbidden");
    return quote;
  },
});

export const remove = mutation({
  args: { quoteId: v.id("quotes"), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    if (user.role !== "admin") throw new Error("Forbidden");
    await ctx.db.delete(args.quoteId);
  },
});
