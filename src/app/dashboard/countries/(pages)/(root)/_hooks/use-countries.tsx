import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCountries } from '../../../_actions';
import { type CountriesFilter, getCountriesWhereFilter } from './utils';

interface UseCountriesProps {
  currentPage: number;
  pageSize: number;
  filter: CountriesFilter;
}

export const defaultCountriesQueryKey = [
  'countries',
  { currentPage: 0, pageSize: 10, filter: { query: '', isFeatured: undefined } },
];

export const useCountries = ({ currentPage, pageSize, filter }: UseCountriesProps) => {
  const queryKey = ['countries', { currentPage, pageSize, filter }];
  const where = getCountriesWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getCountries({
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
