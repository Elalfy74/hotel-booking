import { type Prisma } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCountries } from '../../../_actions';

interface UseCountriesProps {
  currentPage: number;
  pageSize: number;
  filter: {
    query: string;
    isFeatured: boolean | undefined;
  };
}

export const defaultCountriesQueryKey = [
  'countries',
  { currentPage: 0, pageSize: 10, filter: { query: '', isFeatured: undefined } },
];

export const useCountries = ({ currentPage, pageSize, filter }: UseCountriesProps) => {
  let where: Prisma.CountryCountArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.name = { contains: filter.query, mode: 'insensitive' };
  }

  if (filter.isFeatured !== undefined) {
    where.isFeatured = filter.isFeatured;
  }

  const queryKey = ['countries', { currentPage, pageSize, filter }];

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
