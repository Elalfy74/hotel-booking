'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { HotelSelect } from './hotel-select';

export const HotelSelectDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogPortal>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Select Hotel</DialogTitle>
          </DialogHeader>
          <HotelSelect />
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
