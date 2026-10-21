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

  const isStudent = role === "STUDENT";
  const title = isStudent
    ? `Student Account Access Restricted (${status})`
    : `Evaluator Access Restricted (${status})`;

  const message = isStudent
    ? `Your student account has been ${status.toLowerCase()} by platform administrators. You are restricted from submitting new projects or modifying submissions.`
    : `Your evaluator account has been ${status.toLowerCase()} by platform administrators. You are restricted from reviewing or evaluating student submissions.`;

  return (
    <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/80 text-rose-900 shadow-2xs font-body flex items-start gap-3">
      <Alert02Icon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
      <div className="space-y-0.5">
        <h3 className="font-heading font-bold text-xs text-rose-900 uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-xs text-rose-700 leading-relaxed">{message}</p>
      </div>
    </div>
  );
}
