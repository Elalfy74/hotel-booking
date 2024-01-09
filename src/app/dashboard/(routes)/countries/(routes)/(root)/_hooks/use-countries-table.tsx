import { useMemo } from 'react';

import { useQueryPagination } from '@/hooks/use-query-pagination';

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
    isPending: countriesCountLoading,
    isFetching: countriesCountFetching,
    queryKey: countriesCountQueryKey,
  } = useCountriesCount({ filter });

  // Handle pagination
  const pagination = useQueryPagination({
    totalItems: countriesCount?.data,
  });

  // Fetch countries based on pagination and filter
  const {
    data: countriesData,
    isPending: countriesLoading,
    isFetching: countriesFetching,
    queryKey: countriesQueryKey,
  } = useCountries({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    filter,
  });

  const currentQKeys = useMemo(
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
    currentQKeys,
  };
};

export type CurrentCountriesTableQKeys = ReturnType<typeof useCountriesTable>['currentQKeys'];
