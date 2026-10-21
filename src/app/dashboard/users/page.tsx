import { redirect } from "next/navigation";
import { getUserProfile } from "@/services/auth/auth";
import { getAllUsers } from "@/services/user/getAllUsers";
import { getUserStats } from "@/services/user/getUserStats";
import UsersDirectoryHeader from "@/components/modules/users/UsersDirectoryHeader";
import UserStatsCards from "@/components/modules/users/UserStatsCards";
import UsersFilterToolbar from "@/components/modules/users/UsersFilterToolbar";
import UsersTable from "@/components/modules/users/UsersTable";
import TablePagination from "@/components/shared/TablePagination";

interface IUsersPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    role?: string;
    status?: string;
    searchTerm?: string;
  }>;
}

export default async function UsersPage(props: IUsersPageProps) {
  const [profileRes, searchParams] = await Promise.all([
    getUserProfile(),
    props.searchParams,
  ]);

  const currentUser = profileRes.data;

  // Strict Role Protection: Non-administrators are redirected away immediately
  if (currentUser?.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const [usersData, stats] = await Promise.all([
    getAllUsers(searchParams),
    getUserStats(),
  ]);
  const { data: users, meta } = usersData;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <UsersDirectoryHeader />
      <UserStatsCards stats={stats} />
      <UsersFilterToolbar />
      <UsersTable users={users} currentAdminId={currentUser.id} />
      <TablePagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        totalItems={meta.total}
      />
    </div>
  );
}