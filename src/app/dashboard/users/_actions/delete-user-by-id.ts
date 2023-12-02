'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteUserById = asyncAdminHandler(async (id: string) => {
  return prisma.user.delete({
    where: {
      id,
    },
  });
});
