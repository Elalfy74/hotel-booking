'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useUpdateHotelCategory } from '../_hooks/use-update-hotel-category';
import { EditHotelCategoryFormDataSupply } from './edit-hotel-category-form-data-supply';

export function editHotelCategoryDialogWithId(id: string) {
  return function EditHotelCategoryDialogWithoutId(props: { children: React.ReactNode }) {
    return <EditHotelCategoryDialog id={id} {...props} />;
  };
}

export const EditHotelCategoryDialog = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [isOpen, setOpen] = useState(false);

  const { mutateAsync, isPending } = useUpdateHotelCategory();

  const onSubmit = async (formData: FormData) => {
    const res = await mutateAsync({ id, formData });

    if (res.error) return;

    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Hotel Category</DialogTitle>
        </DialogHeader>
        <EditHotelCategoryFormDataSupply id={id} isPending={isPending} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
