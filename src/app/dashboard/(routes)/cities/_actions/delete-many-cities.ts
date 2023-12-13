'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteManyCities = asyncAdminHandler(async (ids: string[]): Promise<void> => {
  await prisma.city.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});
