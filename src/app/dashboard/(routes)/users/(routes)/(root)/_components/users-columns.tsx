/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { CustomAvatar } from '@/components/custom-avatar';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { getIdColumn } from '@/components/ui/get-id-column';
import { getSelectColumn } from '@/components/ui/get-select-column';

import { UserDto } from '../../../_actions/user.dto';
import { useDeleteUser } from '../_hooks/use-delete-user';
import { type CurrentUserTableQKeys } from '../_hooks/use-users-table';

export const columns = (currentQKeys: CurrentUserTableQKeys): ColumnDef<UserDto>[] => {
  return [
    getSelectColumn(),
    getIdColumn(),

    {
      accessorKey: 'fullName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <CustomAvatar
              src={row.original.image}
              width={80}
              height={80}
              fallback={row.original.firstName?.[0] || 'A'}
            />
            {row.original.firstName} {row.original.lastName}
          </div>
        );
      },
    },

    {
      accessorKey: 'email',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Email" />;
      },
    },

    {
      accessorKey: 'role',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Role" />;
      },
    },

    {
      accessorKey: 'provider',
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Provider" />;
      },
      cell: ({ row }) => {
        return <span className="capitalize">{row.original.provider}</span>;
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => {
        const id = row.original.id;

        const { mutate, isPending } = useDeleteUser({ currentQKeys });

        return (
          <DataTableRowActions
            editUrl={`/dashboard/users/${id}`}
            handleDelete={mutate.bind(null, id)}
            isPending={isPending}
          />
        );
      },
    },
  ];
};
