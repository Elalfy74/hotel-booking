'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteCountryById = asyncAdminHandler(async (id: string): Promise<void> => {
  await prisma.country.delete({
    where: { id },
  });
});
