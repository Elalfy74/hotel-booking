import { useCallback } from 'react';
import { usePagination } from 'react-use-pagination';

type UsePaginationConfig = {
  totalItems?: number;
  initialPage?: number;
  initialPageSize?: number;
};

export const useAppPagination = (props?: UsePaginationConfig) => {
  const { setPage, ...pagination } = usePagination(props);

  const resetPage = useCallback(() => {
    setPage(0);
  }, [setPage]);

  return {
    ...pagination,
    // unexpected behavior when currentPage is -1
    currentPage: pagination.currentPage === -1 ? 0 : pagination.currentPage,
    setPage,
    resetPage,
  };
};
