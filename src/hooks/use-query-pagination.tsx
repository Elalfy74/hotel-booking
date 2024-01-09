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
  const [totalItemsState, setTotalItemsState] = useState(totalItems);
  const isTotalItemsChanged = useRef(false);

  const totalItemsRef = useRef(totalItems);
  totalItemsRef.current = totalItems;

  const totalPages = useMemo(() => {
    return getTotalPages(totalItemsState, pageSize);
  }, [totalItemsState, pageSize]);

  const handleSetTotalItems = useCallback((newTotalItems: number) => {
    setTotalItemsState(newTotalItems);
  }, []);

  useEffect(() => {
    return () => {
      if (typeof totalItemsRef.current !== 'number' || totalItems === totalItemsRef.current) {
        return;
      }

      if (!isTotalItemsChanged.current) {
        isTotalItemsChanged.current = true;
      } else {
        setPage(null);
      }
      handleSetTotalItems(totalItemsRef.current);
    };
  }, [totalItems, pageSize, setPage, handleSetTotalItems]);

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

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setPageSize(newPageSize);
      setPage(null);
    },
    [setPageSize, setPage],
  );

  return {
    page,
    setPage,
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
