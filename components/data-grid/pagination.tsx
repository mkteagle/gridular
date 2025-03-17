import React from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  setPageIndex: (index: number) => void;
  setPageSize: (size: number) => void;
  pageSizeOptions: number[];
  processedDataLength: number;
}

export const Pagination = ({
  pageIndex,
  pageCount,
  pageSize,
  setPageIndex,
  setPageSize,
  pageSizeOptions,
  processedDataLength,
}: PaginationProps) => {
  return (
    <div className={cn("p-2 flex items-center justify-between")}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
          className="border rounded px-2 py-1 text-sm bg-background"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span className="text-sm text-muted-foreground">
          {pageIndex * pageSize + 1}-
          {Math.min((pageIndex + 1) * pageSize, processedDataLength)} of{" "}
          {processedDataLength}
        </span>

        <button
          onClick={() => setPageIndex(0)}
          disabled={pageIndex === 0}
          className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
        >
          {"<<"}
        </button>

        <button
          onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
          disabled={pageIndex === 0}
          className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
        >
          {"<"}
        </button>

        <button
          onClick={() => setPageIndex(Math.min(pageCount - 1, pageIndex + 1))}
          disabled={pageIndex >= pageCount - 1}
          className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
        >
          {">"}
        </button>

        <button
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={pageIndex >= pageCount - 1}
          className="p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};