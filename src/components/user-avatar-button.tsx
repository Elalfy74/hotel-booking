'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { CustomAvatar } from './custom-avatar';

interface UserAvatarButtonProps {
  avatar?: string | null;
  fallBack: string;
  isAdmin: boolean;
}

export const UserAvatarButton = ({ avatar, fallBack, isAdmin }: UserAvatarButtonProps) => {
  const handleLogout = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <CustomAvatar src={avatar}>{fallBack}</CustomAvatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/dashboard">Admin Mode</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>

        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
