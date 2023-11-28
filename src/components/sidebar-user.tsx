'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDisclosure } from '@/hooks/use-disclosure';

import { Button } from './ui/button';

export const SidebarUser = () => {
  const { data } = useSession();
  const [opened, { setOpened, close }] = useDisclosure();

  const handleLogout = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    await signOut({
      callbackUrl: '/',
    });
    close();
  };

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center space-x-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src={data?.user?.image || ''} asChild>
            <Image src={data?.user?.image || ''} width={200} height={200} alt="user image" />
          </AvatarImage>
          <AvatarFallback className="uppercase">{data?.user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">{data?.user?.name}</span>
      </div>
      <DropdownMenu open={opened} onOpenChange={setOpened}>
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
