"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";
import zodValidator from "@/lib/zodValidator";
import { reviewProjectSchema, ReviewProjectFormData } from "@/zod/project.validation";

export interface IReviewProjectState {
  success: boolean;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

export const reviewProject = async (
  projectId: string,
  _prevState: IReviewProjectState | null,
  formData: FormData
): Promise<IReviewProjectState> => {
  const rawPayload = {
    status: formData.get("status") as string,
    reviewNotes: (formData.get("reviewNotes") as string) || undefined,
  };

  const validated = zodValidator<ReviewProjectFormData>(rawPayload, reviewProjectSchema);
  if (!validated.success || !validated.data) {
    return {
      success: false,
      message: "Please complete all required review fields properly.",
      errors: validated.errors,
    };
  }

  try {
    const res = await serverFetch.patch(
      `/projects/${projectId}/review`,
      {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated.data),
      }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to submit evaluation review.",
      };
    }

    revalidatePath("/dashboard");

    return {
      success: true,
      message: result.message || "Project evaluation recorded successfully.",
    };
  } catch (err) {
    console.error("Review project action failed:", err);
    return {
      success: false,
      message: "Network or server connection failed. Please retry.",
    };
  }
};

export default reviewProject;