'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getHotelsCount } from '../../../_actions';
import { getHotelsWhereFilter, HotelsFilter } from './utils';

type DefaultHotelsCountQueryKey = readonly ['hotels count', { filter: HotelsFilter }];

export const defaultHotelsCountQueryKey: DefaultHotelsCountQueryKey = [
  'hotels count',
  { filter: { query: '', isFeatured: undefined, citiesFilter: [] } },
] as const;

export const useHotelsCount = ({ filter }: { filter: HotelsFilter }) => {
  const queryKey = ['hotels count', { filter }] as const;
  const where = getHotelsWhereFilter(filter);

  const query = useQuery({
    queryKey: ['hotels count', filter],
    queryFn: () => getHotelsCount({ where }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
