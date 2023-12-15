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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <CustomAvatar src={avatar} fallback={fallBack} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isAdmin && (
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href="/dashboard">Admin Mode</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            signOut({
              callbackUrl: '/',
            });
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
