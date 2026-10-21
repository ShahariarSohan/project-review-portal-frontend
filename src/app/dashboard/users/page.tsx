import { redirect } from "next/navigation";
import { UserGroupIcon } from "hugeicons-react";
import { getUserProfile } from "@/services/auth/auth";
import { getAllUsers } from "@/services/user/getAllUsers";
import { getUserStats } from "@/services/user/getUserStats";
import AddMentorDialog from "@/components/modules/users/AddMentorDialog";
import UserRoleFilter from "@/components/modules/users/UserRoleFilter";
import UserStatusFilter from "@/components/modules/users/UserStatusFilter";
import UserStatsCards from "@/components/modules/users/UserStatsCards";
import UsersTable from "@/components/modules/users/UsersTable";
import SearchFilter from "@/components/shared/SearchFilter";
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
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
              <UserGroupIcon className="w-4 h-4" />
            </span>
            <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">
              User Directory & Access Control
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-body">
            Supervise registered platform accounts, role governance, and account state management.
          </p>
        </div>

        <AddMentorDialog />
      </div>

      {/* Directory Volumes & Metrics */}
      <UserStatsCards stats={stats} />

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <SearchFilter placeholder="Search by user name or email..." />
        <div className="flex items-center gap-2">
          <UserRoleFilter />
          <UserStatusFilter />
        </div>
      </div>

      {/* Users Data Table */}
      <UsersTable users={users} currentAdminId={currentUser.id} />

      {/* Server Pagination */}
      <TablePagination
        currentPage={meta.page}
        totalPages={meta.totalPages}
        totalItems={meta.total}
      />
    </div>
  );
}