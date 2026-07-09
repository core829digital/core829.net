import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireSession } from "./authHelpers";

const ALLOWED_TAGS = /<[^>]*>/g;

function sanitize(input: string): string {
  return input.replace(ALLOWED_TAGS, "").trim();
}

export const list = query({
  args: { projectId: v.id("projects"), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    const project = await ctx.db.get(args.projectId);
    if (!project) return [];
    if (user.role !== "admin" && project.clientUserId !== user._id) return [];
    return await ctx.db
      .query("projectMessages")
      .withIndex("by_project", (q) => q.eq("projectId", args.projectId))
      .collect();
  },
});

export const send = mutation({
  args: {
    projectId: v.id("projects"),
    senderId: v.id("users"),
    senderRole: v.union(v.literal("admin"), v.literal("client")),
    content: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const content = sanitize(args.content);
    if (content.length === 0) throw new Error("Message cannot be empty");
    if (content.length > 5000) throw new Error("Message too long");

    const caller = await requireSession(ctx, args.token);
    if (caller._id !== args.senderId && caller.role !== "admin") {
      throw new Error("Forbidden");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");

    if (caller.role !== "admin" && project.clientUserId !== caller._id) {
      throw new Error("You can only send messages to your own projects");
    }

    return await ctx.db.insert("projectMessages", {
      projectId: args.projectId,
      senderId: args.senderId,
      senderRole: args.senderRole,
      content,
      createdAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { messageId: v.id("projectMessages"), token: v.string() },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.delete(args.messageId);
  },
});
