/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { deleteCookie, setCookie, serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { loginValidationSchema, LoginFormData } from "@/zod/auth.validation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

/**
 * React 19 Server Action for User Login
 */
export const loginUser = async (
  _currentState: IInputErrorState | null,
  formData: FormData
): Promise<IInputErrorState> => {
  try {
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validation = zodValidator<LoginFormData>(payload, loginValidationSchema);
    if (!validation.success) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
      cache: "no-store",
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Invalid credentials",
      };
    }

    if (result.data?.accessToken) {
      await setCookie("accessToken", result.data.accessToken);
    }
    if (result.data?.refreshToken) {
      await setCookie("refreshToken", result.data.refreshToken);
    }

    redirect("/dashboard");
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return {
      success: false,
      message: err.message || "Failed to log in. Please check your credentials.",
    };
  }
};

/**
 * Server Action for User Logout
 */
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

/**
 * Server Fetcher for Current User Identity
 */
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

/**
 * Server Action for Changing User Password
 */
export const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await serverFetch.post("/auth/change-password", {
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      const errorMsg =
        data?.error?.[0]?.message ||
        (Array.isArray(data?.error) ? data.error.map((e: any) => e.message).join(", ") : null) ||
        data?.message ||
        "Change password failed";
      return { success: false, message: errorMsg };
    }
    return { success: data.success, message: data.message, data: data.data };
  } catch (err: any) {
    return { success: false, message: err.message || "Change password failed" };
  }
};