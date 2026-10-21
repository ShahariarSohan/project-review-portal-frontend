import {
  Shield01Icon,
  GraduationScrollIcon,
  Folder01Icon,
  FileValidationIcon,
} from "hugeicons-react";
import { IUserItem } from "@/services/user/getAllUsers";
import UserStatusAction from "./UserStatusAction";
import EmptyState from "@/components/shared/EmptyState";

interface IUsersTableProps {
  users: IUserItem[];
  currentAdminId?: string;
}

export default function UsersTable({
  users,
  currentAdminId,
}: IUsersTableProps) {
  if (users.length === 0) {
    return (
      <div className="py-12 bg-white rounded-xl border border-slate-200/90 shadow-2xs">
        <EmptyState
          title="No users match your criteria"
          description="Try adjusting your search query or reset your role and account status filters."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
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
                        currentAdminId={currentAdminId}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
