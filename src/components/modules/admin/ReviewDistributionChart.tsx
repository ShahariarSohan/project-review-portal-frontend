"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { IProjectPlatformStats } from "@/services/project/getProjectStats";

interface IReviewDistributionChartProps {
  stats: IProjectPlatformStats;
}

const COLORS = [
  { name: "Approved", color: "#0d9488", bg: "bg-teal-600" },
  { name: "Pending", color: "#f59e0b", bg: "bg-amber-500" },
  { name: "Rejected", color: "#e11d48", bg: "bg-rose-600" },
];

export default function ReviewDistributionChart({ stats }: IReviewDistributionChartProps) {
  const chartData = [
    { name: "Approved", value: stats.approved },
    { name: "Pending", value: stats.pending },
    { name: "Rejected", value: stats.rejected },
  ].filter((item) => item.value > 0);

  const total = stats.total || 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-heading text-sm font-bold text-slate-900">
              Evaluation Outcome Distribution
            </h3>
            <p className="text-[11px] text-slate-500 font-body">
              Status breakdown across all submitted student repositories
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200 text-xs font-mono font-bold">
            {stats.passRate}% Pass Rate
          </span>
        </div>

        {total === 0 ? (
          <div className="h-56 flex items-center justify-center text-xs text-slate-400 font-body">
            No submissions recorded yet
          </div>
        ) : (
          <div className="h-56 w-full relative my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {chartData.map((entry) => {
                    const matched = COLORS.find((c) => c.name === entry.name);
                    return (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={matched ? matched.color : "#94a3b8"}
                      />
                    );
                  })}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${val} projects (${Math.round(((val as number) / (total || 1)) * 100)}%)`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "8px",
                    color: "#f8fafc",
                    fontSize: "11px",
                    fontFamily: "monospace",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-2xl font-bold text-slate-800">
                {total}
              </span>
              <span className="text-[10px] font-heading font-medium text-slate-400 uppercase tracking-wider">
                Total Repos
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Legend Bar */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
        {COLORS.map((item) => {
          const count =
            item.name === "Approved"
              ? stats.approved
              : item.name === "Pending"
              ? stats.pending
              : stats.rejected;
          const pct = total > 0 ? Math.round((count / total) * 100) : 0;
          return (
            <div key={item.name} className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${item.bg} shrink-0`} />
              <div className="truncate">
                <span className="text-[11px] font-heading font-semibold text-slate-700 block truncate">
                  {item.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {count} ({pct}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
