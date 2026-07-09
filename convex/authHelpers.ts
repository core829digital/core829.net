import { QueryCtx, MutationCtx } from "./_generated/server";

export async function requireSession(
  ctx: QueryCtx | MutationCtx,
  token: string
) {
  const session = await ctx.db
    .query("sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Unauthorized");
  }
  const user = await ctx.db.get(session.userId);
  if (!user) throw new Error("Unauthorized");
  return user;
}

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
  token: string
) {
  const user = await requireSession(ctx, token);
  if (user.role !== "admin") throw new Error("Forbidden");
  return user;
}
