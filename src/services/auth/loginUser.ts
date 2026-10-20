/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { redirect } from "next/navigation";
import { setCookie } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { loginValidationSchema, LoginFormData } from "@/zod/auth.validation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

const loginUser = async (
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

export default loginUser;