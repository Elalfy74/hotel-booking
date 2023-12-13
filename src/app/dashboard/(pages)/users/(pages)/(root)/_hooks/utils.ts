import { Prisma, type Role } from '@prisma/client';
import { type QueryClient } from '@tanstack/react-query';

import { UserTableKeys } from './use-users-table';

interface IReValidateAfterDelete {
  keys: UserTableKeys;
  queryClient: QueryClient;
  amount?: number;
}

export function reValidateAfterDelete({ keys, queryClient, amount = 1 }: IReValidateAfterDelete) {
  type KeyOfKeys = keyof typeof keys;

  const keysAsArray = Object.values(keys).map((value) => value[0]) as string[];

  const keysAsString = new Map<KeyOfKeys, string>();

  for (const key in keys) {
    const k = key as KeyOfKeys;
    keysAsString.set(k, JSON.stringify(keys[k]));
  }

  // Remove all users queries except the current users one
  queryClient.removeQueries({
    predicate: (query) => {
      // If the query is not a user query, return false to not remove it
      if (!keysAsArray.includes(query.queryKey[0] as string)) return false;

      const stringQueryKey = JSON.stringify(query.queryKey);

      let isFound;

      keysAsString.forEach((value, key) => {
        if (value === stringQueryKey) {
          keysAsString.delete(key);
          isFound = true;
        }
      });

      return !isFound;
    },
  });

  // Update the current Count query locally
  queryClient.setQueryData<{ data: number; error?: string }>(keys.usersCountQueryKey, (oldData) => {
    if (!oldData) return oldData;

    return {
      ...oldData,
      data: oldData.data - amount,
    };
  });

  // Invalidate the current users to refetch the data as it should be equal to the page size
  queryClient.invalidateQueries({
    queryKey: keys.usersQueryKey,
  });
}

export interface UsersFilter {
  query: string;
  role: Role[];
}
export function getUsersWhereFilter(filter: UsersFilter) {
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

  return where;
}
