"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { FilterHorizontalIcon } from "hugeicons-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentStatus = searchParams.get("status") || "ALL";

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="relative w-40">
      <Select
        value={currentStatus}
        onValueChange={handleStatusChange}
        disabled={isPending}
      >
        <SelectTrigger className="h-9 text-xs font-heading font-medium bg-white border-slate-200">
          <div className="flex items-center gap-1.5 truncate">
            <FilterHorizontalIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <SelectValue placeholder="All States" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All States</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="SUSPENDED">Suspended</SelectItem>
          <SelectItem value="BANNED">Banned</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
