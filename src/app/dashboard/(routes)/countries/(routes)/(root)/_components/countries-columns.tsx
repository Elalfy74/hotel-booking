/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type Country } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';

import { CustomAvatar } from '@/components/custom-avatar';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { getIdColumn } from '@/components/ui/get-id-column';
import { getSelectColumn } from '@/components/ui/get-select-column';
import { Switch } from '@/components/ui/switch';
import { useDisclosure } from '@/hooks/use-disclosure';

import { type CurrentCountriesTableQKeys } from '../_hooks/use-countries-table';
import { useDeleteCountry } from '../_hooks/use-delete-country';
import { useToggleFeatureCountry } from '../_hooks/use-toggle-feature-country';

export const columns = (currentQKeys: CurrentCountriesTableQKeys): ColumnDef<Country>[] => [
  getSelectColumn(),
  getIdColumn(),

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
      const [checked, { toggle }] = useDisclosure(row.original.isFeatured);

      const { mutate } = useToggleFeatureCountry({
        currentItemsKey: currentQKeys.countriesQueryKey,
      });

      return (
        <Switch
          checked={checked}
          onCheckedChange={() => {
            toggle();
            mutate(id);
          }}
        />
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;

      const { mutate, isPending } = useDeleteCountry({ currentQKeys });

      return (
        <DataTableRowActions
          editUrl={`/dashboard/countries/${id}`}
          handleDelete={mutate.bind(null, id)}
          isPending={isPending}
        />
      );
    },
  },
];
