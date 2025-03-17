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
  // New customization options
  className?: string;
  showFirstLastButtons?: boolean;
  showPageSizeSelector?: boolean;
  showPageInfo?: boolean;
  renderPageSizeSelector?: (props: {
    pageSize: number;
    options: number[];
    onChange: (size: number) => void;
  }) => React.ReactNode;
  renderPageInfo?: (props: {
    start: number;
    end: number;
    total: number;
  }) => React.ReactNode;
  renderFirstPageButton?: (props: {
    onClick: () => void;
    disabled: boolean;
  }) => React.ReactNode;
  renderPrevPageButton?: (props: {
    onClick: () => void;
    disabled: boolean;
  }) => React.ReactNode;
  renderNextPageButton?: (props: {
    onClick: () => void;
    disabled: boolean;
  }) => React.ReactNode;
  renderLastPageButton?: (props: {
    onClick: () => void;
    disabled: boolean;
  }) => React.ReactNode;
  pageSizeClassName?: string;
  pageInfoClassName?: string;
  buttonsClassName?: string;
  buttonClassName?: string;
}

export const Pagination = ({
  pageIndex,
  pageCount,
  pageSize,
  setPageIndex,
  setPageSize,
  pageSizeOptions,
  processedDataLength,
  // Custom props
  className,
  showFirstLastButtons = true,
  showPageSizeSelector = true,
  showPageInfo = true,
  renderPageSizeSelector,
  renderPageInfo,
  renderFirstPageButton,
  renderPrevPageButton,
  renderNextPageButton,
  renderLastPageButton,
  pageSizeClassName,
  pageInfoClassName,
  buttonsClassName,
  buttonClassName,
}: PaginationProps) => {
  const start = processedDataLength === 0 ? 0 : pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, processedDataLength);
  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex >= pageCount - 1;

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageIndex(0);
  };

  const goToFirstPage = () => setPageIndex(0);
  const goToPrevPage = () => setPageIndex(Math.max(0, pageIndex - 1));
  const goToNextPage = () =>
    setPageIndex(Math.min(pageCount - 1, pageIndex + 1));
  const goToLastPage = () => setPageIndex(pageCount - 1);

  return (
    <div className={cn("p-2 flex items-center justify-between", className)}>
      {showPageSizeSelector && (
        <div className={cn("flex items-center gap-2", pageSizeClassName)}>
          {renderPageSizeSelector ? (
            renderPageSizeSelector({
              pageSize,
              options: pageSizeOptions,
              onChange: handlePageSizeChange,
            })
          ) : (
            <>
              <span className="text-sm text-muted-foreground">
                Rows per page:
              </span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm bg-background"
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      )}

      <div className={cn("flex items-center", buttonsClassName)}>
        {showPageInfo && (
          <div className={cn("mr-2", pageInfoClassName)}>
            {renderPageInfo ? (
              renderPageInfo({ start, end, total: processedDataLength })
            ) : (
              <span className="text-sm text-muted-foreground">
                {start}-{end} of {processedDataLength}
              </span>
            )}
          </div>
        )}

        {showFirstLastButtons &&
          (renderFirstPageButton ? (
            renderFirstPageButton({
              onClick: goToFirstPage,
              disabled: isFirstPage,
            })
          ) : (
            <button
              onClick={goToFirstPage}
              disabled={isFirstPage}
              className={cn(
                "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
                buttonClassName
              )}
            >
              {"<<"}
            </button>
          ))}

        {renderPrevPageButton ? (
          renderPrevPageButton({
            onClick: goToPrevPage,
            disabled: isFirstPage,
          })
        ) : (
          <button
            onClick={goToPrevPage}
            disabled={isFirstPage}
            className={cn(
              "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
              buttonClassName
            )}
          >
            {"<"}
          </button>
        )}

        {renderNextPageButton ? (
          renderNextPageButton({
            onClick: goToNextPage,
            disabled: isLastPage,
          })
        ) : (
          <button
            onClick={goToNextPage}
            disabled={isLastPage}
            className={cn(
              "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
              buttonClassName
            )}
          >
            {">"}
          </button>
        )}

        {showFirstLastButtons &&
          (renderLastPageButton ? (
            renderLastPageButton({
              onClick: goToLastPage,
              disabled: isLastPage,
            })
          ) : (
            <button
              onClick={goToLastPage}
              disabled={isLastPage}
              className={cn(
                "p-1 rounded hover:bg-muted disabled:opacity-50 disabled:pointer-events-none",
                buttonClassName
              )}
            >
              {">>"}
            </button>
          ))}
      </div>
    </div>
  );
};
