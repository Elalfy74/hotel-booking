import { type Prisma, type Role } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getUsersCount } from '../../../_actions';

interface UseUsersCountProps {
  filter: {
    query: string;
    role: Role[];
  };
}

export const defaultUsersCountQueryKey = ['users count', { filter: { query: '', role: [] } }];

export const useUsersCount = ({ filter }: UseUsersCountProps) => {
  let where: Prisma.UserFindManyArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.OR = [
      { firstName: { contains: filter.query, mode: 'insensitive' } },
      { lastName: { contains: filter.query, mode: 'insensitive' } },
    ];
  }

  if (filter.role.length > 0) {
    where.role = { in: filter.role };
  }

  const queryKey = ['users count', { filter }];

  const query = useQuery({
    queryKey,
    queryFn: () => getUsersCount({ where }),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    queryKey,
  };
};
