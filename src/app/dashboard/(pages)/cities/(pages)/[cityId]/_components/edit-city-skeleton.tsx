import { Skeleton } from '@/components/ui/skeleton';

export const EditCitySkeleton = () => {
  return (
    <div className="mt-8 max-w-4xl space-y-6">
      <Skeleton className="h-80 w-full rounded-lg" />

      <Skeleton className="h-10 flex-1" />

      <div className="grid grid-cols-2 gap-x-6">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 flex-1" />
      </div>

      <Skeleton className="h-10 w-28" />

      <div className="flex justify-end space-x-4 pt-10">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};
