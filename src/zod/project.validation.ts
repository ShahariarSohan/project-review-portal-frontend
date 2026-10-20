import { z } from "zod";

export const createProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),
  repoUrl: z
    .string()
    .trim()
    .min(1, "GitHub repository URL is required")
    .url("Please provide a valid URL")
    .regex(
      /^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/,
      "Must be a valid GitHub repository URL (e.g., https://github.com/owner/repo)"
    ),
  liveUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => !val || /^https:\/\/.+/.test(val),
      "Live demo link must be a valid secure URL starting with https://"
    ),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(3000, "Description cannot exceed 3000 characters"),
});

export const reviewProjectSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"], {
    message: "Status must be either APPROVED or REJECTED",
  }),
  reviewNotes: z
    .string()
    .trim()
    .max(2000, "Review feedback cannot exceed 2000 characters")
    .optional(),
});

export type CreateProjectFormData = z.infer<typeof createProjectSchema>;
export type ReviewProjectFormData = z.infer<typeof reviewProjectSchema>;