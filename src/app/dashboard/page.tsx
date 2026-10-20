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
import { GraduationScrollIcon, Shield01Icon } from "hugeicons-react";

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
          <SubmissionFormDialog />
        </div>

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
        </div>
      </div>

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
        <MentorReviewTable data={projectData} />
      </div>
    </div>
  );
}