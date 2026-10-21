import {
  Folder01Icon,
  Time02Icon,
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Analytics01Icon,
  UserGroupIcon,
} from "hugeicons-react";
import { IProjectPlatformStats } from "@/services/project/getProjectStats";
import { IUserDirectoryStats } from "@/services/user/getUserStats";

interface IAnalyticsKpiCardsProps {
  projectStats: IProjectPlatformStats;
  userStats: IUserDirectoryStats;
}

export default function AnalyticsKpiCards({
  projectStats,
  userStats,
}: IAnalyticsKpiCardsProps) {
  const kpis = [
    {
      title: "Total Submissions",
      value: projectStats.total,
      caption: "All submitted repositories",
      icon: Folder01Icon,
      color: "text-slate-800",
      bg: "bg-slate-50 border-slate-200",
      iconColor: "text-slate-600",
    },
    {
      title: "Pending Queue",
      value: projectStats.pending,
      caption: "Awaiting mentor evaluation",
      icon: Time02Icon,
      color: "text-amber-800",
      bg: "bg-amber-50/60 border-amber-200",
      iconColor: "text-amber-600",
    },
    {
      title: "Approved Projects",
      value: projectStats.approved,
      caption: "Met graduation criteria",
      icon: CheckmarkCircle02Icon,
      color: "text-emerald-800",
      bg: "bg-emerald-50/60 border-emerald-200",
      iconColor: "text-emerald-600",
    },
    {
      title: "Rejected Projects",
      value: projectStats.rejected,
      caption: "Requires candidate revision",
      icon: Cancel01Icon,
      color: "text-rose-800",
      bg: "bg-rose-50/60 border-rose-200",
      iconColor: "text-rose-600",
    },
    {
      title: "Overall Pass Rate",
      value: `${projectStats.passRate}%`,
      caption: "Approval conversion ratio",
      icon: Analytics01Icon,
      color: "text-teal-800",
      bg: "bg-teal-50/60 border-teal-200",
      iconColor: "text-teal-700",
    },
    {
      title: "Platform Accounts",
      value: userStats.total,
      caption: `${userStats.active} active | ${userStats.mentors} mentors`,
      icon: UserGroupIcon,
      color: "text-slate-800",
      bg: "bg-slate-50 border-slate-200",
      iconColor: "text-slate-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div
            key={idx}
            className={`rounded-xl border p-4 shadow-2xs transition-all duration-200 bg-white hover:border-slate-300 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate">
                {kpi.title}
              </span>
              <div
                className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 ${kpi.bg} ${kpi.iconColor}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div
                className={`font-mono text-xl font-bold tracking-tight ${kpi.color}`}
              >
                {kpi.value}
              </div>
              <p className="text-[10px] text-slate-400 font-body mt-0.5 truncate">
                {kpi.caption}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
