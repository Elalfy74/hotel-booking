import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCities } from '../../../_actions';
import { CitiesFilter, getCitiesWhereFilter } from './utils';

interface UseCitiesProps {
  currentPage: number;
  pageSize: number;
  filter: CitiesFilter;
}

export const defaultCitiesQueryKey = [
  'cities',
  { currentPage: 0, pageSize: 10, filter: { query: '', isFeatured: undefined } },
] as const;

export const useCities = ({ currentPage, pageSize, filter }: UseCitiesProps) => {
  const queryKey = ['cities', { currentPage, pageSize, filter }];
  const where = getCitiesWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getCities({
        skip: currentPage * pageSize,
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