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

import { type IHotel } from '../../../_actions';
import { useDeleteHotel } from '../_hooks/use-delete-hotel';
import { type HotelsTableKeys } from '../_hooks/use-hotels-table';
import { useToggleFeatureHotel } from '../_hooks/use-toggle-featured-hotel';

export const columns = (currentQKeys: HotelsTableKeys): ColumnDef<IHotel>[] => [
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
          <div className="max-w-[150px] truncate">{row.original.name}</div>
        </div>
      );
    },
  },

  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={column} title="category" />,
    cell: ({ row }) => {
      return (
        <Button asChild variant="link" className="p-0">
          <Link
            href={{
              pathname: `/dashboard/hotel-categories/${row.original.category.id}`,
            }}
          >
            {row.original.category.name}
          </Link>
        </Button>
      );
    },
  },

  {
    accessorKey: 'rooms',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rooms" />,
    cell: ({ row }) => {
      return (
        <Button asChild variant="link" className="p-0">
          <Link
            href={{
              pathname: `/dashboard/hotel-rooms/${row.original._count.rooms}`,
            }}
          >
            {row.original._count.rooms}
          </Link>
        </Button>
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

      const { mutate } = useToggleFeatureHotel({
        currentItemsKey: currentQKeys.hotelsQueryKey,
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
    accessorKey: 'city',
    header: ({ column }) => <DataTableColumnHeader column={column} title="City" />,
    cell: ({ row }) => {
      return (
        <Button asChild variant="link" className="p-0">
          <Link
            href={{
              pathname: `/dashboard/cities/${row.original.city.id}`,
            }}
          >
            {row.original.city.name}
          </Link>
        </Button>
      );
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const id = row.original.id;

      const { mutate, isPending } = useDeleteHotel({ currentQKeys });

      return (
        <DataTableRowActions
          editUrl={`/dashboard/hotels/${id}`}
          handleDelete={mutate.bind(null, id)}
          isPending={isPending}
        />
      );
    },
  },
];
