import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHotels } from '../../../_actions';
import { getHotelsWhereFilter, type HotelsFilter } from './utils';

type DefaultHotelsQueryKey = readonly [
  'hotels',
  { currentPage: number; pageSize: number; filter: HotelsFilter },
];

export const defaultHotelsQueryKey: DefaultHotelsQueryKey = [
  'hotels',
  {
    currentPage: 1,
    pageSize: 10,
    filter: { query: '', isFeatured: undefined, citiesFilter: [] },
  },
] as const;

interface UseHotelsProps {
  currentPage: number;
  pageSize: number;
  filter: HotelsFilter;
  slim?: boolean;
}

export const useHotels = ({ currentPage, pageSize, filter, slim = false }: UseHotelsProps) => {
  const queryKey = ['hotels', { currentPage, pageSize, filter }] as const;
  const where = getHotelsWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getHotels({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        where,
        slim,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
