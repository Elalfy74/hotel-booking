import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getUsersCount } from '../../../_actions';
import { getUsersWhereFilter, type UsersFilter } from './utils';

type DefaultUsersCountQueryKey = readonly ['users count', { filter: UsersFilter }];

export const defaultUsersCountQueryKey: DefaultUsersCountQueryKey = [
  'users count',
  { filter: { query: '', roles: undefined } },
] as const;

export const useUsersCount = ({ filter }: { filter: UsersFilter }) => {
  const queryKey = ['users count', { filter }] as const;
  const where = getUsersWhereFilter(filter);

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
