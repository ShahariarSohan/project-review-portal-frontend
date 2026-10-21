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

export interface IProjectSubmissionListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: IProjectSubmissionItem[];
}

export interface IGetMySubmissionsParams {
  page?: string | number;
  limit?: string | number;
  status?: string;
  searchTerm?: string;
}

export const getMySubmissions = async (
  params?: IGetMySubmissionsParams
): Promise<IProjectSubmissionListResponse> => {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.status && params.status !== "ALL") {
      query.set("status", params.status);
    }
    if (params?.searchTerm && params.searchTerm.trim()) {
      query.set("searchTerm", params.searchTerm.trim());
    }

    const queryString = query.toString();
    const endpoint = `/projects/my-submissions${queryString ? `?${queryString}` : ""}`;

    const res = await serverFetch.get(endpoint);
    const result = await res.json();

    if (result.success && Array.isArray(result.data)) {
      return {
        meta: result.meta || {
          page: Number(params?.page) || 1,
          limit: Number(params?.limit) || 10,
          total: result.data.length,
          totalPages:
            Math.ceil(result.data.length / (Number(params?.limit) || 10)) || 1,
        },
        data: result.data,
      };
    }

    return {
      meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
      data: [],
    };
  } catch (err) {
    console.error("Failed to fetch student submissions:", err);
    return {
      meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
      data: [],
    };
  }
};

export default getMySubmissions;