'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelById = asyncAdminHandler(async (id: string) => {
  return prisma.hotel.findUnique({
    where: { id },
    include: {
      city: true,
      images: true,
    },
  });
});
export type ISingleHotel = NonNullable<AwaitedReturn<typeof getHotelById>['data']> | null;
