"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { UserGroupIcon } from "hugeicons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserRoleFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentRole = searchParams.get("role") || "ALL";

  const handleRoleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete("role");
    } else {
      params.set("role", value);
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-40">
      <Select
        value={currentRole}
        onValueChange={handleRoleChange}
        disabled={isPending}
      >
        <SelectTrigger className="h-9 text-xs font-heading font-medium bg-white border-slate-200">
          <div className="flex items-center gap-1.5 truncate">
            <UserGroupIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <SelectValue placeholder="All Roles" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>
          <SelectItem value="ADMIN">Administrators</SelectItem>
          <SelectItem value="MENTOR">Mentors</SelectItem>
          <SelectItem value="STUDENT">Students</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
