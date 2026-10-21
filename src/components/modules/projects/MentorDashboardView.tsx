import { Shield01Icon } from "hugeicons-react";
import ProjectStatsCards from "@/components/modules/projects/ProjectStatsCards";
import MentorReviewTable from "@/components/modules/projects/MentorReviewTable";
import AccountRestrictionBanner from "@/components/shared/AccountRestrictionBanner";
import { IProjectListResponse } from "@/services/project/getProjects";
import { IProjectPlatformStats } from "@/services/project/getProjectStats";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
}

interface IMentorDashboardViewProps {
  user: IUser;
  projectData: IProjectListResponse;
  stats: IProjectPlatformStats;
  isRestricted: boolean;
}

export default function MentorDashboardView({
  user,
  projectData,
  stats,
  isRestricted,
}: IMentorDashboardViewProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Evaluator Header */}
      <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
              <Shield01Icon className="w-4 h-4" />
            </span>
            <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">
              Project Evaluation Console
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-body">
            Examine submitted repositories, inspect candidate demos, and log structured reviews.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-xs font-heading font-semibold">
            Role: <span className="font-mono uppercase">{user.role}</span>
          </span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-heading font-semibold tracking-wider uppercase border ${
              user.status === "ACTIVE"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : user.status === "SUSPENDED"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            {user.status}
          </span>
        </div>
      </div>

      {/* Evaluator Restriction Notice Banner */}
      <AccountRestrictionBanner status={user.status} role={user.role} />

      {/* Metric Cards */}
      <ProjectStatsCards stats={stats} />

      {/* Evaluation Queue Table */}
      <div className="space-y-3">
        <div>
          <h2 className="font-heading text-sm font-bold text-slate-900 tracking-tight">
            Evaluation Queue
          </h2>
          <p className="text-[11px] text-slate-500 font-body">
            Search candidates by title or email and filter by submission status
          </p>
        </div>
        <MentorReviewTable data={projectData} isRestricted={isRestricted} />
      </div>
    </div>
  );
}
