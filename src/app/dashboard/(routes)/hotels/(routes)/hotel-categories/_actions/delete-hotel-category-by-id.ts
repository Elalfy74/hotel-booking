'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteHotelCategoryById = asyncAdminHandler(async (id: string): Promise<void> => {
  await prisma.hotelCategory.delete({
    where: { id },
  });
});
