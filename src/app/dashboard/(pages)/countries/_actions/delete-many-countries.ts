'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteManyCountries = asyncAdminHandler(async (ids: string[]): Promise<void> => {
  await prisma.country.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
});
