import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Loader } from './loader';

interface DataTableRowActionsProps {
  editUrl?: string;
  EditComponent?: React.ComponentType<{ children: React.ReactNode }>;
  handleDelete: () => void;
  isPending: boolean;
}

export function DataTableRowActions({
  EditComponent,
  editUrl,
  handleDelete,
  isPending,
}: DataTableRowActionsProps) {
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild className="cursor-pointer">
            <>
              {editUrl && <Link href={editUrl}>Edit</Link>}
              {EditComponent && (
                <EditComponent>
                  <Button
                    variant="ghost"
                    className="h-full w-full justify-start rounded px-2 py-1.5 text-sm"
                  >
                    Edit
                  </Button>
                </EditComponent>
              )}
            </>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <AlertDialogTrigger className="h-full w-full">Delete</AlertDialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete it and remove it from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            {isPending ? <Loader className="h-1.5 w-1.5 bg-white" /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
