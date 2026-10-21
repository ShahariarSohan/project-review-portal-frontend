import Link from "next/link";
import {
  UserGroupIcon,
  Shield01Icon,
  GraduationScrollIcon,
  Folder01Icon,
  FileValidationIcon,
  AlertCircleIcon,
  ArrowLeft01Icon,
} from "hugeicons-react";
import { getUserProfile } from "@/services/auth/auth";
import { getAllUsers } from "@/services/user/getAllUsers";
import AddMentorDialog from "@/components/modules/users/AddMentorDialog";
import UserStatusAction from "@/components/modules/users/UserStatusAction";
import UserRoleFilter from "@/components/modules/users/UserRoleFilter";
import UserStatusFilter from "@/components/modules/users/UserStatusFilter";
import SearchFilter from "@/components/shared/SearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";

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

  // Access Control: Admins only
  if (currentUser?.role !== "ADMIN") {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-xs space-y-4 font-body">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center mx-auto">
            <AlertCircleIcon className="w-6 h-6 stroke-[2]" />
          </div>
          <div className="space-y-1">
            <h2 className="font-heading text-lg font-bold text-slate-900">
              Access Restricted
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              The User Directory console is strictly reserved for platform administrators. Your current role does not have authorization to view or manage user accounts.
            </p>
          </div>
          <div className="pt-2">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="sm"
                className="font-heading text-xs font-semibold"
              >
                <ArrowLeft01Icon className="w-3.5 h-3.5 mr-1.5" />
                <span>Return to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const usersData = await getAllUsers(searchParams);
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

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
        <SearchFilter placeholder="Search by user name or email..." />
        <div className="flex items-center gap-2">
          <UserRoleFilter />
          <UserStatusFilter />
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        {users.length === 0 ? (
          <div className="py-12">
            <EmptyState
              title="No users match your criteria"
              description="Try adjusting your search query or reset your role and account status filters."
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-body">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-heading font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">User Details</th>
                  <th className="py-3 px-4">Platform Role</th>
                  <th className="py-3 px-4">Account Status</th>
                  <th className="py-3 px-4">Activity</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4 text-right">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((u) => {
                  const joinedDate = new Date(u.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }
                  );

                  return (
                    <tr
                      key={u.id}
                      className="hover:bg-slate-50/60 transition-colors"
                    >
                      {/* User Details */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <p className="font-heading font-semibold text-slate-900 text-xs">
                            {u.name}
                          </p>
                          <p className="font-mono text-slate-500 text-[11px]">
                            {u.email}
                          </p>
                        </div>
                      </td>

                      {/* Platform Role */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-heading font-semibold tracking-wider uppercase border ${
                            u.role === "ADMIN"
                              ? "bg-slate-900 text-slate-100 border-slate-800"
                              : u.role === "MENTOR"
                              ? "bg-teal-50 text-teal-800 border-teal-200"
                              : "bg-indigo-50 text-indigo-800 border-indigo-200"
                          }`}
                        >
                          {u.role === "ADMIN" && (
                            <Shield01Icon className="w-3 h-3 text-slate-300" />
                          )}
                          {u.role === "MENTOR" && (
                            <FileValidationIcon className="w-3 h-3 text-teal-600" />
                          )}
                          {u.role === "STUDENT" && (
                            <GraduationScrollIcon className="w-3 h-3 text-indigo-600" />
                          )}
                          <span>{u.role}</span>
                        </span>
                      </td>

                      {/* Account Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-heading font-semibold tracking-wider uppercase border ${
                            u.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : u.status === "SUSPENDED"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-rose-50 text-rose-800 border-rose-200"
                          }`}
                        >
                          {u.status}
                        </span>
                      </td>

                      {/* Activity */}
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        {u.role === "STUDENT" ? (
                          <span className="flex items-center gap-1 font-mono">
                            <Folder01Icon className="w-3 h-3 text-slate-400" />
                            {u._count?.projectsSubmitted ?? 0} submissions
                          </span>
                        ) : u.role === "MENTOR" ? (
                          <span className="flex items-center gap-1 font-mono">
                            <FileValidationIcon className="w-3 h-3 text-slate-400" />
                            {u._count?.projectsReviewed ?? 0} reviews
                          </span>
                        ) : (
                          <span className="font-mono text-slate-400">
                            Supervisor
                          </span>
                        )}
                      </td>

                      {/* Joined Date */}
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {joinedDate}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end">
                          <UserStatusAction
                            user={u}
                            currentAdminId={currentUser.id}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Server Pagination */}
        <TablePagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          totalItems={meta.total}
        />
      </div>
    </div>
  );
}