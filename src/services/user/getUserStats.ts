"use server";

import { serverFetch } from "@/lib/serverFetch";

export interface IUserDirectoryStats {
  total: number;
  active: number;
  suspended: number;
  banned: number;
  mentors: number;
  students: number;
  admins: number;
}

export const getUserStats = async (): Promise<IUserDirectoryStats> => {
  try {
    const res = await serverFetch.get("/users/stats");
    const result = await res.json();

    if (result.success && result.data) {
      return result.data;
    }

    return {
      total: 0,
      active: 0,
      suspended: 0,
      banned: 0,
      mentors: 0,
      students: 0,
      admins: 0,
    };
  } catch (err) {
    console.error("Failed to fetch user directory stats:", err);
    return {
      total: 0,
      active: 0,
      suspended: 0,
      banned: 0,
      mentors: 0,
      students: 0,
      admins: 0,
    };
  }
};

export default getUserStats;
