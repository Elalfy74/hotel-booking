'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { serialize } from '@/lib/utils';

import { UserDto } from './user.dto';

export const deleteUserById = asyncAdminHandler(async (id: string): Promise<UserDto | null> => {
  const user = await prisma.user.delete({
    where: { id },
  });

  if (!user) return null;

  return serialize(UserDto, user);
});
