"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderGit2,
  FileCheck2,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { logoutUser } from "@/services/auth/auth";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: FolderGit2, path: "/dashboard/projects" },
    { name: "Reviews", icon: FileCheck2, path: "/dashboard/reviews" },
    { name: "Users", icon: Users, path: "/dashboard/users" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname?.startsWith(path);
  };

  return (
    <aside className="w-64 bg-[#11112b] text-slate-300 flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold text-white tracking-wide">Review Portal</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group ${
              isActive(item.path)
                ? "bg-[#5343e5] text-white"
                : "hover:bg-white/5 text-slate-400 hover:text-white"
            }`}
          >
            <item.icon
              className={`w-5 h-5 ${
                isActive(item.path)
                  ? "text-white"
                  : "text-slate-400 group-hover:text-white"
              }`}
            />
            <span className="font-medium text-[15px]">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-8 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors group hover:bg-white/5 text-slate-400 hover:text-rose-400"
        >
          <LogOut className="w-5 h-5 text-slate-400 group-hover:text-rose-400" />
          <span className="font-medium text-[15px]">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}