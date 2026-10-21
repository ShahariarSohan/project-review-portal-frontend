import { redirect } from "next/navigation";
import { getUserProfile } from "@/services/auth/auth";
import { getProjectStats } from "@/services/project/getProjectStats";
import { getUserStats } from "@/services/user/getUserStats";
import AdminAnalyticsDashboard from "@/components/modules/admin/AdminAnalyticsDashboard";

export default async function AnalyticsPage() {
  const profileRes = await getUserProfile();
  const currentUser = profileRes.data;

  // Strict Role Protection: Non-administrators are redirected away immediately
  if (currentUser?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [projectStats, userStats] = await Promise.all([
    getProjectStats(),
    getUserStats(),
  ]);

  return (
    <AdminAnalyticsDashboard
      projectStats={projectStats}
      userStats={userStats}
    />
  );
}
