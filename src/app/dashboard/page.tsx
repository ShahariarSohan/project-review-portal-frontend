import { getUserProfile } from "@/services/auth/auth";
import { getMySubmissions } from "@/services/project/getMySubmissions";
import { getMyStats } from "@/services/project/getMyStats";
import SubmissionFormDialog from "@/components/modules/projects/SubmissionFormDialog";
import StudentSubmissionsTable from "@/components/modules/projects/StudentSubmissionsTable";
import StudentStatsCards from "@/components/modules/projects/StudentStatsCards";
import { GraduationScrollIcon, Shield01Icon } from "hugeicons-react";

export default async function DashboardPage() {
  const profileRes = await getUserProfile();
  const user = profileRes.data;

  // Student Dashboard
  if (user?.role === "STUDENT") {
    const [submissions, stats] = await Promise.all([
      getMySubmissions(),
      getMyStats(),
    ]);

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Bar */}
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
          <SubmissionFormDialog />
        </div>

        {/* 4 Personal Metric Cards */}
        <StudentStatsCards stats={stats} />

        {/* Personal Submissions Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-sm font-bold text-slate-900 tracking-tight">
                My Submitted Projects
              </h2>
              <p className="text-[11px] text-slate-500 font-body">
                Real-time review status and evaluation feedback notes
              </p>
            </div>
          </div>
          <StudentSubmissionsTable submissions={submissions} />
        </div>
      </div>
    );
  }

  // Mentor & Admin Initial View (Ready for Feature 4 Review Table)
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
            <Shield01Icon className="w-4 h-4" />
          </span>
          <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">
            Mentor Evaluation Console
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-body">
          Welcome back, {user?.name || "Reviewer"}. Prepare for project evaluation queue grading.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200/90 bg-white p-6 shadow-2xs">
        <h3 className="font-heading text-sm font-bold text-slate-900 mb-1">
          Review Queue Workspace
        </h3>
        <p className="text-xs text-slate-500 font-body leading-relaxed mb-4">
          The project submission and anti-spam portal is active. Mentors and Administrators will use the Review Queue to evaluate candidate submissions, filter by approval status, and submit structured feedback.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-heading font-semibold">
          <span>Active Role:</span>
          <span className="font-mono uppercase">{user?.role || "ADMIN"}</span>
        </div>
      </div>
    </div>
  );
}