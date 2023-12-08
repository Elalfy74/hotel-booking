import { type Prisma } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getCountriesCount } from '../../../_actions';

interface UseCountriesCountProps {
  filter: {
    query: string;
    isFeatured: boolean | undefined;
  };
}

export const defaultCountriesCountQueryKey = [
  'countries count',
  { filter: { query: '', isFeatured: undefined } },
];

export const useCountriesCount = ({ filter }: UseCountriesCountProps) => {
  let where: Prisma.CountryCountArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.name = { contains: filter.query, mode: 'insensitive' };
  }

  if (filter.isFeatured !== undefined) {
    where.isFeatured = filter.isFeatured;
  }

  const queryKey = ['countries count', { filter }];

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
