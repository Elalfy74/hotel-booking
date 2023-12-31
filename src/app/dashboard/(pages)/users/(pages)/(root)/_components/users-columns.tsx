/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { CustomAvatar } from '@/components/custom-avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { useDisclosure } from '@/hooks/use-disclosure';

import { UserDto } from '../../../_actions/user.dto';
import { useDeleteUser } from '../_hooks/use-delete-user';
import { UserTableKeys } from '../_hooks/use-users-table';

export const columns = (keys: UserTableKeys): ColumnDef<UserDto>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
    },

    {
      accessorKey: 'id',
      header: ({ column }) => <DataTableColumnHeader column={column} title="User" />,
      cell: ({ row }) => <div className="max-w-[80px] truncate">{row.getValue('id')}</div>,
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: 'fullName',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Full Name" />,
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <CustomAvatar src={row.original.image} width={80} height={80}>
              {row.original.firstName?.[0] || 'A'}
            </CustomAvatar>
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

        // Delete Alert State
        const [opened, { setOpened, close }] = useDisclosure();

        const { mutate, isPending } = useDeleteUser({ onSuccess: close, keys });

        return (
          <DataTableRowActions
            id={id}
            entity="users"
            handleDelete={() => mutate(id)}
            isPending={isPending}
            opened={opened}
            setOpened={setOpened}
          />
        );
      },
    },
  ];
};
