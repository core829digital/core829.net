import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireSession, requireAdmin } from "./authHelpers";

export const list = query({
  args: { token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return [];
    const user = await requireSession(ctx, args.token);
    if (user.role === "admin") {
      return await ctx.db.query("projects").order("desc").take(100);
    }
    if (!user._id) return [];
    return await ctx.db
      .query("projects")
      .withIndex("by_clientUserId", (q) => q.eq("clientUserId", user._id))
      .order("desc")
      .take(50);
  },
});

export const getByClient = query({
  args: { clientId: v.id("clients"), token: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.token) return [];
    const user = await requireSession(ctx, args.token);
    const client = await ctx.db.get(args.clientId);
    if (!client) return [];
    if (user.role !== "admin" && client.userId !== user._id) return [];
    return await ctx.db
      .query("projects")
      .withIndex("by_clientId", (q) => q.eq("clientId", args.clientId))
      .take(50);
  },
});

export const create = mutation({
  args: {
    clientId: v.id("clients"),
    name: v.string(),
    description: v.optional(v.string()),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    return await ctx.db.insert("projects", {
      clientId: args.clientId,
      name: args.name,
      description: args.description,
      currency: "EUR",
      status: "intake",
      stage: "Intake",
      teamMemberIds: [],
      timeline: [{ date: Date.now(), event: "Project created" }],
      invoices: [],
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("projects"),
    status: v.union(
      v.literal("intake"),
      v.literal("scope"),
      v.literal("design"),
      v.literal("build"),
      v.literal("qa"),
      v.literal("launch"),
      v.literal("support")
    ),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const assignTeamMember = mutation({
  args: {
    projectId: v.id("projects"),
    teamMemberId: v.id("teamMembers"),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    const current = project.teamMemberIds;
    if (current.includes(args.teamMemberId)) return;
    await ctx.db.patch(args.projectId, {
      teamMemberIds: [...current, args.teamMemberId],
    });
  },
});

export const removeTeamMember = mutation({
  args: {
    projectId: v.id("projects"),
    teamMemberId: v.id("teamMembers"),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    await ctx.db.patch(args.projectId, {
      teamMemberIds: project.teamMemberIds.filter((id) => id !== args.teamMemberId),
    });
  },
});

export const addTimelineEvent = mutation({
  args: {
    projectId: v.id("projects"),
    event: v.string(),
    token: v.string(),
  },
  handler: async (ctx, args) => {
    await requireSession(ctx, args.token);
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    await ctx.db.patch(args.projectId, {
      timeline: [...project.timeline, { date: Date.now(), event: args.event }],
    });
  },
});

export const getByUser = query({
  args: { userId: v.id("users"), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    if (user.role !== "admin" && user._id !== args.userId) return [];
    return await ctx.db
      .query("projects")
      .withIndex("by_clientUserId", (q) => q.eq("clientUserId", args.userId))
      .take(50);
  },
});

export const getById = query({
  args: { projectId: v.id("projects"), token: v.string() },
  handler: async (ctx, args) => {
    const user = await requireSession(ctx, args.token);
    const project = await ctx.db.get(args.projectId);
    if (!project) throw new Error("Project not found");
    if (user.role !== "admin" && project.clientUserId !== user._id) throw new Error("Forbidden");
    return project;
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    token: v.string(),
    price: v.optional(v.number()),
    currency: v.optional(v.string()),
    iban: v.optional(v.string()),
    status: v.optional(v.union(
      v.literal("intake"),
      v.literal("scope"),
      v.literal("design"),
      v.literal("build"),
      v.literal("qa"),
      v.literal("launch"),
      v.literal("support")
    )),
    stage: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { projectId, token, ...fields } = args;
    await requireSession(ctx, token);
    const patch: Record<string, unknown> = {};
    if (fields.price !== undefined) patch.price = fields.price;
    if (fields.currency !== undefined) patch.currency = fields.currency;
    if (fields.iban !== undefined) patch.iban = fields.iban;
    if (fields.status !== undefined) patch.status = fields.status;
    if (fields.stage !== undefined) patch.stage = fields.stage;
    if (fields.name !== undefined) patch.name = fields.name;
    if (fields.description !== undefined) patch.description = fields.description;
    await ctx.db.patch(projectId, patch);
  },
});

export const remove = mutation({
  args: { projectId: v.id("projects"), token: v.string() },
  handler: async (ctx, args) => {
    await requireAdmin(ctx, args.token);
    await ctx.db.delete(args.projectId);
  },
});
