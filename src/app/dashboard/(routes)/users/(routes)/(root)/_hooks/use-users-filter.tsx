import { type Role } from '@prisma/client';
import { parseAsJson, useQueryState } from 'nuqs';

import { UsersFilter } from './utils';

export const useUsersFilter = () => {
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsJson<UsersFilter>().withDefault({
      query: '',
      roles: undefined,
    }),
  );

  const setQ = (q: string) => {
    if (q === filter.query) {
      return;
    }
    setFilter({ ...filter, query: q });
  };
  const setUsersRoles = (roles: Role[] | undefined) => {
    setFilter({ ...filter, roles });
  };

  const resetFilter = () => {
    setFilter(null);
  };

  return {
    filter,
    setQ,
    setUsersRoles,
    resetFilter,
  };
};
