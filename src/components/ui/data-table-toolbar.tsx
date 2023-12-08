'use client';

import { Table } from '@tanstack/react-table';

import { DeleteManyButtonProps } from '@/app/dashboard/users/(pages)/(root)/_components/delete-many-users-button';

import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children: React.ReactNode;
  deleteBtn: React.ComponentType<DeleteManyButtonProps>;
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
        <DeleteBtn ids={selectedIds} onDone={() => table.resetRowSelection()} />

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
