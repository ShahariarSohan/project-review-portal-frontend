"use client";

import { useState, useTransition } from "react";
import toast from "@/lib/toast";
import {
  CheckmarkCircle02Icon,
  Cancel01Icon,
  Shield01Icon,
  Alert02Icon,
} from "hugeicons-react";
import { IUserItem } from "@/services/user/getAllUsers";
import updateUserStatus from "@/services/user/updateUserStatus";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IUserStatusActionProps {
  user: IUserItem;
  currentAdminId?: string;
}

export default function UserStatusAction({
  user,
  currentAdminId,
}: IUserStatusActionProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | null>(
    null
  );

  const isProtectedAdmin =
    user.email.toLowerCase() === "admin@reviewportal.com" ||
    (currentAdminId && user.id === currentAdminId);

  if (isProtectedAdmin) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400">
        <Shield01Icon className="w-3.5 h-3.5 text-slate-400" />
        <span>Protected</span>
      </span>
    );
  }

  const handleStatusChange = (newStatus: "ACTIVE" | "SUSPENDED" | "BANNED") => {
    if (newStatus === user.status) return;

    startTransition(async () => {
      const result = await updateUserStatus(user.id, newStatus);
      if (result.success) {
        toast.success(`User status updated to ${newStatus.toLowerCase()}`);
        setFeedback("Updated");
        setFeedbackType("success");
      } else {
        toast.error(result.message || "Failed to update user status");
        setFeedback(result.message || "Failed");
        setFeedbackType("error");
      }
      setTimeout(() => {
        setFeedback(null);
        setFeedbackType(null);
      }, 3000);
    });
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-28">
        <Select
          value={user.status}
          onValueChange={(val) =>
            handleStatusChange(val as "ACTIVE" | "SUSPENDED" | "BANNED")
          }
          disabled={isPending}
        >
          <SelectTrigger className="h-7 text-[11px] font-heading font-medium bg-white border-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">
              <span className="text-emerald-700 font-medium">Active</span>
            </SelectItem>
            <SelectItem value="SUSPENDED">
              <span className="text-amber-700 font-medium">Suspended</span>
            </SelectItem>
            <SelectItem value="BANNED">
              <span className="text-rose-700 font-medium">Banned</span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {feedback && (
        <span
          className={`text-[10px] font-heading font-medium shrink-0 flex items-center gap-0.5 ${
            feedbackType === "success" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {feedbackType === "success" ? (
            <CheckmarkCircle02Icon className="w-3 h-3" />
          ) : (
            <Cancel01Icon className="w-3 h-3" />
          )}
          {feedback}
        </span>
      )}
    </div>
  );
}
