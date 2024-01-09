import { useMemo } from 'react';

import { useQueryPagination } from '@/hooks/use-query-pagination';

import { useHotels } from './use-hotels';
import { useHotelsCount } from './use-hotels-count';
import { useHotelsFilter } from './use-hotels-filter';

export const useHotelsTable = () => {
  const hotelsFilter = useHotelsFilter();

  // Fetch Hotels count
  const {
    data: hotelsCount,
    isPending: hotelsCountLoading,
    isFetching: hotelsCountFetching,
    queryKey: hotelsCountQueryKey,
  } = useHotelsCount({ filter: hotelsFilter.filter });

  const pagination = useQueryPagination({
    totalItems: hotelsCount?.data,
  });

  // Fetch Hotels based on pagination and filter
  const {
    data: hotelsData,
    isPending: hotelsLoading,
    isFetching: hotelsFetching,
    queryKey: hotelsQueryKey,
  } = useHotels({
    currentPage: pagination.page,
    pageSize: pagination.pageSize,
    filter: hotelsFilter.filter,
  });

  const currentQKeys = useMemo(
    () => ({ hotelsQueryKey, hotelsCountQueryKey }),
    [hotelsCountQueryKey, hotelsQueryKey],
  );
  return {
    hotelsData,
    hotelsLoading,
    hotelsFetching,

    hotelsCount,
    hotelsCountLoading,
    hotelsCountFetching,

    hotelsFilter,
    pagination,
    currentQKeys,
  };
};
export type HotelsTableKeys = ReturnType<typeof useHotelsTable>['currentQKeys'];
