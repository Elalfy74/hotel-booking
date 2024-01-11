'use client';

import { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { useCreateHotelCategory } from '../_hooks/use-create-hotel-category';
import { CreateHotelCategoryForm } from './create-hotel-category-form';

export const CreateHotelCategoryDialog = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = useState(false);

  const { mutateAsync, isPending } = useCreateHotelCategory();

  const onSubmit = async (formData: FormData) => {
    const res = await mutateAsync(formData);

    if (res.error) return;

    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Hotel Category</DialogTitle>
        </DialogHeader>
        <CreateHotelCategoryForm onSubmit={onSubmit} isPending={isPending} />
      </DialogContent>
    </Dialog>
  );
};
