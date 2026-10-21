import {
  UserGroupIcon,
  CheckmarkCircle02Icon,
  Alert02Icon,
  Cancel01Icon,
  FileValidationIcon,
} from "hugeicons-react";
import { IUserDirectoryStats } from "@/services/user/getUserStats";

interface IUserStatsCardsProps {
  stats: IUserDirectoryStats;
}

export default function UserStatsCards({ stats }: IUserStatsCardsProps) {
  const cards = [
    {
      title: "Total Accounts",
      value: stats.total,
      caption: "All registered users",
      icon: UserGroupIcon,
      color: "text-slate-900",
      bg: "bg-slate-50/70 border-slate-200/90",
      iconColor: "text-slate-600",
    },
    {
      title: "Active Accounts",
      value: stats.active,
      caption: "Full platform permissions",
      icon: CheckmarkCircle02Icon,
      color: "text-emerald-800",
      bg: "bg-emerald-50/70 border-emerald-200/90",
      iconColor: "text-emerald-600",
    },
    {
      title: "Suspended",
      value: stats.suspended,
      caption: "Temporarily restricted",
      icon: Alert02Icon,
      color: "text-amber-800",
      bg: "bg-amber-50/70 border-amber-200/90",
      iconColor: "text-amber-600",
    },
    {
      title: "Banned",
      value: stats.banned,
      caption: "Permanently restricted",
      icon: Cancel01Icon,
      color: "text-rose-800",
      bg: "bg-rose-50/70 border-rose-200/90",
      iconColor: "text-rose-600",
    },
    {
      title: "Mentors / Students",
      value: `${stats.mentors} / ${stats.students}`,
      caption: `${stats.mentors} mentors, ${stats.students} students`,
      icon: FileValidationIcon,
      color: "text-teal-900",
      bg: "bg-teal-50/70 border-teal-200/90",
      iconColor: "text-teal-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className={`p-3.5 rounded-xl border ${card.bg} bg-white shadow-2xs transition-all flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-[11px] font-heading font-medium text-slate-500 uppercase tracking-wider truncate">
                {card.title}
              </span>
              <span
                className={`p-1 rounded-md bg-white/80 border border-slate-200/70 ${card.iconColor} shrink-0`}
              >
                <IconComponent className="w-3.5 h-3.5" />
              </span>
            </div>
            <div>
              <div
                className={`font-mono text-2xl font-bold tracking-tight ${card.color}`}
              >
                {card.value}
              </div>
              <p className="text-[10px] text-slate-500 font-body mt-0.5 truncate">
                {card.caption}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
