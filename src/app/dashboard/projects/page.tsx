import { Search01Icon, FilterIcon, PlusSignIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">Project Submissions</h1>
          <p className="text-xs text-slate-500 mt-0.5">Evaluation queue, code repository links, and assignment status.</p>
        </div>
        <Button className="bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs py-2 px-3.5 rounded-lg flex items-center gap-1.5 shadow-2xs self-start sm:self-auto cursor-pointer">
          <PlusSignIcon className="w-3.5 h-3.5" />
          <span>New Submission</span>
        </Button>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative flex-1 max-w-sm">
          <Search01Icon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or students..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
          />
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 bg-white rounded-lg text-xs font-heading font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
          <FilterIcon className="w-3.5 h-3.5 text-slate-500" />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/80">
              <tr>
                <th className="px-6 py-3">Reference</th>
                <th className="px-6 py-3">Project Title</th>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Track</th>
                <th className="px-6 py-3">Assigned Mentor</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-[11px] text-slate-500">{p.id}</td>
                  <td className="px-6 py-3.5 font-heading font-semibold text-slate-900">{p.title}</td>
                  <td className="px-6 py-3.5">{p.student}</td>
                  <td className="px-6 py-3.5 text-slate-500">{p.track}</td>
                  <td className="px-6 py-3.5 text-slate-600">{p.reviewer}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}