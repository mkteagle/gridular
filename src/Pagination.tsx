import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn, tssToInlineStyles } from './lib/utils';
import type { GridClasses } from './types';

export interface PaginationProps {
  pageIndex: number;
  pageSize: number;
  totalRows: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  classes?: GridClasses;
  className?: string;
}

export function Pagination({
  pageIndex,
  pageSize,
  totalRows,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  classes,
  className,
}: PaginationProps) {
  const pageCount = Math.ceil(totalRows / pageSize);
  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  const canGoPrevious = pageIndex > 0;
  const canGoNext = pageIndex < pageCount - 1;

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3 border-t',
        'bg-ivory border-vg-border',
        classes?.pagination,
        className
      )}
      style={tssToInlineStyles(classes?.paginationStyle)}
    >
      {/* Page size selector */}
      {onPageSizeChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-charcoal font-ui">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className={cn(
              'border rounded px-2 py-1 text-sm font-ui',
              'bg-ivory border-vg-border text-charcoal',
              'focus:outline-none focus:ring-2 focus:ring-copper'
            )}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Page info */}
      <div
        className={cn(
          'text-sm text-charcoal font-ui',
          classes?.pageInfo
        )}
        style={tssToInlineStyles(classes?.pageInfoStyle)}
      >
        {totalRows > 0 ? (
          <>
            {startRow}–{endRow} of {totalRows}
          </>
        ) : (
          'No rows'
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <PaginationButton
          onClick={() => onPageChange(0)}
          disabled={!canGoPrevious}
          aria-label="First page"
          classes={classes}
        >
          <ChevronsLeft className="w-4 h-4" />
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={!canGoPrevious}
          aria-label="Previous page"
          classes={classes}
        >
          <ChevronLeft className="w-4 h-4" />
        </PaginationButton>

        <span className="px-3 text-sm font-ui text-charcoal">
          Page {pageIndex + 1} of {pageCount || 1}
        </span>

        <PaginationButton
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={!canGoNext}
          aria-label="Next page"
          classes={classes}
        >
          <ChevronRight className="w-4 h-4" />
        </PaginationButton>

        <PaginationButton
          onClick={() => onPageChange(pageCount - 1)}
          disabled={!canGoNext}
          aria-label="Last page"
          classes={classes}
        >
          <ChevronsRight className="w-4 h-4" />
        </PaginationButton>
      </div>
    </div>
  );
}

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  'aria-label': string;
  children: React.ReactNode;
  classes?: GridClasses;
}

function PaginationButton({
  onClick,
  disabled,
  'aria-label': ariaLabel,
  children,
  classes,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(
        'p-2 rounded transition-all',
        'border border-vg-border bg-ivory',
        'hover:bg-ivory-dark hover:border-copper-light',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        'disabled:hover:bg-ivory disabled:hover:border-vg-border',
        'text-charcoal',
        classes?.paginationButton
      )}
      style={tssToInlineStyles(classes?.paginationButtonStyle)}
    >
      {children}
    </button>
  );
}
