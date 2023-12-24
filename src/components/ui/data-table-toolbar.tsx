'use client';

import { type Table } from '@tanstack/react-table';

import { type DeleteManyItemsButtonProps } from '@/app/dashboard/_components/delete-many-button';

import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children: React.ReactNode;
  deleteBtn: React.ComponentType<DeleteManyItemsButtonProps>;
}

export function DataTableToolbar<TData extends { id: string }>({
  table,
  children,
  deleteBtn: DeleteBtn,
}: DataTableToolbarProps<TData>) {
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedIds = selectedRows.map((row) => row.original.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">{children}</div>
      <div className="flex items-center space-x-2">
        <DeleteBtn ids={selectedIds} onDone={table.resetRowSelection} />

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
