import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCities } from '../../../_actions';
import { type CitiesFilter, getCitiesWhereFilter } from './utils';

type DefaultCitiesQueryKey = readonly [
  'cities',
  { currentPage: number; pageSize: number; filter: CitiesFilter },
];

export const defaultCitiesQueryKey: DefaultCitiesQueryKey = [
  'cities',
  {
    currentPage: 1,
    pageSize: 10,
    filter: { query: '', isFeatured: undefined, countriesFilter: [] },
  },
] as const;

interface UseCitiesProps {
  currentPage: number;
  pageSize: number;
  filter: CitiesFilter;
}

export const useCities = ({ currentPage, pageSize, filter }: UseCitiesProps) => {
  const queryKey = ['cities', { currentPage, pageSize, filter }] as const;
  const where = getCitiesWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getCities({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        where,
      }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
