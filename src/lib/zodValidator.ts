import { ZodTypeAny } from "zod";

export interface IValidationError {
  field: string;
  message: string;
}

export interface IValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: IValidationError[];
}

const zodValidator = <T>(payload: unknown, schema: ZodTypeAny): IValidationResult<T> => {
  const validatedPayload = schema.safeParse(payload);

  if (!validatedPayload.success) {
    return {
      success: false,
      errors: validatedPayload.error.issues.map((issue) => ({
        field: String(issue.path[0] ?? "form"),
        message: issue.message,
      })),
    };
  }

  return {
    success: true,
    data: validatedPayload.data as T,
  };
};

export default zodValidator;