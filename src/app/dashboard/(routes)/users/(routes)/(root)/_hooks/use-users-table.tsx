import { useMemo } from 'react';

import { useQueryPagination } from '@/hooks/use-query-pagination';

import { useUsers } from './use-users';
import { useUsersCount } from './use-users-count';
import { useUsersFilter } from './use-users-filter';

export const useUsersTable = () => {
  // Handle Users Filter
  const usersFilter = useUsersFilter();

  // Fetch users count
  const {
    data: usersCount,
    isPending: usersCountLoading,
    isFetching: usersCountFetching,
    queryKey: usersCountQueryKey,
  } = useUsersCount({ filter: usersFilter.filter });

  // Handle pagination
  const pagination = useQueryPagination({
    totalItems: usersCount?.data,
  });

  // Fetch users based on pagination and filter
  const {
    data: usersData,
    isPending: usersLoading,
    isFetching: usersFetching,
    queryKey: usersQueryKey,
  } = useUsers({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    filter: usersFilter.filter,
  });

  const currentQKeys = useMemo(
    () => ({ usersQueryKey, usersCountQueryKey }),
    [usersQueryKey, usersCountQueryKey],
  );

  return {
    usersData,
    usersLoading,
    usersFetching,
    usersCount,
    usersCountLoading,
    usersCountFetching,
    usersFilter,
    pagination,
    currentQKeys,
  };
};

export type CurrentUserTableQKeys = ReturnType<typeof useUsersTable>['currentQKeys'];
