import { GraduationScrollIcon } from "hugeicons-react";
import SubmissionFormDialog from "@/components/modules/projects/SubmissionFormDialog";
import StudentSubmissionsTable from "@/components/modules/projects/StudentSubmissionsTable";
import StudentStatsCards from "@/components/modules/projects/StudentStatsCards";
import AccountRestrictionBanner from "@/components/shared/AccountRestrictionBanner";
import { IProjectSubmissionItem } from "@/services/project/getMySubmissions";
import { IStudentStats } from "@/services/project/getMyStats";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
}

interface IStudentDashboardViewProps {
  user: IUser;
  submissions: IProjectSubmissionItem[];
  stats: IStudentStats;
  isRestricted: boolean;
}

export default function StudentDashboardView({
  user,
  submissions,
  stats,
  isRestricted,
}: IStudentDashboardViewProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Student View Header */}
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
      <AccountRestrictionBanner status={user.status} role={user.role} />

      {/* Student Metric Cards */}
      <StudentStatsCards stats={stats} />

      {/* Submissions Section */}
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
