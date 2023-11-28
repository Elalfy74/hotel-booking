'use client';

import { Table } from '@tanstack/react-table';

import { useDisclosure } from '@/hooks/use-disclosure';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Button } from './button';
import { DataTableViewOptions } from './data-table-view-options';
import { Loader } from './loader';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  children: React.ReactNode;
  handleDeleteSelected: (ids: string[], onSuccess: () => void) => void;
  isDeleting: boolean;
}

export function DataTableToolbar<TData extends { id: string }>({
  table,
  children,
  handleDeleteSelected,
  isDeleting,
}: DataTableToolbarProps<TData>) {
  const selectedRows = table.getSelectedRowModel().rows;

  const [opened, { close, setOpened }] = useDisclosure();

  const onDelete = () => {
    const ids = selectedRows.map((row) => row.original.id);

    handleDeleteSelected(ids, () => {
      close();
      table.resetRowSelection();
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">{children}</div>
      <div className="flex items-center space-x-2">
        <AlertDialog open={opened} onOpenChange={setOpened}>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              className="h-8"
              disabled={selectedRows.length === 0 || isDeleting}
            >
              Delete Selected
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete it and remove it from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
              <Button variant="destructive" onClick={onDelete} disabled={isDeleting}>
                {isDeleting ? <Loader className="h-1.5 w-1.5 bg-white" /> : 'Delete'}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
