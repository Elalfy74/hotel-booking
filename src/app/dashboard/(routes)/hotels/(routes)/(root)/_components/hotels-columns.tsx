'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { CustomAvatar } from '@/components/custom-avatar';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { getIdColumn } from '@/components/ui/get-id-column';
import { getSelectColumn } from '@/components/ui/get-select-column';

import { type IHotel } from '../../../_actions';
import { type HotelsTableKeys } from '../_hooks/use-hotels-table';

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
          {row.original.name}
        </div>
      );
    },
  },
];
