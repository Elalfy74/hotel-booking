'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { CustomAvatar } from '@/components/custom-avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useClientSession } from '@/store/use-client-session';

export const SidebarUser = () => {
  const { data, isLoading } = useClientSession((state) => state.session);

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center space-x-2">
        <CustomAvatar
          src={data?.user?.image}
          className="cursor-pointer"
          fallback={data?.user?.name?.[0]}
        />

        {isLoading && <Skeleton className="h-4 w-20" />}
        {!isLoading && <span className="text-sm font-medium">{data?.user?.name}</span>}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/">User Mode</Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <span>Profile</span>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() =>
              signOut({
                callbackUrl: '/',
              })
            }
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
