import { FilterIcon } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';

import { Filter } from './filter';

export const FilterModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 hover:bg-gray-50">
          <FilterIcon className="h-5 w-5 " />
        </button>
      </DialogTrigger>
      <DialogContent className="h-screen overflow-auto">
        <div className="mr-10 flex flex-row justify-between">
          <h1 className="text-base font-medium">Filters</h1>
          <button className="text-gray-600">Clear</button>
        </div>
        <Separator className="my-4" />
        <Filter />
      </DialogContent>
    </Dialog>
  );
};
