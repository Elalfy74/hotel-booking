import { type ClassValue, clsx } from 'clsx';
import { usePagination } from 'react-use-pagination';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type GetPaginationReturnType = ReturnType<typeof usePagination>;
