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

export const usersQueryKey = [
  'users',
  { currentPage: 0, pageSize: 10, filter: { role: [], query: '' } },
];

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

  const queryKey = ['users', { currentPage, pageSize, filter }];

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getUsers({
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
