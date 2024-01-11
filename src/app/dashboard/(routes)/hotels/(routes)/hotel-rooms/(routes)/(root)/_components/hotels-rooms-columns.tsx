/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { getIdColumn } from '@/components/ui/get-id-column';
import { getSelectColumn } from '@/components/ui/get-select-column';

import { type IHotelRoom } from '../../../_actions';
import { type HotelRoomsTableKeys } from '../_hooks/use-hotel-rooms-table';

export const columns = (currentQKeys: HotelRoomsTableKeys): ColumnDef<IHotelRoom>[] => [
  getSelectColumn(),
  getIdColumn(),

  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <div className="max-w-[150px] truncate capitalize">{row.original.name}</div>;
    },
  },

  {
    accessorKey: 'price',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      return <div className="max-w-[150px] truncate capitalize">{row.original.price}</div>;
    },
  },

  {
    accessorKey: 'beds',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Beds" />,
    cell: ({ row }) => {
      return <div className="max-w-[150px] truncate capitalize">{row.original.beds}</div>;
    },
  },

  {
    accessorKey: 'maxAdults',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Max adults" />,
    cell: ({ row }) => {
      return <div className="max-w-[150px] truncate capitalize">{row.original.maxAdults}</div>;
    },
  },

  {
    accessorKey: 'maxChildren',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Max Children" />,
    cell: ({ row }) => {
      return <div className="max-w-[150px] truncate capitalize">{row.original.maxChildren}</div>;
    },
  },

  {
    accessorKey: 'hotel',
    accessorFn: (row) => row.hotel.name,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hotel" />,
    cell: ({ row }) => {
      return (
        <Button asChild variant="link" className="max-w-[150px] justify-start truncate p-0">
          <Link
            href={{
              pathname: `/dashboard/hotels/${row.original.hotel.id}`,
            }}
          >
            {row.original.hotel.name}
          </Link>
        </Button>
      );
    },
  },

  // TODO update this
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DataTableRowActions
          editUrl={`/dashboard/hotels/${row.original.hotel.id}/hotel-rooms`}
          handleDelete={() => {}}
          isPending={false}
        />
      );
    },
  },
];
