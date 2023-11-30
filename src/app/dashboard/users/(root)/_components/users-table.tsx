'use client';

import { useMemo } from 'react';
import { usePagination } from 'react-use-pagination';
import { toast } from 'sonner';

import { AppLoading } from '@/components/app-loading.server';
import { DataTable } from '@/components/ui/data-table';

import { useDeleteManyUsers } from '../_hooks/use-delete-many-users';
import { useUsers } from '../_hooks/use-users';
import { useUsersCount } from '../_hooks/use-users-count';
import { useUsersFilter } from '../_hooks/use-users-filter';
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
    refetch: refetchUsersCount,
    isRefetching: useCountFetching,
  } = useUsersCount({ filter });

  // Handle pagination
  const pagination = usePagination({
    totalItems: usersCount?.data,
    initialPage: 0,
    initialPageSize: 10,
  });
  // unexpected behavior when currentPage is -1
  const currentPage = useMemo(
    () => (pagination.currentPage === -1 ? 0 : pagination.currentPage),
    [pagination.currentPage],
  );

  // Fetch users based on pagination and filter
  const {
    data: usersData,
    isLoading: usersLoading,
    refetch: refetchUsers,
    isFetching: userFetching,
  } = useUsers({
    currentPage,
    pageSize: pagination.pageSize,
    filter,
  });

  // Refetch users and usersCount
  const refetchAll = async () => {
    const usersCountPromise = refetchUsersCount();
    const usersPromise = refetchUsers();

    await Promise.all([usersCountPromise, usersPromise]);
  };

  // Handle Delete Many Users
  const { mutate, isPending } = useDeleteManyUsers();
  const handleDeleteManyUsers = (ids: string[], onSuccess: () => void) => {
    mutate(ids, {
      onSuccess: async ({ error }) => {
        if (error) return toast.error(error);

        onSuccess();
        toast.success('Users deleted successfully');
        await refetchAll();
      },
    });
  };

  // Handle Data Fetching Errors
  if (usersData?.error) throw new Error(usersData.error);
  if (usersCount?.error) throw new Error(usersCount.error);

  if (usersLoading || usersCountLoading) return <AppLoading />;

  // Handle Data Loading
  // Not actually needed
  if (!usersData?.data || usersCount?.data === undefined) return null;

  return (
    <DataTable
      columns={columns(refetchAll)}
      data={usersData.data}
      isLoading={userFetching || useCountFetching}
      handleDeleteSelected={handleDeleteManyUsers}
      isDeleting={isPending}
      filter={<UsersFilter {...usersFilter} />}
      {...pagination}
    />
  );
};
