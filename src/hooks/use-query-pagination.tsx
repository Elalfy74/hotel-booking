'use client';

import { parseAsInteger, useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function getTotalPages(totalItems: number, pageSize: number) {
  return Math.ceil(totalItems / pageSize);
}

interface UseQueryPaginationProps {
  totalItems?: number;
}
export const useQueryPagination = ({ totalItems = 0 }: UseQueryPaginationProps = {}) => {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState('pageSize', parseAsInteger.withDefault(10));

  const totalPages = useMemo(() => {
    return getTotalPages(totalItems, pageSize);
  }, [totalItems, pageSize]);

  const nextEnabled = useMemo(() => page < totalPages, [page, totalPages]);
  const previousEnabled = useMemo(() => page > 1, [page]);

  const setNextPage = useCallback(() => {
    if (!nextEnabled) return;
    setPage((page) => page + 1);
  }, [nextEnabled, setPage]);

  const setPreviousPage = useCallback(() => {
    if (!previousEnabled) return;
    setPage((page) => page - 1);
  }, [previousEnabled, setPage]);

  const resetPage = useCallback(() => {
    setPage(null);
  }, [setPage]);

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setPage(null);
    },
    [setPageSize, setPage],
  );

  return {
    currentPage: page,
    setPage,
    resetPage,
    pageSize,
    setPageSize: handlePageSizeChange,
    totalItems,
    totalPages: totalPages === 0 ? 1 : totalPages,
    nextEnabled,
    previousEnabled,
    setNextPage,
    setPreviousPage,
  };
};
export type UseQueryPaginationReturn = ReturnType<typeof useQueryPagination>;
