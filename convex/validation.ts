import { z } from "zod";

export const emailSchema = z.string().email().max(255).transform((v) => v.toLowerCase().trim());

export const signupSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  name: z.string().min(1, "Name is required").max(100).trim(),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
});

export const createLeadSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: emailSchema,
  company: z.string().max(200).trim().optional(),
  serviceInterest: z.string().min(1).max(100),
  message: z.string().max(5000).trim().optional(),
});

export const createProjectRequestSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: emailSchema,
  company: z.string().max(200).trim().optional(),
  serviceInterest: z.string().min(1).max(100),
  budget: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
  description: z.string().min(1).max(10000),
});

export const contactSubmitSchema = z.object({
  userId: z.string().optional(),
  name: z.string().min(1).max(200).trim(),
  email: emailSchema,
  company: z.string().max(200).trim().optional(),
  serviceInterest: z.string().min(1).max(100),
  budget: z.string().max(100).optional(),
  timeline: z.string().max(100).optional(),
  message: z.string().max(5000).trim().optional(),
  projectType: z.string().max(200).trim().optional(),
});

export const passwordResetSchema = z.object({
  email: emailSchema,
});

export const confirmResetSchema = z.object({
  token: z.string().min(1).max(256),
  newPassword: z.string().min(8, "Password must be at least 8 characters").max(128),
});
