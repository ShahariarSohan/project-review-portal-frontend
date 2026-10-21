import { Analytics01Icon } from "hugeicons-react";
import AnalyticsKpiCards from "@/components/modules/admin/AnalyticsKpiCards";
import ReviewDistributionChart from "@/components/modules/admin/ReviewDistributionChart";
import SubmissionVelocityChart from "@/components/modules/admin/SubmissionVelocityChart";
import UserGovernanceChart from "@/components/modules/admin/UserGovernanceChart";
import { IProjectPlatformStats } from "@/services/project/getProjectStats";
import { IUserDirectoryStats } from "@/services/user/getUserStats";

interface IAdminAnalyticsDashboardProps {
  projectStats: IProjectPlatformStats;
  userStats: IUserDirectoryStats;
}

export default function AdminAnalyticsDashboard({
  projectStats,
  userStats,
}: IAdminAnalyticsDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
              <Analytics01Icon className="w-4 h-4" />
            </span>
            <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">
              Executive Analytics & Quality Metrics
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-body">
            High-density visualization of candidate submissions, evaluation pass rates, and platform governance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono">
            Live Telemetry
          </span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <AnalyticsKpiCards projectStats={projectStats} userStats={userStats} />

      {/* Visual Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ReviewDistributionChart stats={projectStats} />
        <SubmissionVelocityChart stats={projectStats} />
        <UserGovernanceChart stats={userStats} />
      </div>
    </div>
  );
}
