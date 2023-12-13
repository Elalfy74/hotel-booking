'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/ui/loader';

export interface DeleteManyItemsButtonProps {
  ids: string[];
  // Unselect rows after deletion
  onDone: () => void;
}

interface DeleteManyButtonProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  isDisabled: boolean;
  isPending: boolean;
  onDelete: () => void;
}

export const DeleteManyButton = (props: DeleteManyButtonProps) => {
  const { opened, setOpened, isPending, isDisabled, onDelete } = props;

  return (
    <AlertDialog open={opened} onOpenChange={setOpened}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="h-8" disabled={isDisabled}>
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
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            {isPending ? <Loader className="h-1.5 w-1.5 bg-white" /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
