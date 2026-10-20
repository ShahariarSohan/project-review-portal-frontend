export interface IInputErrorItem {
  field: string;
  message: string;
}

export interface IInputErrorState {
  success?: boolean;
  errors?: IInputErrorItem[];
  message?: string;
  data?: unknown;
}

export const getInputFieldError = (
  fieldName: string,
  state?: IInputErrorState | null
): string | null => {
  if (!state?.errors?.length) return null;
  const error = state.errors.find((err) => err.field === fieldName);
  return error?.message ?? null;
};

export default getInputFieldError;