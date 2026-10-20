import { Search01Icon, UserAdd01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";

export default function UsersPage() {
  const users = [
    { id: "USR-001", name: "Portal Admin", email: "admin@reviewportal.com", role: "ADMIN", status: "ACTIVE" },
    { id: "USR-002", name: "Dr. Marcus Vance", email: "marcus.vance@reviewportal.com", role: "ADMIN", status: "ACTIVE" },
    { id: "USR-003", name: "Elena Rostova", email: "elena.r@reviewportal.com", role: "ADMIN", status: "ACTIVE" },
    { id: "USR-004", name: "Alex Johnson", email: "alex.j@student.edu", role: "USER", status: "ACTIVE" },
    { id: "USR-005", name: "Sarah Davis", email: "sarah.d@student.edu", role: "USER", status: "ACTIVE" },
    { id: "USR-006", name: "Michael Chen", email: "m.chen@student.edu", role: "USER", status: "ACTIVE" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">User Directory</h1>
          <p className="text-xs text-slate-500 mt-0.5">Platform access control, role authorization, and active accounts.</p>
        </div>
        <Button className="bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer">
          <UserAdd01Icon className="w-3.5 h-3.5" />
          <span>Invite Member</span>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search01Icon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
        />
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">Full Name</th>
                <th className="px-6 py-3">Email Address</th>
                <th className="px-6 py-3">Access Role</th>
                <th className="px-6 py-3">Account State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-[11px] text-slate-500">{u.id}</td>
                  <td className="px-6 py-3.5 font-heading font-semibold text-slate-900">{u.name}</td>
                  <td className="px-6 py-3.5 font-mono text-slate-600 text-[11px]">{u.email}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-heading font-semibold tracking-wider uppercase border ${
                        u.role === "ADMIN"
                          ? "bg-slate-900 text-slate-100 border-slate-800"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-heading font-semibold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}