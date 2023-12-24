'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteUserById = asyncAdminHandler(async (id: string): Promise<void> => {
  await prisma.user.delete({
    where: { id },
  });
});
