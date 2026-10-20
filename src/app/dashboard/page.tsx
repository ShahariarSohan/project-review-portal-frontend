import { FolderGit2, FileCheck2, Clock, Users, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { name: "Total Projects", value: "28", icon: FolderGit2, change: "+4 this month", color: "indigo" },
    { name: "Pending Reviews", value: "8", icon: Clock, change: "Awaiting mentor feedback", color: "amber" },
    { name: "Approved Submissions", value: "18", icon: FileCheck2, change: "64.2% approval rate", color: "emerald" },
    { name: "Active Users", value: "42", icon: Users, change: "Students & Mentors", color: "blue" },
  ];

  const recentProjects = [
    { id: "PRJ-101", title: "Distributed Task Scheduler", student: "Alex Johnson", track: "Backend Systems", status: "PENDING", date: "Oct 19, 2026" },
    { id: "PRJ-102", title: "Automated Code Review Bot", student: "Sarah Davis", track: "DevOps & CI/CD", status: "APPROVED", date: "Oct 18, 2026" },
    { id: "PRJ-103", title: "Real-time Metrics Dashboard", student: "Michael Chen", track: "Full Stack", status: "APPROVED", date: "Oct 16, 2026" },
    { id: "PRJ-104", title: "GraphQL API Gateway", student: "Emma Wilson", track: "API Architecture", status: "REJECTED", date: "Oct 14, 2026" },
    { id: "PRJ-105", title: "OAuth2 Provider Service", student: "David Brown", track: "Security", status: "PENDING", date: "Oct 12, 2026" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Project submission activity, reviews, and platform metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div
            key={s.name}
            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{s.name}</span>
              <div className="p-2.5 rounded-xl bg-slate-50 text-indigo-600">
                <s.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{s.value}</div>
            <p className="text-xs text-slate-500 font-medium">{s.change}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Submissions</h2>
            <p className="text-xs text-slate-500 mt-0.5">Latest project submissions awaiting or completed evaluation</p>
          </div>
          <Link
            href="/dashboard/projects"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/75 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 font-semibold">ID</th>
                <th className="px-6 py-3.5 font-semibold">Project Title</th>
                <th className="px-6 py-3.5 font-semibold">Student</th>
                <th className="px-6 py-3.5 font-semibold">Track</th>
                <th className="px-6 py-3.5 font-semibold">Status</th>
                <th className="px-6 py-3.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{p.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{p.title}</td>
                  <td className="px-6 py-4">{p.student}</td>
                  <td className="px-6 py-4 text-slate-500">{p.track}</td>
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
                  <td className="px-6 py-4 text-slate-500 text-xs">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}