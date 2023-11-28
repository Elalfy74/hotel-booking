import { Prisma, Role } from '@prisma/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getUsers } from '@/actions/users-actions';

interface UseUsersProps {
  currentPage: number;
  pageSize: number;
  filter: {
    role: Role[];
    query: string;
  };
}

export const useUsers = ({ currentPage, pageSize, filter }: UseUsersProps) => {
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
    queryKey: ['users', { currentPage, pageSize, filter }],
    queryFn: () =>
      getUsers({
        skip: currentPage * pageSize,
        take: pageSize,
        where,
      }),
    placeholderData: keepPreviousData,
  });
};
