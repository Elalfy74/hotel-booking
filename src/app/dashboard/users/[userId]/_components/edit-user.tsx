import { notFound } from 'next/navigation';

import { Skeleton } from '@/components/ui/skeleton';

import { useUser } from '../_hooks/use-user';
import { EditUserForm } from './edit-user-form';

export const EditUser = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useUser(userId);

  if (isLoading) {
    return (
      <div className="mt-8 max-w-4xl space-y-6">
        <Skeleton className="h-44 w-44 rounded-full" />

        <div className="grid grid-cols-2 gap-x-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>
        <Skeleton className="h-10 flex-1" />
        <div className="grid grid-cols-2 gap-x-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>

        <div className="flex justify-end space-x-4 pt-10">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (!data || !data.data) return notFound();

  return <EditUserForm user={data.data} />;
};
