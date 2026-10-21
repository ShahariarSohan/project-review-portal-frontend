import SearchFilter from "@/components/shared/SearchFilter";
import UserRoleFilter from "@/components/modules/users/UserRoleFilter";
import UserStatusFilter from "@/components/modules/users/UserStatusFilter";

export default function UsersFilterToolbar() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200/90 shadow-2xs">
      <SearchFilter placeholder="Search by user name or email..." />
      <div className="flex items-center gap-2">
        <UserRoleFilter />
        <UserStatusFilter />
      </div>
    </div>
  );
}
