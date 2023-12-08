'use client';

import { AppLoading } from '@/components/app-loading';
import { DataTable } from '@/components/ui/data-table';

import { useUsersTable } from '../_hooks/use-users-table';
import { deleteButtonWithKeys } from './delete-many-users-button';
import { columns } from './users-columns';
import { UsersFilter } from './users-filter';

export const UsersTable = () => {
  const {
    usersData,
    usersLoading,
    userFetching,

    usersCount,
    usersCountLoading,
    useCountFetching,

    usersFilter,
    pagination,
    keys,
  } = useUsersTable();

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
      filter={<UsersFilter {...usersFilter} resetPage={pagination.resetPage} />}
      deleteBtn={DeleteButton}
      {...pagination}
    />
  );
};
