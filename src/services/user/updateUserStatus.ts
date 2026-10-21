/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

export interface IUpdateStatusResponse {
  success: boolean;
  message: string;
}

export const updateUserStatus = async (
  userId: string,
  status: "ACTIVE" | "SUSPENDED" | "BANNED"
): Promise<IUpdateStatusResponse> => {
  try {
    const res = await serverFetch.patch(`/users/${userId}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to update user status.",
      };
    }

    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: result.message || "User status updated successfully.",
    };
  } catch (err: any) {
    console.error("Update user status server action failed:", err);
    return {
      success: false,
      message: err.message || "An unexpected error occurred while updating status.",
    };
  }
};

export default updateUserStatus;
