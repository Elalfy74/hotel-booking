import { useMemo } from 'react';

import { useAppPagination } from '@/hooks/use-app-pagination';

import { useCountries } from './use-countries';
import { useCountriesCount } from './use-countries-count';
import { useCountriesFilter } from './use-countries-filter';

export const useCountriesTable = () => {
  // Handle Countries Filter
  const countriesFilter = useCountriesFilter();

  // Filter Countries by searchValue and isFeatured
  const filter = { query: countriesFilter.searchValue, isFeatured: countriesFilter.isFeatured };

  // Fetch countries count
  const {
    data: countriesCount,
    isLoading: countriesCountLoading,
    isFetching: countriesCountFetching,
    queryKey: countriesCountQueryKey,
  } = useCountriesCount({ filter });

  // Handle pagination
  const pagination = useAppPagination({
    totalItems: countriesCount?.data,
    initialPage: 0,
    initialPageSize: 10,
  });

  // Fetch countries based on pagination and filter
  const {
    data: countriesData,
    isLoading: countriesLoading,
    isFetching: countriesFetching,
    queryKey: countriesQueryKey,
  } = useCountries({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    filter,
  });

  const keys = useMemo(
    () => ({ countriesQueryKey, countriesCountQueryKey }),
    [countriesQueryKey, countriesCountQueryKey],
  );

  return {
    countriesData,
    countriesLoading,
    countriesFetching,

    countriesCount,
    countriesCountLoading,
    countriesCountFetching,

    countriesFilter,
    pagination,
    keys,
  };
};

export type CountriesTableKeys = ReturnType<typeof useCountriesTable>['keys'];
