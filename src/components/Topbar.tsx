"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Settings02Icon,
  Logout01Icon,
} from "hugeicons-react";
import { logoutUser, getUserProfile } from "@/services/auth/auth";

export default function Topbar() {
  const router = useRouter();
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
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

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUserProfile();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser({
          name: "Portal Admin",
          email: "admin@reviewportal.com",
          role: "ADMIN",
        });
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    router.push("/");
  };

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
              {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-xs font-semibold text-slate-800">
                {user?.name || "Admin"}
              </span>
              <span className="font-mono text-[10px] text-teal-700 uppercase tracking-wider font-semibold">
                {user?.role || "ADMIN"}
              </span>
            </div>
          </div>

          {isAdminOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-md border border-slate-200 py-1.5 z-50">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-[10px] font-heading font-semibold uppercase tracking-wider text-slate-400">
                  Signed in as
                </p>
                <p className="font-mono text-xs text-slate-700 truncate mt-0.5">
                  {user?.email || "admin@reviewportal.com"}
                </p>
              </div>

              <Link
                href="/dashboard/settings"
                onClick={() => setIsAdminOpen(false)}
                className="w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs font-heading font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Settings02Icon className="w-4 h-4 text-slate-500" />
                <span>Account Settings</span>
              </Link>

              <div className="h-px bg-slate-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-heading font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <Logout01Icon className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}