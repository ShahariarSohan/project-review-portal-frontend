/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { deleteCookie, setCookie, serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const loginUser = async (payload: any) => {
  try {
    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (!data.success) {
      return { success: false, message: data.message || "Invalid credentials" };
    }

    if (data.data?.accessToken) {
      await setCookie("accessToken", data.data.accessToken);
    }
    if (data.data?.refreshToken) {
      await setCookie("refreshToken", data.data.refreshToken);
    }
    revalidatePath("/", "layout");
    return { success: true, data: data.data, message: data.message };
  } catch (err: any) {
    return { success: false, message: err.message || "Login failed" };
  }
};

export const logoutUser = async () => {
  try {
    await serverFetch.post("/auth/logout");
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    revalidatePath("/", "layout");
    return { success: true };
  } catch (err: any) {
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    revalidatePath("/", "layout");
    return { success: false, message: err.message || "Logout failed locally" };
  }
};

export const getUserProfile = async () => {
  try {
    const res = await serverFetch.get("/auth/me");
    const data = await res.json();
    if (data.success) {
      return { success: true, data: data.data };
    }
    return { success: false };
  } catch {
    return { success: false };
  }
};

export const changePassword = async (payload: any) => {
  try {
    const res = await serverFetch.post("/auth/change-password", {
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return { success: data.success, message: data.message, data: data.data };
  } catch (err: any) {
    return { success: false, message: err.message || "Change password failed" };
  }
};