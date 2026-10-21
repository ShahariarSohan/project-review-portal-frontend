import { UserGroupIcon } from "hugeicons-react";
import AddMentorDialog from "@/components/modules/users/AddMentorDialog";

export default function UsersDirectoryHeader() {
  return (
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
  );
}
