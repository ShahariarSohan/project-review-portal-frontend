"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Settings02Icon, Logout01Icon } from "hugeicons-react";
import { logoutUser } from "@/services/auth/auth";

interface ITopbarProps {
  user?: {
    name?: string;
    email?: string;
    role?: string;
    status?: string;
  } | null;
}

export default function Topbar({ user }: ITopbarProps) {
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const adminRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (adminRef.current && !adminRef.current.contains(event.target as Node)) {
        setIsAdminOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

  const displayName = user?.name || "Member";
  const displayRole = user?.role || "STUDENT";
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <header className="h-14 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <span className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
          Portal
        </span>
        <span className="text-slate-300">/</span>
        <span className="font-heading text-xs font-semibold text-slate-700">
          Management Console
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={adminRef}>
          <div
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-md bg-teal-800 text-teal-100 flex items-center justify-center font-heading font-bold text-xs border border-teal-700">
              {avatarLetter}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-xs font-semibold text-slate-800">
                {displayName}
              </span>
              <span className="font-mono text-[10px] text-teal-700 uppercase tracking-wider font-semibold">
                {displayRole}
              </span>
            </div>
          </div>

          {isAdminOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200/80 py-1.5 z-50 font-body">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="font-heading font-semibold text-xs text-slate-900 truncate">
                  {displayName}
                </p>
                <p className="font-mono text-[11px] text-slate-500 truncate">
                  {user?.email || ""}
                </p>
              </div>

              <div className="py-1">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsAdminOpen(false)}
                  className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
                >
                  <Settings02Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span>Profile Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50/60 transition-colors text-left cursor-pointer"
                >
                  <Logout01Icon className="w-3.5 h-3.5 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}