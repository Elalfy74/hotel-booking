import { Prisma, type Role } from '@prisma/client';

export interface UsersFilter {
  query: string;
  roles?: Role[];
}

export function getUsersWhereFilter(filter: UsersFilter) {
  let where: Prisma.UserFindManyArgs['where'] = {};

  if (filter.query.trim().length > 0) {
    where.OR = [
      { firstName: { contains: filter.query, mode: 'insensitive' } },
      { lastName: { contains: filter.query, mode: 'insensitive' } },
    ];
  }

  if (filter.roles?.length) {
    where.role = { in: filter.roles };
  }

  return where;
}
