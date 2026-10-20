import { FolderGit2, Plus, Search, Filter } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    { id: "PRJ-101", title: "Distributed Task Scheduler", student: "Alex Johnson", track: "Backend Systems", reviewer: "Dr. Marcus Vance", status: "PENDING" },
    { id: "PRJ-102", title: "Automated Code Review Bot", student: "Sarah Davis", track: "DevOps & CI/CD", reviewer: "Elena Rostova", status: "APPROVED" },
    { id: "PRJ-103", title: "Real-time Metrics Dashboard", student: "Michael Chen", track: "Full Stack", reviewer: "Dr. Marcus Vance", status: "APPROVED" },
    { id: "PRJ-104", title: "GraphQL API Gateway", student: "Emma Wilson", track: "API Architecture", reviewer: "David Kim", status: "REJECTED" },
    { id: "PRJ-105", title: "OAuth2 Provider Service", student: "David Brown", track: "Security", reviewer: "Unassigned", status: "PENDING" },
    { id: "PRJ-106", title: "Vector Search Engine Integration", student: "Sophia Lee", track: "AI Systems", reviewer: "Elena Rostova", status: "APPROVED" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Projects</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and review student project submissions.</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>New Submission</span>
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title or student..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 font-semibold">ID</th>
                <th className="px-6 py-3.5 font-semibold">Project Title</th>
                <th className="px-6 py-3.5 font-semibold">Student</th>
                <th className="px-6 py-3.5 font-semibold">Track</th>
                <th className="px-6 py-3.5 font-semibold">Assigned Reviewer</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{p.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{p.title}</td>
                  <td className="px-6 py-4">{p.student}</td>
                  <td className="px-6 py-4 text-slate-500">{p.track}</td>
                  <td className="px-6 py-4 text-slate-600">{p.reviewer}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.status === "APPROVED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : p.status === "PENDING"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {p.status}
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