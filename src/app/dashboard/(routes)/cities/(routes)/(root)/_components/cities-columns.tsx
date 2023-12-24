/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { CustomAvatar } from '@/components/custom-avatar';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { getIdColumn } from '@/components/ui/get-id-column';
import { getSelectColumn } from '@/components/ui/get-select-column';
import { Switch } from '@/components/ui/switch';
import { useDisclosure } from '@/hooks/use-disclosure';

import { CityDto } from '../../../_actions/city.dto';
import { type CitiesTableKeys } from '../_hooks/use-cities-table';
import { useDeleteCity } from '../_hooks/use-delete-city';
import { useToggleFeatureCity } from '../_hooks/use-toggle-feature-city';

export const columns = (currentQKeys: CitiesTableKeys): ColumnDef<CityDto>[] => [
  getSelectColumn(),
  getIdColumn(),

  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2 capitalize">
          <CustomAvatar
            src={row.original.images[0].url}
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

      const { mutate } = useToggleFeatureCity({
        currentItemsKey: currentQKeys.citiesQueryKey,
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

      const { mutate, isPending } = useDeleteCity({ currentQKeys });

      return (
        <DataTableRowActions
          editUrl={`/dashboard/cities/${id}`}
          handleDelete={mutate.bind(null, id)}
          isPending={isPending}
        />
      );
    },
  },
];
