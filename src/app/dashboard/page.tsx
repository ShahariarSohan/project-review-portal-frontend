import { getUserProfile } from "@/services/auth/auth";
import { getMySubmissions } from "@/services/project/getMySubmissions";
import { getMyStats } from "@/services/project/getMyStats";
import { getProjects } from "@/services/project/getProjects";
import { getProjectStats } from "@/services/project/getProjectStats";
import SubmissionFormDialog from "@/components/modules/projects/SubmissionFormDialog";
import StudentSubmissionsTable from "@/components/modules/projects/StudentSubmissionsTable";
import StudentStatsCards from "@/components/modules/projects/StudentStatsCards";
import MentorReviewTable from "@/components/modules/projects/MentorReviewTable";
import ProjectStatsCards from "@/components/modules/projects/ProjectStatsCards";
import { GraduationScrollIcon, Shield01Icon, Alert02Icon } from "hugeicons-react";

interface IDashboardPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    searchTerm?: string;
  }>;
}

export default async function DashboardPage(props: IDashboardPageProps) {
  const [profileRes, searchParams] = await Promise.all([
    getUserProfile(),
    props.searchParams,
  ]);
  const user = profileRes.data;
  const isRestricted = user?.status === "SUSPENDED" || user?.status === "BANNED";

  // Student Dashboard View
  if (user?.role === "STUDENT") {
    const [submissions, stats] = await Promise.all([
      getMySubmissions(),
      getMyStats(),
    ]);

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="border-b border-slate-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
                <GraduationScrollIcon className="w-4 h-4" />
              </span>
              <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">
                Student Submission Portal
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 font-body">
              Submit your repositories, track evaluation milestones, and review mentor feedback.
            </p>
          </div>
          <SubmissionFormDialog isRestricted={isRestricted} />
        </div>

        {/* Account Restriction Notice Banner */}
        {isRestricted && (
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/80 text-rose-900 shadow-2xs font-body flex items-start gap-3">
            <Alert02Icon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h3 className="font-heading font-bold text-xs text-rose-900 uppercase tracking-wider">
                Account Access Restricted ({user.status})
              </h3>
              <p className="text-xs text-rose-700 leading-relaxed">
                Your student account has been {user.status.toLowerCase()} by platform administrators. You are restricted from submitting new projects or modifying submissions.
              </p>
            </div>
          </div>
        )}

        <StudentStatsCards stats={stats} />

        <div className="space-y-3">
          <div>
            <h2 className="font-heading text-sm font-bold text-slate-900 tracking-tight">
              My Submitted Projects
            </h2>
            <p className="text-[11px] text-slate-500 font-body">
              Real-time review status and evaluation feedback notes
            </p>
          </div>
          <StudentSubmissionsTable submissions={submissions} />
        </div>
      </div>
    );
  }

  // Mentor & Administrator Review Workspace
  const [projectData, stats] = await Promise.all([
    getProjects(searchParams),
    getProjectStats(),
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
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
            Role: <span className="font-mono uppercase">{user?.role || "MENTOR"}</span>
          </span>
          {user?.status && (
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
          )}
        </div>
      </div>

      {/* Evaluator Restriction Notice Banner */}
      {isRestricted && (
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/80 text-rose-900 shadow-2xs font-body flex items-start gap-3">
          <Alert02Icon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h3 className="font-heading font-bold text-xs text-rose-900 uppercase tracking-wider">
              Evaluator Access Restricted ({user.status})
            </h3>
            <p className="text-xs text-rose-700 leading-relaxed">
              Your account has been {user.status.toLowerCase()} by platform administrators. You are restricted from reviewing or evaluating student submissions.
            </p>
          </div>
        </div>
      )}

      {/* 5 Aggregated Metric Cards */}
      <ProjectStatsCards stats={stats} />

      {/* Paginated Review Data Table */}
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