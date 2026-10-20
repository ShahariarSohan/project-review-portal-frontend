import {
  Folder01Icon,
  HourglassIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "hugeicons-react";
import { IStudentStats } from "@/services/project/getMyStats";

interface IStudentStatsCardsProps {
  stats: IStudentStats;
}

export default function StudentStatsCards({ stats }: IStudentStatsCardsProps) {
  const cards = [
    {
      title: "Total Submitted",
      value: stats.total,
      icon: Folder01Icon,
      color: "text-slate-700 bg-slate-100 border-slate-200",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      icon: HourglassIcon,
      color: "text-amber-800 bg-amber-50 border-amber-200",
    },
    {
      title: "Approved Projects",
      value: stats.approved,
      icon: CheckmarkCircle02Icon,
      color: "text-emerald-800 bg-emerald-50 border-emerald-200",
    },
    {
      title: "Needs Revision",
      value: stats.rejected,
      icon: AlertCircleIcon,
      color: "text-rose-800 bg-rose-50 border-rose-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-2xs flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-slate-500">
                {c.title}
              </p>
              <p className="font-mono text-2xl font-bold text-slate-900 mt-1">
                {c.value}
              </p>
            </div>
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${c.color}`}
            >
              <Icon className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
        );
      })}
    </div>
  );
}