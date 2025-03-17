import { useState, useMemo } from "react";

export const usePagination = <T>(
  data: T[],
  enablePagination: boolean,
  initialPageSize: number
) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const pageCount = useMemo(
    () => Math.ceil(data.length / pageSize),
    [data.length, pageSize]
  );

  const paginatedData = useMemo(() => {
    if (!enablePagination) return data;
    const start = pageIndex * pageSize;
    return data.slice(start, start + pageSize);
  }, [data, pageIndex, pageSize, enablePagination]);

  return {
    paginatedData,
    pageCount,
    pageIndex,
    setPageIndex,
    pageSize,
    setPageSize,
  };
};
