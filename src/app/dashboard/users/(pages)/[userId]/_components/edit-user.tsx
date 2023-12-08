'use client';

import { notFound } from 'next/navigation';

import { useUser } from '../_hooks/use-user';
import { EditUserForm } from './edit-user-form';
import { EditUserSkeleton } from './edit-user-skeleton';

export const EditUser = ({ userId }: { userId: string }) => {
  const { data, isLoading } = useUser(userId);
  // If there's an error, throw it to the error boundary
  if (data?.error) {
    throw new Error(data.error);
  }

  if (isLoading) {
    return <EditUserSkeleton />;
  }

  // If the user doesn't exist, return a 404 page
  if (!data || !data.data) return notFound();

  return <EditUserForm user={data.data} />;
};
