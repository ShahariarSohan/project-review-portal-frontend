import { z } from "zod";

export const createMentorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(60, "Name cannot exceed 60 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .email("Please provide a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(["ACTIVE", "SUSPENDED", "BANNED"], {
    message: "Status must be ACTIVE, SUSPENDED, or BANNED",
  }),
});

export type CreateMentorFormData = z.infer<typeof createMentorSchema>;
export type UpdateUserStatusFormData = z.infer<typeof updateUserStatusSchema>;
