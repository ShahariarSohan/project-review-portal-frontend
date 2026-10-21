"use client";

import { useState } from "react";
import {
  UserCircleIcon,
  Copy01Icon,
  CheckmarkBadge01Icon,
  Calendar03Icon,
} from "hugeicons-react";

interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "MENTOR" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED" | "BANNED";
  createdAt?: string;
}

interface IProfileIdentityCardProps {
  user: IUserProfile | null;
}

export default function ProfileIdentityCard({ user }: IProfileIdentityCardProps) {
  const [copied, setCopied] = useState(false);

  if (!user) {
    return null;
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Member";

  return (
    <div className="space-y-6">
      {/* Primary Identity Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-heading font-bold text-xl shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-lg font-bold text-slate-900 tracking-tight">
                  {user.name}
                </h2>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-heading font-semibold uppercase tracking-wider border ${
                    user.status === "ACTIVE"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : user.status === "SUSPENDED"
                      ? "bg-amber-50 text-amber-800 border-amber-200"
                      : "bg-rose-50 text-rose-800 border-rose-200"
                  }`}
                >
                  {user.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {user.id}</p>
            </div>
          </div>

          <span className="self-start sm:self-auto px-3 py-1 rounded-lg bg-teal-50 text-teal-900 border border-teal-200 text-xs font-heading font-semibold tracking-wide">
            Role: <span className="font-mono uppercase font-bold">{user.role}</span>
          </span>
        </div>

        {/* Credentials & Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500">
              Registered Email
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-slate-900 font-medium truncate">
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1.5 rounded-md hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors shrink-0"
                title="Copy email"
              >
                {copied ? (
                  <CheckmarkBadge01Icon className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy01Icon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1.5">
            <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-slate-500">
              Registration Date
            </span>
            <div className="flex items-center gap-2 text-xs font-body text-slate-800 font-medium">
              <Calendar03Icon className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
