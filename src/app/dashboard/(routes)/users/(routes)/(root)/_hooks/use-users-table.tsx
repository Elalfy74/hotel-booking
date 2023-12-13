import { useMemo } from 'react';

import { useAppPagination } from '@/hooks/use-app-pagination';

import { useUsers } from './use-users';
import { useUsersCount } from './use-users-count';
import { useUsersFilter } from './use-users-filter';

export const useUsersTable = () => {
  // Handle Users Filter
  const usersFilter = useUsersFilter();
  // Filter users by searchValue and selectedRoles

  const filter = { query: usersFilter.searchValue, role: usersFilter.selectedRoles };
  // Fetch users count
  const {
    data: usersCount,
    isPending: usersCountLoading,
    isFetching: usersCountFetching,
    queryKey: usersCountQueryKey,
  } = useUsersCount({ filter });

  // Handle pagination
  const pagination = useAppPagination({
    totalItems: usersCount?.data,
    initialPage: 0,
    initialPageSize: 10,
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
    filter,
  });

  const keys = useMemo(
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
    keys,
  };
};

export type UserTableKeys = ReturnType<typeof useUsersTable>['keys'];
