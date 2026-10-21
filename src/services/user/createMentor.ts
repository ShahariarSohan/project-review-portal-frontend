/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { IInputErrorState } from "@/lib/getInputFieldError";
import { createMentorSchema, CreateMentorFormData } from "@/zod/user.validation";

export const createMentor = async (
  _prevState: IInputErrorState | null,
  formData: FormData
): Promise<IInputErrorState> => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validation = zodValidator<CreateMentorFormData>(payload, createMentorSchema);
    if (!validation.success) {
      return {
        success: false,
        message: "Please correct the errors in the form.",
        errors: validation.errors,
      };
    }

    const res = await serverFetch.post("/users/mentor", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to create mentor account.",
      };
    }

    revalidatePath("/dashboard/users");

    return {
      success: true,
      message: result.message || "Mentor account created successfully.",
    };
  } catch (err: any) {
    console.error("Create mentor server action failed:", err);
    return {
      success: false,
      message: err.message || "Failed to create mentor account. Please try again.",
    };
  }
};

export default createMentor;
