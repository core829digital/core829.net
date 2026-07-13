import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("client"), v.literal("lead")),
    createdAt: v.number(),
    company: v.optional(v.string()),
  }).index("by_email", ["email"]),

  sessions: defineTable({
    userId: v.id("users"),
    token: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  }).index("by_token", ["token"]),

  leads: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneCountryCode: v.optional(v.string()),
    clientType: v.optional(v.union(v.literal("company"), v.literal("private"))),
    serviceInterest: v.string(),
    message: v.optional(v.string()),
    rentableAppId: v.optional(v.id("rentableApps")),
    status: v.union(
      v.literal("new"),
      v.literal("contacted"),
      v.literal("qualified"),
      v.literal("converted"),
      v.literal("closed")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  clients: defineTable({
    userId: v.id("users"),
    company: v.string(),
    activeServices: v.array(v.string()),
    contractStart: v.number(),
    monthlyRetainer: v.optional(v.number()),
  }).index("by_userId", ["userId"]),

  teamMembers: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.string(),
    avatarUrl: v.optional(v.string()),
    active: v.boolean(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  projectRequests: defineTable({
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
    status: v.union(
      v.literal("new"),
      v.literal("reviewing"),
      v.literal("quoted"),
      v.literal("approved"),
      v.literal("declined")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_createdAt", ["createdAt"]),

  rentableApps: defineTable({
    name: v.string(),
    slug: v.string(),
    category: v.string(),
    tagline: v.string(),
    description: v.string(),
    monthlyPrice: v.number(),
    features: v.array(v.string()),
    demoAssetUrl: v.optional(v.string()),
    active: v.boolean(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  caseStudies: defineTable({
    slug: v.string(),
    client: v.string(),
    summary: v.string(),
    metric: v.number(),
    metricLabel: v.string(),
    heroAssetUrl: v.optional(v.string()),
    gallery: v.array(v.string()),
    serviceTags: v.array(v.string()),
    content: v.string(),
    published: v.boolean(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  projects: defineTable({
    clientId: v.id("clients"),
    clientUserId: v.optional(v.id("users")),
    name: v.string(),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    currency: v.string(),
    iban: v.optional(v.string()),
    status: v.union(
      v.literal("intake"),
      v.literal("scope"),
      v.literal("design"),
      v.literal("build"),
      v.literal("qa"),
      v.literal("launch"),
      v.literal("support")
    ),
    stage: v.string(),
    teamMemberIds: v.array(v.id("teamMembers")),
    timeline: v.array(
      v.object({
        date: v.number(),
        event: v.string(),
      })
    ),
    invoices: v.array(
      v.object({
        amount: v.number(),
        date: v.number(),
        paid: v.boolean(),
      })
    ),
  })
    .index("by_clientUserId", ["clientUserId"])
    .index("by_clientId", ["clientId"]),

  quotes: defineTable({
    userId: v.id("users"),
    projectRequestId: v.optional(v.id("projectRequests")),
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.optional(v.number()),
    currency: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("sent"),
      v.literal("accepted"),
      v.literal("rejected")
    ),
    pdfStorageId: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_pdfStorageId", ["pdfStorageId"]),

  projectMessages: defineTable({
    projectId: v.id("projects"),
    senderId: v.id("users"),
    senderRole: v.union(v.literal("admin"), v.literal("client")),
    content: v.string(),
    createdAt: v.number(),
  }).index("by_project", ["projectId"]),

  projectDocuments: defineTable({
    projectId: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    storageId: v.string(),
    uploadedBy: v.id("users"),
    createdAt: v.number(),
  })
    .index("by_project", ["projectId"])
    .index("by_storageId", ["storageId"]),

  passwordResetTokens: defineTable({
    email: v.string(),
    token: v.string(),
    expiresAt: v.number(),
    used: v.boolean(),
  }).index("by_token", ["token"]),

  rateLimits: defineTable({
    key: v.string(),
    attempts: v.number(),
    lastAttempt: v.number(),
    blockedUntil: v.optional(v.number()),
  }).index("by_key", ["key"]),
});
