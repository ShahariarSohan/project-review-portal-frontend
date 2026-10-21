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
import { IUserDirectoryStats } from "@/services/user/getUserStats";

interface IUserGovernanceChartProps {
  stats: IUserDirectoryStats;
}

export default function UserGovernanceChart({ stats }: IUserGovernanceChartProps) {
  const roleData = [
    { name: "Students", count: stats.students, color: "#0d9488" },
    { name: "Mentors", count: stats.mentors, color: "#3b82f6" },
    { name: "Admins", count: stats.admins, color: "#6366f1" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <h3 className="font-heading text-sm font-bold text-slate-900">
            Account Governance & Roles
          </h3>
          <p className="text-[11px] text-slate-500 font-body">
            Distribution of registered accounts across security tiers
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-slate-600">{stats.active} Active</span>
        </div>
      </div>

      <div className="h-56 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={roleData}
            layout="vertical"
            margin={{ top: 15, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis
              type="number"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
            />
            <Tooltip
              formatter={(val: any) => [`${val} accounts`, "Registered"]}
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
            <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={28}>
              {roleData.map((entry, index) => (
                <Cell key={`role-bar-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-[11px] font-body text-slate-500">
        <span>Suspended Accounts: <strong className="font-mono text-amber-700">{stats.suspended}</strong></span>
        <span>Banned Accounts: <strong className="font-mono text-rose-700">{stats.banned}</strong></span>
      </div>
    </div>
  );
}
