"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { IProjectPlatformStats } from "@/services/project/getProjectStats";

interface ISubmissionVelocityChartProps {
  stats: IProjectPlatformStats;
}

export default function SubmissionVelocityChart({
  stats,
}: ISubmissionVelocityChartProps) {
  const data = [
    { name: "Total Repos", count: stats.total, color: "#334155" },
    { name: "Pending", count: stats.pending, color: "#f59e0b" },
    { name: "Approved", count: stats.approved, color: "#0d9488" },
    { name: "Rejected", count: stats.rejected, color: "#e11d48" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-heading text-sm font-bold text-slate-900">
            Review Pipeline Volumes
          </h3>
          <p className="text-[11px] text-slate-500 font-body">
            Direct comparison of queue workloads and resolution volumes
          </p>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Capacity: <strong className="text-slate-800">{stats.total}</strong>
        </span>
      </div>

      <div className="h-56 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 15, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              allowDecimals={false}
            />
            <Tooltip
              formatter={(val: any) => [`${val} submissions`, "Volume"]}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "none",
                borderRadius: "8px",
                color: "#f8fafc",
                fontSize: "11px",
                fontFamily: "monospace",
              }}
              cursor={{ fill: "rgba(241, 245, 249, 0.6)" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={48}>
              {data.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-body">
        <span>Evaluated Submissions: {stats.approved + stats.rejected}</span>
        <span className="font-mono text-teal-800 font-semibold">
          Active Backlog: {stats.pending}
        </span>
      </div>
    </div>
  );
}
