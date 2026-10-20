"use server";

import { serverFetch } from "@/lib/serverFetch";

export interface IProjectSubmissionItem {
  id: string;
  title: string;
  repoUrl: string;
  liveUrl?: string | null;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewNotes?: string | null;
  createdAt: string;
  updatedAt: string;
  reviewer?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export const getMySubmissions = async (): Promise<IProjectSubmissionItem[]> => {
  try {
    const res = await serverFetch.get("/projects/my-submissions");
    const result = await res.json();
    if (result.success && Array.isArray(result.data)) {
      return result.data;
    }
    return [];
  } catch (err) {
    console.error("Failed to fetch student submissions:", err);
    return [];
  }
};

export default getMySubmissions;