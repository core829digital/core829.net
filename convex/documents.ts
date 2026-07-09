import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireSession } from "./authHelpers";

export const list = query({
  args: { projectId: v.id("projects"), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    const project = await ctx.db.get(args.projectId);
    if (!project) return [];
    if (user.role !== "admin" && project.clientUserId !== user._id) return [];
    return await ctx.db
      .query("projectDocuments")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const upload = mutation({
  args: {
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    storageId: v.string(),
    uploadedBy: v.id("users"),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    const { token: _, ...fields } = args;
    return await ctx.db.insert("projectDocuments", {
      ...fields,
      createdAt: Date.now(),
    });
  },
});

export const generateUploadUrl = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    return await ctx.storage.generateUploadUrl();
  },
});

export const remove = mutation({
  args: { id: v.id("projectDocuments"), token: v.string() },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.delete(args.id);
  },
});

export const checkStorageAccess = query({
  args: { storageId: v.string(), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    if (user.role === "admin") return true;

    const doc = await ctx.db
      .query("projectDocuments")
      .filter((q) => q.eq(q.field("storageId"), args.storageId))
      .first();
    if (doc) {
      const project = await ctx.db.get(doc.projectId);
      return !!project && project.clientUserId === user._id;
    }

    const quote = await ctx.db
      .query("quotes")
      .filter((q) => q.eq(q.field("pdfStorageId"), args.storageId))
      .first();
    if (quote) {
      return quote.userId === user._id;
    }

    return false;
  },
});
