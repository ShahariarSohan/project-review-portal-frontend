"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ITablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
}

export default function TablePagination({
  currentPage,
  totalPages,
  totalItems,
}: ITablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const navigateToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const changeLimit = (newLimit: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit);
    params.set("page", "1");
    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  const currentLimit = searchParams.get("limit") || "10";
  const hasMultiplePages = totalPages > 1;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-3 border-t border-slate-200/80 text-xs font-body">
      {/* Total Count Information */}
      <div className="text-slate-500 font-mono text-[11px]">
        {totalItems !== undefined && (
          <span>
            Total: <strong className="text-slate-900 font-semibold">{totalItems}</strong>{" "}
            {totalItems === 1 ? "entry" : "entries"}
          </span>
        )}
      </div>

      {/* Pagination Controls - only visible when multiple pages exist */}
      {hasMultiplePages && (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToPage(currentPage - 1)}
            disabled={currentPage <= 1 || isPending}
            className="h-8 px-2.5 text-xs font-medium cursor-pointer"
          >
            <ArrowLeft01Icon className="w-3.5 h-3.5 mr-1" />
            <span>Prev</span>
          </Button>

          {/* Numbered Page Buttons */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = idx + (totalPages - 4);
              } else {
                pageNum = idx + currentPage - 2;
              }

              const isActive = pageNum === currentPage;
              return (
                <Button
                  key={pageNum}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => navigateToPage(pageNum)}
                  disabled={isPending}
                  className={`h-8 w-8 p-0 text-xs font-mono cursor-pointer ${
                    isActive ? "bg-teal-800 hover:bg-teal-900 text-white" : ""
                  }`}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateToPage(currentPage + 1)}
            disabled={currentPage >= totalPages || isPending}
            className="h-8 px-2.5 text-xs font-medium cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight01Icon className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      )}

      {/* Page Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-slate-500 text-[11px]">Per page:</span>
        <div className="w-20">
          <Select
            value={currentLimit}
            onValueChange={changeLimit}
            disabled={isPending}
          >
            <SelectTrigger className="h-8 text-xs font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}