import { useMemo } from 'react';

import { useQueryPagination } from '@/hooks/use-query-pagination';

import { useHotelCategories } from './use-hotel-categories';
import { useHotelCategoriesCount } from './use-hotel-categories-count';
import { useHotelCategoriesFilter } from './use-hotel-categories-filter';

export const useHotelCategoriesTable = () => {
  const hotelCategoriesFilter = useHotelCategoriesFilter();

  // Fetch Hotel Categories count
  const {
    data: hotelCategoriesCount,
    isPending: hotelCategoriesCountLoading,
    isFetching: hotelCategoriesCountFetching,
    queryKey: hotelCategoriesCountQueryKey,
  } = useHotelCategoriesCount({ filter: hotelCategoriesFilter.filter });

  const pagination = useQueryPagination({
    totalItems: hotelCategoriesCount?.data,
  });

  // Fetch Hotel Categories based on pagination and filter
  const {
    data: hotelCategoriesData,
    isPending: hotelCategoriesLoading,
    isFetching: hotelCategoriesFetching,
    queryKey: hotelCategoriesQueryKey,
  } = useHotelCategories({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    filter: hotelCategoriesFilter.filter,
    withHotelsCount: true,
  });

  const currentQKeys = useMemo(
    () => ({ hotelCategoriesQueryKey, hotelCategoriesCountQueryKey }),
    [hotelCategoriesCountQueryKey, hotelCategoriesQueryKey],
  );

  return {
    currentQKeys,
    hotelCategoriesData,
    hotelCategoriesCount,
    pagination,
    hotelCategoriesFilter,
    hotelCategoriesLoading,
    hotelCategoriesCountLoading,
    hotelCategoriesCountFetching,
    hotelCategoriesFetching,
  };
};
export type HotelCategoriesTableKeys = ReturnType<typeof useHotelCategoriesTable>['currentQKeys'];
