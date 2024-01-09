import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getUsers } from '../../../_actions';
import { getUsersWhereFilter, type UsersFilter } from './utils';

type DefaultUsersQueryKey = readonly [
  'users',
  { currentPage: number; pageSize: number; filter: UsersFilter },
];

export const defaultUsersQueryKey: DefaultUsersQueryKey = [
  'users',
  { currentPage: 0, pageSize: 10, filter: { query: '', roles: [] } },
] as const;

interface UseUsersProps {
  currentPage: number;
  pageSize: number;
  filter: UsersFilter;
}

export const useUsers = ({ currentPage, pageSize, filter }: UseUsersProps) => {
  const queryKey = ['users', { currentPage, pageSize, filter }] as const;
  const where = getUsersWhereFilter(filter);

  const query = useQuery({
    queryKey,
    queryFn: () =>
      getUsers({
        skip: (currentPage - 1) * pageSize,
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
