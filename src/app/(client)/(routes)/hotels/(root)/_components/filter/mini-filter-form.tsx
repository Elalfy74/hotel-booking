import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { FilterModal } from './filter-modal';

export const MiniFilterForm = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4 rounded-full bg-white p-2 text-gray-500 shadow-sm">
        <Link
          href="/"
          className="duration-main block rounded-full bg-white p-2 shadow-lg hover:bg-gray-50"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </Link>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          Dubai United Arab Amiras July 27 2022 / July 28 2024
        </p>
        <div className="flex gap-3">
          <span className="w-[2px] bg-gray-500"></span>
          <FilterModal />
        </div>
      </div>
    </>
  );
};
