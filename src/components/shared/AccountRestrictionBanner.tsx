import { Alert02Icon } from "hugeicons-react";

interface IAccountRestrictionBannerProps {
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  role: "STUDENT" | "MENTOR" | "ADMIN";
}

export default function AccountRestrictionBanner({
  status,
  role,
}: IAccountRestrictionBannerProps) {
  if (status === "ACTIVE") return null;

  const isSuspended = status === "SUSPENDED";
  const isStudent = role === "STUDENT";

  const title = isSuspended
    ? isStudent
      ? "Student Account Suspended - Read-Only Mode"
      : "Evaluator Account Suspended - Read-Only Mode"
    : `Account Access Terminated (${status})`;

  const message = isSuspended
    ? isStudent
      ? "Your student account is temporarily suspended. You have transparent, read-only access to inspect your previous submissions and review mentor feedback notes. Submitting new projects is disabled during this period."
      : "Your evaluator account is temporarily suspended. You have read-only access to examine the review queue, but confirming evaluation decisions or saving review notes is disabled."
    : "Your account has been permanently banned. All dashboard entry privileges and API actions have been revoked.";

  return (
    <div
      className={`p-4 rounded-xl border shadow-2xs font-body flex items-start gap-3 ${
        isSuspended
          ? "border-amber-300 bg-amber-50/90 text-amber-950"
          : "border-rose-200 bg-rose-50/80 text-rose-900"
      }`}
    >
      <Alert02Icon
        className={`w-5 h-5 shrink-0 mt-0.5 ${
          isSuspended ? "text-amber-600" : "text-rose-600"
        }`}
      />
      <div className="space-y-0.5">
        <h3
          className={`font-heading font-bold text-xs uppercase tracking-wider ${
            isSuspended ? "text-amber-900" : "text-rose-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-xs leading-relaxed ${
            isSuspended ? "text-amber-800" : "text-rose-700"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
