import getInputFieldError, { IInputErrorState } from "@/lib/getInputFieldError";

interface IInputFieldErrorProps {
  field: string;
  state?: IInputErrorState | null;
}

export default function InputFieldError({
  field,
  state,
}: IInputFieldErrorProps) {
  const errorMessage = getInputFieldError(field, state);

  if (!errorMessage) return null;

  return (
    <p className="text-[11px] font-medium text-rose-600 mt-1 leading-tight font-body">
      {errorMessage}
    </p>
  );
}