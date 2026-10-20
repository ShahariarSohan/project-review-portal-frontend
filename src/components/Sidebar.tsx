"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  DashboardSquare01Icon,
  Folder01Icon,
  FileValidationIcon,
  UserGroupIcon,
  Settings02Icon,
  Logout01Icon,
  Shield01Icon,
} from "hugeicons-react";
import { logoutUser } from "@/services/auth/auth";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  const menuItems = [
    { name: "Overview", icon: DashboardSquare01Icon, path: "/dashboard" },
    { name: "Projects", icon: Folder01Icon, path: "/dashboard/projects" },
    { name: "Reviews", icon: FileValidationIcon, path: "/dashboard/reviews" },
    { name: "Directory", icon: UserGroupIcon, path: "/dashboard/users" },
    { name: "Settings", icon: Settings02Icon, path: "/dashboard/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(path);
  };

  return (
    <aside className="w-64 bg-[#0d121c] text-slate-400 flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0 border-r border-slate-800/80">
      <div className="p-5 flex items-center gap-3 border-b border-slate-800/60">
        <div className="w-8 h-8 rounded-lg bg-teal-800 text-teal-100 flex items-center justify-center shrink-0 border border-teal-700">
          <Shield01Icon className="w-4 h-4 stroke-[2]" />
        </div>
        <div className="flex flex-col">
          <span className="font-heading text-sm font-bold text-slate-100 tracking-tight">
            Review Portal
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
            Console
          </span>
        </div>
      </div>

      <div className="px-4 pt-5 pb-2">
        <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Navigation
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? "bg-teal-950/70 text-teal-300 border border-teal-800/60 shadow-xs"
                  : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon
                className={`w-4 h-4 transition-colors ${
                  active ? "text-teal-400 stroke-[2.2]" : "text-slate-500 group-hover:text-slate-300"
                }`}
              />
              <span className="font-heading text-xs font-semibold tracking-wide">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800/60">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold font-heading tracking-wide text-slate-400 hover:bg-slate-800/60 hover:text-rose-400 transition-colors"
        >
          <Logout01Icon className="w-4 h-4 text-slate-500 group-hover:text-rose-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}