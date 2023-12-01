import { usePagination } from 'react-use-pagination';

type UsePaginationConfig = {
  totalItems?: number;
  initialPage?: number;
  initialPageSize?: number;
};

export const useAppPagination = (props?: UsePaginationConfig) => {
  const pagination = usePagination(props);

  return {
    ...pagination,
    // unexpected behavior when currentPage is -1
    currentPage: pagination.currentPage === -1 ? 0 : pagination.currentPage,
  };
};
