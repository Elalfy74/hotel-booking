'use client';

import { AppLoading } from '@/components/app-loading';
import { DataTable } from '@/components/ui/data-table';

import { useUsersTable } from '../_hooks/use-users-table';
import { deleteManyUsersButtonWithKeys } from './delete-many-users-button';
import { columns } from './users-columns';
import { UsersFilter } from './users-filter';

export const UsersTable = () => {
  const {
    usersData,
    usersLoading,
    usersFetching,

    usersCount,
    usersCountLoading,
    usersCountFetching,

    usersFilter,
    pagination,
    keys,
  } = useUsersTable();

  // Handle Loading State
  if (usersLoading || usersCountLoading || !usersData?.data || usersCount?.data === undefined) {
    return <AppLoading />;
  }

  // Handle Data Fetching Errors
  if (usersData?.error) throw new Error(usersData.error);
  if (usersCount?.error) throw new Error(usersCount.error);

  const DeleteButton = deleteManyUsersButtonWithKeys(keys);

  return (
    <DataTable
      columns={columns(keys)}
      data={usersData.data}
      isLoading={usersFetching || usersCountFetching}
      filter={<UsersFilter {...usersFilter} resetPage={pagination.resetPage} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
