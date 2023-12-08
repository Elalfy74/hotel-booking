import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCountriesCount } from '../../../_actions';
import { type CountriesFilter, getCountriesWhereFilter } from './utils';

interface UseCountriesCountProps {
  filter: CountriesFilter;
}

export const defaultCountriesCountQueryKey = [
  'countries count',
  { filter: { query: '', isFeatured: undefined } },
];

export const useCountriesCount = ({ filter }: UseCountriesCountProps) => {
  const queryKey = ['countries count', { filter }];
  const where = getCountriesWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () => getCountriesCount({ where }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
