"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search01Icon, Cancel01Icon } from "hugeicons-react";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";

export interface ISearchFilterProps {
  placeholder?: string;
  className?: string;
}

export default function SearchFilter({
  placeholder = "Search by project, student name, or email...",
  className,
}: ISearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const urlTerm = searchParams.get("searchTerm") || "";
  const [searchTerm, setSearchTerm] = useState(urlTerm);
  const debouncedTerm = useDebounce(searchTerm, 400);

  // Sync state if URL changes externally
  useEffect(() => {
    setSearchTerm(urlTerm);
  }, [urlTerm]);

  // Sync debounced search to URL
  useEffect(() => {
    if (debouncedTerm === urlTerm) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedTerm.trim()) {
      params.set("searchTerm", debouncedTerm.trim());
    } else {
      params.delete("searchTerm");
    }
    params.set("page", "1");

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  }, [debouncedTerm, urlTerm, router, searchParams]);

  const handleClear = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("searchTerm");
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className={`relative flex-1 ${className || ""}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        <Search01Icon className="w-3.5 h-3.5" />
      </div>
      <Input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-8 h-9 text-xs font-body bg-white border-slate-200"
        disabled={isPending}
      />
      {searchTerm && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <Cancel01Icon className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}