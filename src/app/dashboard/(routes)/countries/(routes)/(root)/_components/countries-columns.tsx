/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type Country } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

import { CustomAvatar } from '@/components/custom-avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Switch } from '@/components/ui/switch';

import { CountriesTableKeys } from '../_hooks/use-countries-table';
import { useDeleteCountry } from '../_hooks/use-delete-country';
import { useToggleFeatureCountry } from '../_hooks/use-toggle-feature-country';

export const columns = (keys: CountriesTableKeys): ColumnDef<Country>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
    cell: ({ row }) => <div className="max-w-[80px] truncate">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 capitalize">
          <CustomAvatar
            src={row.original.image}
            width={80}
            height={80}
            fallback={row.original.name[0]}
          />
          {row.original.name}
        </div>
      );
    },
  },

  {
    accessorKey: 'isFeatured',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Featured" />;
    },
    cell: ({ row }) => {
      const id = row.original.id;
      const [checked, setChecked] = useState(row.original.isFeatured);

      const toggle = () => setChecked((prev) => !prev);

      const { mutate } = useToggleFeatureCountry({
        keys,
        onChange: toggle,
      });

      return <Switch checked={checked} onCheckedChange={() => mutate(id)} />;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;

      const { mutateAsync, isPending } = useDeleteCountry({ keys });

      return (
        <DataTableRowActions
          editUrl={`/dashboard/countries/${id}`}
          handleDelete={mutateAsync.bind(null, id)}
          isPending={isPending}
        />
      );
    },
  },
];
