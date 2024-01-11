'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHotelCategoriesCount } from '../../../_actions';
import { getHotelCategoriesWhereFilter, type HotelCategoriesFilter } from './utils';

type DefaultHotelCategoriesCountQueryKey = readonly [
  'hotel categories count',
  { filter: HotelCategoriesFilter },
];
export const defaultHotelCategoriesCountQueryKey: DefaultHotelCategoriesCountQueryKey = [
  'hotel categories count',
  { filter: { query: '' } },
] as const;

export const useHotelCategoriesCount = ({ filter }: { filter: HotelCategoriesFilter }) => {
  const queryKey = ['hotel categories count', { filter }] as const;
  const where = getHotelCategoriesWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () => getHotelCategoriesCount({ where }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
