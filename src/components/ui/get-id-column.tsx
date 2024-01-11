import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from './data-table-column-header';

export function getIdColumn<T>(): ColumnDef<T> {
  return {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Id" />,
    cell: ({ row }) => <div className="max-w-[80px] truncate">{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  };
}
