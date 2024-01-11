/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { type ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { DataTableRowActions } from '@/components/ui/data-table-row-actions';
import { getIdColumn } from '@/components/ui/get-id-column';
import { getSelectColumn } from '@/components/ui/get-select-column';

import { type IHotelCategory } from '../../../_actions';
import { useDeleteHotelCategory } from '../_hooks/use-delete-hotel-category';
import { HotelCategoriesTableKeys } from '../_hooks/use-hotel-categories-table';
import { editHotelCategoryDialogWithId } from './edit-hotel-category-dialog';

export const columns = (currentQKeys: HotelCategoriesTableKeys): ColumnDef<IHotelCategory>[] => [
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
    accessorKey: 'hotels number',
    accessorFn: (row) => row._count.hotels,
    header: ({ column }) => <DataTableColumnHeader column={column} title="Hotels Number" />,
    cell: ({ row }) => {
      return <div className="max-w-[150px] truncate capitalize">{row.original._count.hotels}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const { id } = row.original;
      const { mutateAsync, isPending } = useDeleteHotelCategory({ currentQKeys });
      const EditComponent = editHotelCategoryDialogWithId(id);

      return (
        <DataTableRowActions
          EditComponent={EditComponent}
          handleDelete={mutateAsync.bind(null, id)}
          isPending={isPending}
        />
      );
    },
  },
];
