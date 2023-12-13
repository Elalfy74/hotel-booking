import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCitiesCount } from '../../../_actions';
import { type CitiesFilter, getCitiesWhereFilter } from './utils';

interface UseCitiesCountProps {
  filter: CitiesFilter;
}

export const defaultCitiesCountQueryKey = [
  'cities count',
  { filter: { query: '', isFeatured: undefined } },
] as const;

export const useCitiesCount = ({ filter }: UseCitiesCountProps) => {
  const queryKey = ['cities count', { filter }];
  const where = getCitiesWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () => getCitiesCount({ where }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
