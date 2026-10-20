import { cn } from "@/lib/utils";

export type ProjectStatusType = "PENDING" | "APPROVED" | "REJECTED";

interface IStatusBadgeProps {
  status: ProjectStatusType | string;
  className?: string;
}

export default function StatusBadge({ status, className }: IStatusBadgeProps) {
  const normalized = status.toUpperCase();

  const configs: Record<
    string,
    { label: string; bg: string; text: string; border: string; dot: string }
  > = {
    PENDING: {
      label: "Pending Review",
      bg: "bg-amber-50",
      text: "text-amber-800",
      border: "border-amber-200",
      dot: "bg-amber-500",
    },
    APPROVED: {
      label: "Approved",
      bg: "bg-emerald-50",
      text: "text-emerald-800",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
    },
    REJECTED: {
      label: "Rejected",
      bg: "bg-rose-50",
      text: "text-rose-800",
      border: "border-rose-200",
      dot: "bg-rose-500",
    },
  };

  const config = configs[normalized] || {
    label: normalized,
    bg: "bg-slate-100",
    text: "text-slate-800",
    border: "border-slate-200",
    dot: "bg-slate-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border font-body",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", config.dot)} />
      <span>{config.label}</span>
    </span>
  );
}