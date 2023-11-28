import { Prisma, Role } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getUsersCount } from '@/actions/users-actions';

interface UseUsersCountProps {
  filter: {
    role: Role[];
    query: string;
  };
}

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

  return useQuery({
    queryKey: ['users count', { filter }],
    queryFn: () => getUsersCount({ where }),
    placeholderData: keepPreviousData,
  });
};
