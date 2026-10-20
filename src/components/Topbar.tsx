"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Settings, LogOut } from "lucide-react";
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
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
      <div>
        <h2 className="text-sm font-semibold text-slate-700">Project Review Portal</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={adminRef}>
          <div
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-indigo-200 transition-all">
              {user?.profileImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={user.profileImage}
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-semibold text-slate-700">
                {user?.name || "Admin User"}
              </span>
              <span className="text-xs text-slate-400 font-medium capitalize">
                {user?.role ? user.role.toLowerCase() : "Administrator"}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-all ${
                isAdminOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isAdminOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
              <div className="px-4 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                <p className="text-sm font-semibold text-slate-800 truncate">
                  {user?.email || "admin@reviewportal.com"}
                </p>
              </div>

              <Link
                href="/dashboard/settings"
                onClick={() => setIsAdminOpen(false)}
                className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 font-medium hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Account Settings</span>
              </Link>

              <div className="h-px bg-slate-100 my-1"></div>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}