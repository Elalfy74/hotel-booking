'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const deleteHotelById = asyncAdminHandler(async (id: string): Promise<void> => {
  await prisma.hotel.delete({
    where: { id },
  });
});
