import { useMemo } from 'react';

import { useQueryPagination } from '@/hooks/use-query-pagination';

import { useCities } from './use-cities';
import { useCitiesCount } from './use-cities-count';
import { useCitiesFilter } from './use-cities-filter';

export const useCitiesTable = () => {
  // Handle Cities Filter
  const citiesFilter = useCitiesFilter();

  // Fetch Cities count
  const {
    data: citiesCount,
    isPending: citiesCountLoading,
    isFetching: citiesCountFetching,
    queryKey: citiesCountQueryKey,
  } = useCitiesCount({ filter: citiesFilter.filter });

  // Handle pagination
  const pagination = useQueryPagination({
    totalItems: citiesCount?.data,
  });

  // Fetch cities based on pagination and filter
  const {
    data: citiesData,
    isPending: citiesLoading,
    isFetching: citiesFetching,
    queryKey: citiesQueryKey,
  } = useCities({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    filter: citiesFilter.filter,
  });

  const currentQKeys = useMemo(
    () => ({ citiesQueryKey, citiesCountQueryKey }),
    [citiesQueryKey, citiesCountQueryKey],
  );

  return {
    citiesData,
    citiesLoading,
    citiesFetching,

    citiesCount,
    citiesCountLoading,
    citiesCountFetching,

    citiesFilter,
    pagination,
    currentQKeys,
  };
};

export type CitiesTableKeys = ReturnType<typeof useCitiesTable>['currentQKeys'];
