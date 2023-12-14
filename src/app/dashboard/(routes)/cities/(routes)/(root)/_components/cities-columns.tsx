/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useState } from 'react';

import { CustomAvatar } from '@/components/custom-avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { Switch } from '@/components/ui/switch';
import { useDisclosure } from '@/hooks/use-disclosure';

import { CityDto } from '../../../_actions/city.dto';
import { type CitiesTableKeys } from '../_hooks/use-cities-table';
import { useDeleteCity } from '../_hooks/use-delete-city';
import { useToggleFeatureCity } from '../_hooks/use-toggle-feature-city';

export const columns = (keys: CitiesTableKeys): ColumnDef<CityDto>[] => [
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
          <CustomAvatar src={row.original.images[0].url} width={80} height={80}>
            {row.original.name[0]}
          </CustomAvatar>
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

      const { mutate } = useToggleFeatureCity({
        keys,
        onChange: toggle,
      });

      return <Switch checked={checked} onCheckedChange={() => mutate(id)} />;
    },
  },

  //TODO test logic
  {
    accessorKey: 'country',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
    cell: ({ row }) => {
      const country = {
        id: row.original.country.id,
        name: row.original.country.name,
        image: row.original.country.image,
        isFeatured: row.original.country.isFeatured,
      };

      return (
        <Button asChild variant="link" className="p-0">
          <Link
            href={{
              pathname: `/dashboard/countries/${country.id}`,
              query: { country: JSON.stringify(country) },
            }}
          >
            {country.name}
          </Link>
        </Button>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;

      // Delete Alert State
      const [opened, { setOpened, close }] = useDisclosure();

      const { mutate, isPending } = useDeleteCity({ onSuccess: close, keys });

      return (
        <DataTableRowActions
          id={id}
          entity="cities"
          handleDelete={() => {
            mutate(id);
          }}
          isPending={isPending}
          opened={opened}
          setOpened={setOpened}
        />
      );
    },
  },
];
