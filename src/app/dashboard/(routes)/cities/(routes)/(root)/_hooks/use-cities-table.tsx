import { useMemo } from 'react';

import { useAppPagination } from '@/hooks/use-app-pagination';

import { useCities } from './use-cities';
import { useCitiesCount } from './use-cities-count';
import { useCitiesFilter } from './use-cities-filter';
import { CitiesFilter } from './utils';

export const useCitiesTable = () => {
  // Handle Cities Filter
  const citiesFilter = useCitiesFilter();

  // Extract ids
  const countriesFilter = citiesFilter.selectedCountries.map((country) => country.value);

  // Filter Cities by searchValue and isFeatured
  const filter: CitiesFilter = {
    query: citiesFilter.searchValue,
    isFeatured: citiesFilter.isFeatured,
    countriesFilter,
  };

  // Fetch Cities count
  const {
    data: citiesCount,
    isPending: citiesCountLoading,
    isFetching: citiesCountFetching,
    queryKey: citiesCountQueryKey,
  } = useCitiesCount({ filter });

  // Handle pagination
  const pagination = useAppPagination({
    totalItems: citiesCount?.data,
    initialPage: 0,
    initialPageSize: 10,
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
    filter,
  });

  const keys = useMemo(
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
    keys,
  };
};

export type CitiesTableKeys = ReturnType<typeof useCitiesTable>['keys'];
