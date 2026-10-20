import { Users, UserPlus, Search } from "lucide-react";

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Users</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage accounts, roles, and platform permissions.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto">
          <UserPlus className="w-4 h-4" />
          <span>Invite User</span>
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search users by name or email..."
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 font-semibold">User ID</th>
                <th className="px-6 py-3.5 font-semibold">Name</th>
                <th className="px-6 py-3.5 font-semibold">Email</th>
                <th className="px-6 py-3.5 font-semibold">Role</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{u.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{u.name}</td>
                  <td className="px-6 py-4 text-slate-600">{u.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        u.role === "ADMIN"
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700">
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