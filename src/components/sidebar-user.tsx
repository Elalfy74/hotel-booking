'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useClientSession } from '@/store/use-client-session';

import { CustomAvatar } from './custom-avatar';
import { Button } from './ui/button';

export const SidebarUser = () => {
  const { data } = useClientSession((state) => state.session);

  const handleLogout = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center space-x-2">
        <CustomAvatar src={data?.user?.image} className="cursor-pointer">
          {data?.user?.name?.[0] || 'A'}
        </CustomAvatar>

        <span className="text-sm font-medium">{data?.user?.name}</span>
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

          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
