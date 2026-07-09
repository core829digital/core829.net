"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import type { ActionCtx } from "./_generated/server";
import { api } from "./_generated/api";
import { contactSubmitSchema } from "./validation";

export const submit = action({
  args: {
    userId: v.optional(v.id("users")),
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    serviceInterest: v.string(),
    budget: v.optional(v.string()),
    timeline: v.optional(v.string()),
    message: v.optional(v.string()),
    projectType: v.optional(v.string()),
  },
  handler: async (ctx: ActionCtx, args) => {
    const parsed = contactSubmitSchema.safeParse(args);
    if (!parsed.success) throw new Error(parsed.error.issues[0].message);

    const data = parsed.data;
    const description = data.message || data.projectType || "No details provided";

    await ctx.runMutation(api.leads.create, {
      name: data.name,
      email: data.email,
      company: data.company,
      serviceInterest: data.serviceInterest,
      message: data.message,
    });

    await ctx.runMutation(api.projectRequests.create, {
      userId: args.userId,
      name: data.name,
      email: data.email,
      company: data.company,
      serviceInterest: data.serviceInterest,
      budget: data.budget,
      timeline: data.timeline,
      description,
    });

    if (process.env.RESEND_API_KEY?.startsWith("re_")) {
      try {
        const { Resend } = await import("resend");
        const serviceName = data.serviceInterest === "not-sure" ? "Not sure yet" : data.serviceInterest;

        await new Resend(process.env.RESEND_API_KEY).emails.send({
          from: "Core829 <noreply@core829.net>",
          to: ["contact.core829@gmail.com"],
          subject: `New project request: ${serviceName}`,
          html: `
            <h2>New project request received</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">Name</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.name}</td></tr>
              <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">Email</td><td style="padding:8px 12px;border:1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              ${data.company ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">Company</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.company}</td></tr>` : ""}
              <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">Service interest</td><td style="padding:8px 12px;border:1px solid #ddd;">${serviceName}</td></tr>
              ${data.budget ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">Budget</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.budget}</td></tr>` : ""}
              ${data.timeline ? `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">Timeline</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.timeline}</td></tr>` : ""}
              <tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:600;">Message</td><td style="padding:8px 12px;border:1px solid #ddd;">${data.message || data.projectType || "—"}</td></tr>
            </table>
            <p style="margin-top:24px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://core829.net"}/admin/requests" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;display:inline-block;">
                View in admin panel
              </a>
            </p>
          `,
        });
      } catch (emailErr) {
        console.error("Failed to send notification email:", emailErr);
      }
    }

    return { success: true };
  },
});
