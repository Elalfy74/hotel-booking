/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { ColumnDef } from '@tanstack/react-table';

import { IUser } from '@/actions/users-actions';
import { CustomAvatar } from '@/components/custom-avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { useDisclosure } from '@/hooks/use-disclosure';

import { useDeleteUser } from '../_hooks/use-delete-user';

export const columns = (onActionDone: () => void): ColumnDef<IUser>[] => {
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
        return <div>{row.original.accounts[0]?.provider || 'Credentials'}</div>;
      },
    },

    {
      id: 'actions',
      cell: ({ row }) => {
        const id = row.original.id;

        const onSuccess = () => {
          close();
          onActionDone();
        };

        const [opened, { setOpened, close }] = useDisclosure();
        const { mutate, isPending } = useDeleteUser(onSuccess);

        return (
          <DataTableRowActions
            id={id}
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
