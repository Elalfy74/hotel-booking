'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteUserById = asyncAdminHandler(async (id: string): Promise<void> => {
  const user = await prisma.user.delete({
    where: { id },
  });

  if (!user) throw new Error('User not found');
});
