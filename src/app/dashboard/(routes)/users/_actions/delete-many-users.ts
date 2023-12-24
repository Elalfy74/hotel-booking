'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteManyUsers = asyncAdminHandler(async (ids: string[]): Promise<void> => {
  await prisma.user.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});
