'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteManyHotels = asyncAdminHandler(async (ids: string[]): Promise<void> => {
  await prisma.hotel.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});
