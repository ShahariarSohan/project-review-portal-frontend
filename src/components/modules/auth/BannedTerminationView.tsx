"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Cancel01Icon,
  Logout01Icon,
  Shield01Icon,
  UserCheck01Icon,
} from "hugeicons-react";
import { logoutUser } from "@/services/auth/auth";
import { Button } from "@/components/ui/button";

interface IBannedTerminationViewProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "STUDENT" | "MENTOR" | "ADMIN";
    status: "ACTIVE" | "SUSPENDED" | "BANNED";
  };
}

export default function BannedTerminationView({
  user,
}: IBannedTerminationViewProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      router.push("/");
    } catch {
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-lg">
        {/* Termination Alert Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 flex items-center justify-center mb-3 shadow-2xs">
            <Cancel01Icon className="w-7 h-7 stroke-[2]" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-heading font-bold uppercase tracking-widest border border-rose-200 mb-2">
            Access Revocation
          </span>
          <h1 className="font-heading text-2xl font-bold text-slate-900 tracking-tight">
            Account Permanently Banned
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-body max-w-sm">
            Platform dashboard privileges and evaluation access have been permanently terminated.
          </p>
        </div>

        {/* Primary Termination Card */}
        <div className="bg-white rounded-xl shadow-2xs border border-rose-200/90 overflow-hidden font-body">
          {/* Top Status Strip */}
          <div className="bg-rose-600 px-6 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Shield01Icon className="w-4 h-4" />
              <span className="font-heading text-xs font-semibold uppercase tracking-wider">
                Termination Notice
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-rose-700/80 text-[10px] font-mono font-bold uppercase tracking-wider border border-rose-500">
              Status: BANNED
            </span>
          </div>

          <div className="p-6 space-y-5">
            {/* User Identity Details */}
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading font-bold text-slate-500 uppercase tracking-wider">
                  Affected Account
                </span>
                <span className="text-[10px] font-mono font-semibold text-slate-600 uppercase bg-slate-200/70 px-2 py-0.5 rounded">
                  {user.role}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                  <UserCheck01Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-semibold text-xs text-slate-900 truncate">
                    {user.name}
                  </p>
                  <p className="font-mono text-[11px] text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Explanation Content */}
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed font-body">
              <p>
                Platform administrators have permanently revoked access for this account. Under standard institutional security protocol, dashboard entry is denied and all interactive capabilities are disabled.
              </p>
              <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200/60 text-rose-800 text-xs">
                <p className="font-heading font-bold text-[11px] uppercase tracking-wider mb-1">
                  Enforced Restrictions
                </p>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-rose-700">
                  <li>Total lockout from student submission and mentor evaluation workspaces</li>
                  <li>Rejection of all authenticated API requests and data endpoints</li>
                  <li>Permanent suspension of credentials and evaluation records</li>
                </ul>
              </div>
              <p className="text-[11px] text-slate-500">
                If you believe this revocation was issued in error or have inquiries regarding academic policies, please direct correspondence to the institutional review committee.
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[10px] font-mono text-slate-400">
                Session ID: {user.id.slice(0, 12)}
              </span>
              <Button
                onClick={handleSignOut}
                disabled={isLoggingOut}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-heading font-semibold text-xs h-9 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Logout01Icon className="w-3.5 h-3.5" />
                <span>{isLoggingOut ? "Signing Out..." : "Sign Out & Return Home"}</span>
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center text-[11px] text-slate-400 mt-6 font-mono">
          Project Review Portal
        </p>
      </div>
    </div>
  );
}
