"use client";

import { useState } from "react";
import { LockPasswordIcon, ViewIcon, ViewOffIcon } from "hugeicons-react";
import { changePassword } from "@/services/auth/auth";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [statusMsg, setStatusMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setIsError(true);
      setStatusMsg("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    setStatusMsg("");
    setIsError(false);

    try {
      const res = await changePassword({ currentPassword, newPassword });
      if (res.success) {
        setStatusMsg("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setIsError(true);
        setStatusMsg(res.message || "Failed to update password.");
      }
    } catch (err: any) {
      setIsError(true);
      setStatusMsg(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="font-heading text-xl font-bold text-slate-900 tracking-tight">Security & Credentials</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage authentication credentials and account protection.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center border border-teal-200">
            <LockPasswordIcon className="w-4 h-4 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-heading text-sm font-bold text-slate-900">Change Password</h2>
            <p className="text-[11px] text-slate-500">Provide your existing password to establish a new one.</p>
          </div>
        </div>

        {statusMsg && (
          <div
            className={`p-3 rounded-lg text-xs font-semibold border ${
              isError
                ? "bg-rose-50 text-rose-700 border-rose-200"
                : "bg-teal-50 text-teal-800 border-teal-200"
            }`}
          >
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 font-mono"
                placeholder="Current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showCurrentPassword ? (
                  <ViewOffIcon className="w-4 h-4" />
                ) : (
                  <ViewIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 font-mono"
                placeholder="New password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showNewPassword ? (
                  <ViewOffIcon className="w-4 h-4" />
                ) : (
                  <ViewIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-heading font-bold uppercase tracking-wider text-slate-600 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-700 font-mono"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
              >
                {showConfirmPassword ? (
                  <ViewOffIcon className="w-4 h-4" />
                ) : (
                  <ViewIcon className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-teal-800 hover:bg-teal-900 text-white font-heading font-semibold text-xs py-2 px-4 rounded-lg cursor-pointer"
          >
            {isLoading ? "Saving..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}