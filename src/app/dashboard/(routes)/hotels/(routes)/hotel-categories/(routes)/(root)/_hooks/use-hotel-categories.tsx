import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHotelCategories } from '../../../_actions';
import { getHotelCategoriesWhereFilter, type HotelCategoriesFilter } from './utils';

type DefaultHotelCategoriesQueryKey = readonly [
  'hotel categories',
  { currentPage: number; pageSize: number; filter: HotelCategoriesFilter },
];

export const defaultHotelCategoriesQueryKey: DefaultHotelCategoriesQueryKey = [
  'hotel categories',
  {
    currentPage: 1,
    pageSize: 10,
    filter: { query: '' },
  },
] as const;

interface UseHotelCategoriesProps {
  currentPage: number;
  pageSize: number;
  filter: HotelCategoriesFilter;
  withHotelsCount?: boolean;
}

export const useHotelCategories = ({
  currentPage,
  pageSize,
  filter,
  withHotelsCount = false,
}: UseHotelCategoriesProps) => {
  const queryKey = ['hotel categories', { currentPage, pageSize, filter }] as const;
  const where = getHotelCategoriesWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getHotelCategories({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        where,
        withHotelsCount,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
