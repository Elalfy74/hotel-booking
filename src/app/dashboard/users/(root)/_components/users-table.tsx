'use client';

import { useMemo } from 'react';

import { AppLoading } from '@/components/app-loading.server';
import { DataTable } from '@/components/ui/data-table';
import { useAppPagination } from '@/hooks/use-app-pagination';

import { useUsers } from '../_hooks/use-users';
import { useUsersCount } from '../_hooks/use-users-count';
import { useUsersFilter } from '../_hooks/use-users-filter';
import { deleteButtonWithKeys } from './delete-many-users-button';
import { columns } from './users-columns';
import { UsersFilter } from './users-filter';

export const UsersTable = () => {
  // Handle Users Filter
  const usersFilter = useUsersFilter();
  // Filter users by searchValue and selectedRoles
  const filter = { query: usersFilter.searchValue, role: usersFilter.selectedRoles };

  // Fetch users count
  const {
    data: usersCount,
    isLoading: usersCountLoading,
    isFetching: useCountFetching,
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
    isLoading: usersLoading,
    isFetching: userFetching,
    queryKey: usersQueryKey,
  } = useUsers({
    currentPage: pagination.currentPage,
    pageSize: pagination.pageSize,
    filter,
  });

  const keys = useMemo(
    () => [usersQueryKey, usersCountQueryKey],
    [usersQueryKey, usersCountQueryKey],
  );

  // Handle Data Fetching Errors
  if (usersData?.error) throw new Error(usersData.error);
  if (usersCount?.error) throw new Error(usersCount.error);

  // Handle Loading State
  if (usersLoading || usersCountLoading || !usersData?.data || usersCount?.data === undefined) {
    return <AppLoading />;
  }

  const DeleteButton = deleteButtonWithKeys(keys);

  return (
    <DataTable
      columns={columns(keys)}
      data={usersData.data}
      isLoading={userFetching || useCountFetching}
      filter={<UsersFilter {...usersFilter} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
