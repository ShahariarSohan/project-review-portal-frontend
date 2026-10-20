import { Search01Icon, FilterIcon } from "hugeicons-react";

export default function ReviewsPage() {
  const reviews = [
    { id: "REV-201", project: "Distributed Task Scheduler", reviewer: "Dr. Marcus Vance", score: "88/100", decision: "PENDING_REVISION", date: "2026-10-19" },
    { id: "REV-202", project: "Automated Code Review Bot", reviewer: "Elena Rostova", score: "94/100", decision: "APPROVED", date: "2026-10-18" },
    { id: "REV-203", project: "Real-time Metrics Dashboard", reviewer: "Dr. Marcus Vance", score: "91/100", decision: "APPROVED", date: "2026-10-16" },
    { id: "REV-204", project: "GraphQL API Gateway", reviewer: "David Kim", score: "62/100", decision: "REJECTED", date: "2026-10-14" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">Evaluations & Feedback</h1>
        <p className="text-xs text-slate-500 mt-0.5">Mentor scorecard records, code rubrics, and resolution status.</p>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="relative flex-1 max-w-sm">
          <Search01Icon className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviews or projects..."
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
                <th className="px-6 py-3">Audit ID</th>
                <th className="px-6 py-3">Target Project</th>
                <th className="px-6 py-3">Lead Mentor</th>
                <th className="px-6 py-3">Rubric Score</th>
                <th className="px-6 py-3">Formal Decision</th>
                <th className="px-6 py-3">Audit Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-[11px] text-slate-500">{r.id}</td>
                  <td className="px-6 py-3.5 font-heading font-semibold text-slate-900">{r.project}</td>
                  <td className="px-6 py-3.5">{r.reviewer}</td>
                  <td className="px-6 py-3.5 font-mono text-[11px] font-semibold text-slate-800">{r.score}</td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-heading font-semibold tracking-wider uppercase border ${
                        r.decision === "APPROVED"
                          ? "bg-teal-50 text-teal-800 border-teal-200"
                          : r.decision === "REJECTED"
                          ? "bg-rose-50 text-rose-800 border-rose-200"
                          : "bg-amber-50 text-amber-800 border-amber-200"
                      }`}
                    >
                      {r.decision.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-mono text-slate-500 text-[11px]">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}