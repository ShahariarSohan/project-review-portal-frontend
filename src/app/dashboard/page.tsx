import {
  Folder01Icon,
  Clock01Icon,
  FileValidationIcon,
  UserGroupIcon,
  ArrowUpRight01Icon,
} from "hugeicons-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { name: "Total Submissions", value: "28", icon: Folder01Icon, note: "Across 4 active tracks" },
    { name: "Pending Evaluations", value: "8", icon: Clock01Icon, note: "Average review time 36h" },
    { name: "Approved Projects", value: "18", icon: FileValidationIcon, note: "64.2% milestone pass rate" },
    { name: "Active Members", value: "42", icon: UserGroupIcon, note: "Students and verified mentors" },
  ];

  const recentProjects = [
    { id: "PRJ-101", title: "Distributed Task Scheduler", student: "Alex Johnson", track: "Backend Systems", status: "PENDING", date: "2026-10-19" },
    { id: "PRJ-102", title: "Automated Code Review Bot", student: "Sarah Davis", track: "DevOps & CI/CD", status: "APPROVED", date: "2026-10-18" },
    { id: "PRJ-103", title: "Real-time Metrics Dashboard", student: "Michael Chen", track: "Full Stack", status: "APPROVED", date: "2026-10-16" },
    { id: "PRJ-104", title: "GraphQL API Gateway", student: "Emma Wilson", track: "API Architecture", status: "REJECTED", date: "2026-10-14" },
    { id: "PRJ-105", title: "OAuth2 Provider Service", student: "David Brown", track: "Security", status: "PENDING", date: "2026-10-12" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">
          System Overview
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Submission pipelines, evaluation queue, and performance metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.name}
              className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-heading text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {s.name}
                </span>
                <div className="w-8 h-8 rounded-lg bg-slate-100/80 text-slate-600 flex items-center justify-center">
                  <Icon className="w-4 h-4 stroke-[1.8]" />
                </div>
              </div>
              <div className="font-heading text-2xl font-bold text-slate-900 tracking-tight mb-1">
                {s.value}
              </div>
              <p className="text-[11px] text-slate-500 font-medium">{s.note}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/80 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-sm font-bold text-slate-900 tracking-tight">
              Recent Submissions
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Active projects awaiting mentor review or recently evaluated
            </p>
          </div>
          <Link
            href="/dashboard/projects"
            className="font-heading text-xs font-semibold text-teal-800 hover:text-teal-900 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowUpRight01Icon className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Project Title</th>
                <th className="px-6 py-3">Author</th>
                <th className="px-6 py-3">Domain Track</th>
                <th className="px-6 py-3">Evaluation Status</th>
                <th className="px-6 py-3">Submission Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {recentProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-[11px] text-slate-500">{p.id}</td>
                  <td className="px-6 py-3.5 font-heading font-semibold text-slate-900">{p.title}</td>
                  <td className="px-6 py-3.5">{p.student}</td>
                  <td className="px-6 py-3.5 text-slate-500">{p.track}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-heading font-semibold tracking-wider uppercase border ${
                        p.status === "APPROVED"
                          ? "bg-teal-50 text-teal-800 border-teal-200"
                          : p.status === "PENDING"
                          ? "bg-amber-50 text-amber-800 border-amber-200"
                          : "bg-rose-50 text-rose-800 border-rose-200"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-slate-500 text-[11px]">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}