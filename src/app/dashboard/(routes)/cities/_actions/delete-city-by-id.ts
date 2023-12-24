'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteCityById = asyncAdminHandler(async (id: string): Promise<void> => {
  await prisma.city.delete({
    where: { id },
  });
});
