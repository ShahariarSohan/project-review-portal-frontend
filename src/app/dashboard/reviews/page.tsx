import { FileCheck2, Search, SlidersHorizontal } from "lucide-react";

export default function ReviewsPage() {
  const reviews = [
    { id: "REV-201", project: "Distributed Task Scheduler", reviewer: "Dr. Marcus Vance", score: "88/100", decision: "PENDING_REVISION", date: "Oct 19, 2026" },
    { id: "REV-202", project: "Automated Code Review Bot", reviewer: "Elena Rostova", score: "94/100", decision: "APPROVED", date: "Oct 18, 2026" },
    { id: "REV-203", project: "Real-time Metrics Dashboard", reviewer: "Dr. Marcus Vance", score: "91/100", decision: "APPROVED", date: "Oct 16, 2026" },
    { id: "REV-204", project: "GraphQL API Gateway", reviewer: "David Kim", score: "62/100", decision: "REJECTED", date: "Oct 14, 2026" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Reviews</h1>
        <p className="text-slate-500 text-sm mt-0.5">Evaluation notes, scoring rubrics, and mentor feedback.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviews by project or reviewer..."
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span>Preferences</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3.5 font-semibold">Review ID</th>
                <th className="px-6 py-3.5 font-semibold">Project Title</th>
                <th className="px-6 py-3.5 font-semibold">Reviewer</th>
                <th className="px-6 py-3.5 font-semibold">Score</th>
                <th className="px-6 py-3.5 font-semibold">Decision</th>
                <th className="px-6 py-3.5 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{r.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-900">{r.project}</td>
                  <td className="px-6 py-4">{r.reviewer}</td>
                  <td className="px-6 py-4 font-mono font-medium">{r.score}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        r.decision === "APPROVED"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : r.decision === "REJECTED"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      {r.decision.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}