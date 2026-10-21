"use server";

import { serverFetch } from "@/lib/serverFetch";

export interface IUserItem {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "MENTOR" | "STUDENT";
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  _count?: {
    projectsSubmitted: number;
    projectsReviewed: number;
  };
}

export interface IUserListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: IUserItem[];
}

export interface IGetUsersParams {
  page?: string | number;
  limit?: string | number;
  role?: string;
  status?: string;
  searchTerm?: string;
}

export const getAllUsers = async (
  params?: IGetUsersParams
): Promise<IUserListResponse> => {
  try {
    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.role && params.role !== "ALL") {
      query.set("role", params.role);
    }
    if (params?.status && params.status !== "ALL") {
      query.set("status", params.status);
    }
    if (params?.searchTerm && params.searchTerm.trim()) {
      query.set("searchTerm", params.searchTerm.trim());
    }

    const queryString = query.toString();
    const endpoint = `/users${queryString ? `?${queryString}` : ""}`;

    const res = await serverFetch.get(endpoint);
    const result = await res.json();

    if (result.success && Array.isArray(result.data)) {
      return {
        meta: result.meta || {
          page: 1,
          limit: 10,
          total: result.data.length,
          totalPages: 1,
        },
        data: result.data,
      };
    }

    return {
      meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
      data: [],
    };
  } catch (err) {
    console.error("Failed to fetch user directory:", err);
    return {
      meta: { page: 1, limit: 10, total: 0, totalPages: 1 },
      data: [],
    };
  }
};

export default getAllUsers;
