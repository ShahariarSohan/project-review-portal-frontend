import { redirect } from "next/navigation";
import { getUserProfile } from "@/services/auth/auth";
import { getProjects } from "@/services/project/getProjects";
import { getProjectStats } from "@/services/project/getProjectStats";
import MentorDashboardView from "@/components/modules/projects/MentorDashboardView";

interface IReviewsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    status?: string;
    searchTerm?: string;
  }>;
}

export default async function ReviewsPage(props: IReviewsPageProps) {
  const [profileRes, searchParams] = await Promise.all([
    getUserProfile(),
    props.searchParams,
  ]);
  const user = profileRes.data;

  // Strict Role Protection: Only Evaluators (Mentor & Admin) can access review queue
  if (user?.role !== "MENTOR" && user?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const isRestricted = user?.status === "SUSPENDED" || user?.status === "BANNED";

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
