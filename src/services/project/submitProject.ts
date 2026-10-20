/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { IInputErrorState } from "@/lib/getInputFieldError";
import {
  createProjectSchema,
  CreateProjectFormData,
} from "@/zod/project.validation";

export interface IProjectSubmissionState extends IInputErrorState {
  isDuplicate?: boolean;
  isRateLimited?: boolean;
  retryAfterSeconds?: number;
}

export const submitProject = async (
  _currentState: IProjectSubmissionState | null,
  formData: FormData
): Promise<IProjectSubmissionState> => {
  try {
    const payload = {
      title: formData.get("title"),
      repoUrl: formData.get("repoUrl"),
      liveUrl: formData.get("liveUrl") || undefined,
      description: formData.get("description"),
    };

    const validation = zodValidator<CreateProjectFormData>(
      payload,
      createProjectSchema
    );

    if (!validation.success) {
      return {
        success: false,
        errors: validation.errors,
      };
    }

    const res = await serverFetch.post("/projects", {
      body: JSON.stringify(validation.data),
    });

    const result = await res.json();

    if (res.status === 409) {
      return {
        success: false,
        isDuplicate: true,
        message:
          result.message ||
          "You already have an active or approved submission for this repository URL.",
      };
    }

    if (res.status === 429) {
      return {
        success: false,
        isRateLimited: true,
        retryAfterSeconds: result.retryAfterSeconds || 120,
        message:
          result.message ||
          "Submission limit reached (maximum 3 projects per 2 minutes). Please wait before trying again.",
      };
    }

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to submit project.",
      };
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Project submitted successfully for mentor review!",
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "An unexpected network error occurred.",
    };
  }
};

export default submitProject;