'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

import { type IUser } from './user.type';

export const getUserById = asyncAdminHandler(async (id: string): Promise<IUser | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      role: true,
      accounts: {
        select: {
          provider: true,
        },
      },
    },
  });
});
