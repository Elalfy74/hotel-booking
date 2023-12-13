import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getUsers } from '../../../_actions';
import { getUsersWhereFilter, type UsersFilter } from './utils';

interface UseUsersProps {
  currentPage: number;
  pageSize: number;
  filter: UsersFilter;
}

export const defaultUsersQueryKey = [
  'users',
  { currentPage: 0, pageSize: 10, filter: { query: '', role: [] } },
] as const;

export const useUsers = ({ currentPage, pageSize, filter }: UseUsersProps) => {
  const queryKey = ['users', { currentPage, pageSize, filter }];
  const where = getUsersWhereFilter(filter);

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
