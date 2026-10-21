import { redirect } from "next/navigation";
import { getUserProfile } from "@/services/auth/auth";
import { getMySubmissions } from "@/services/project/getMySubmissions";
import { getMyStats } from "@/services/project/getMyStats";
import { getProjects } from "@/services/project/getProjects";
import { getProjectStats } from "@/services/project/getProjectStats";
import StudentDashboardView from "@/components/modules/projects/StudentDashboardView";
import MentorDashboardView from "@/components/modules/projects/MentorDashboardView";

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

  // Administrator Dashboard Orchestration: Default to Executive Analytics
  if (user?.role === "ADMIN") {
    redirect("/dashboard/analytics");
  }

  const isRestricted = user?.status === "SUSPENDED" || user?.status === "BANNED";

  // Student Dashboard Orchestration
  if (user?.role === "STUDENT") {
    const [submissions, stats] = await Promise.all([
      getMySubmissions(),
      getMyStats(),
    ]);

    return (
      <StudentDashboardView
        user={user}
        submissions={submissions}
        stats={stats}
        isRestricted={isRestricted}
      />
    );
  }

  // Mentor & Administrator Evaluation Workspace Orchestration
  const [projectData, stats] = await Promise.all([
    getProjects(searchParams),
    getProjectStats(),
  ]);

  return (
    <MentorDashboardView
      user={user}
      projectData={projectData}
      stats={stats}
      isRestricted={isRestricted}
    />
  );
}