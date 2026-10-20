"use server";

import { serverFetch } from "@/lib/serverFetch";

export interface IStudentStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export const getMyStats = async (): Promise<IStudentStats> => {
  try {
    const res = await serverFetch.get("/projects/my-stats");
    const result = await res.json();
    if (result.success && result.data) {
      return result.data;
    }
    return { total: 0, pending: 0, approved: 0, rejected: 0 };
  } catch (err) {
    console.error("Failed to fetch student stats:", err);
    return { total: 0, pending: 0, approved: 0, rejected: 0 };
  }
};

export default getMyStats;