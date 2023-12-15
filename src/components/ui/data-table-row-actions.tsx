import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { Loader } from './loader';

interface DataTableRowActionsProps {
  editUrl: string;
  handleDelete: () => Promise<{ error?: string }>;
  isPending: boolean;
}

export function DataTableRowActions({
  editUrl,
  handleDelete,
  isPending,
}: DataTableRowActionsProps) {
  const [opened, { setOpened, close }] = useDisclosure();

  const onDeleteClick = async () => {
    const { error } = await handleDelete();

    if (!error) {
      close();
    }
  };

  return (
    <AlertDialog open={opened} onOpenChange={setOpened}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={editUrl}>Edit</Link>
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
          <Button variant="destructive" onClick={onDeleteClick} disabled={isPending}>
            {isPending ? <Loader className="h-1.5 w-1.5 bg-white" /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
