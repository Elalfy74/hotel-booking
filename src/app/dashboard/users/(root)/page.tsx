import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { getUsers, getUsersCount } from '@/actions/users-actions';
import { Button } from '@/components/ui/button';

import { UsersTable } from './_components/users-table';

const defaultFilter = {
  query: '',
  role: [],
};

const UsersPage = async () => {
  const queryClient = new QueryClient();

  const usersPromise = queryClient.prefetchQuery({
    queryKey: ['users', { currentPage: 0, pageSize: 10, filter: defaultFilter }],
    queryFn: () => getUsers({}),
  });

  const usersCountPromise = queryClient.prefetchQuery({
    queryKey: ['users count', { filter: defaultFilter }],
    queryFn: () => getUsersCount({}),
  });

  await Promise.all([usersPromise, usersCountPromise]);

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold">Users</h1>
          <p className="text-muted-foreground">View and manage your users</p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/users/new">
            <PlusCircleIcon className="mr-2 h-4 w-4" />
            Add User
          </Link>
        </Button>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UsersTable />
      </HydrationBoundary>
    </>
  );
};
export default UsersPage;
