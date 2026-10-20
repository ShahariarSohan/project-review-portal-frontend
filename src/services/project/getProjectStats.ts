"use server";

import { serverFetch } from "@/lib/serverFetch";

export interface IProjectPlatformStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  passRate: number;
}

export const getProjectStats = async (): Promise<IProjectPlatformStats> => {
  try {
    const res = await serverFetch.get("/projects/stats");
    const result = await res.json();
    if (result.success && result.data) {
      return result.data;
    }
    return { total: 0, pending: 0, approved: 0, rejected: 0, passRate: 0 };
  } catch (err) {
    console.error("Failed to fetch project stats:", err);
    return { total: 0, pending: 0, approved: 0, rejected: 0, passRate: 0 };
  }
};

export default getProjectStats;
