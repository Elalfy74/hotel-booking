'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDisclosure } from '@/hooks/use-disclosure';

interface UserAvatarButtonProps {
  avatar?: string;
  fallBack: string;
}

export const UserAvatarButton = ({ avatar, fallBack }: UserAvatarButtonProps) => {
  const [opened, { setOpened, close }] = useDisclosure();

  const handleLogout = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    await signOut({
      callbackUrl: '/',
    });
    close();
  };

  return (
    <DropdownMenu open={opened} onOpenChange={setOpened}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatar} alt="user avatar" />
          <AvatarFallback className="uppercase">{fallBack}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" asChild>
          <Link href="/dashboard">Admin Mode</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer">
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
