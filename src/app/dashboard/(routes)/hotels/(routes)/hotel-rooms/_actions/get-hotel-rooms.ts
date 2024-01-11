'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelRooms = asyncAdminHandler(async (args: Prisma.HotelRoomFindManyArgs) => {
  return prisma.hotelRoom.findMany({
    skip: args.skip || 0,
    take: args.take || 10,
    where: args.where,
    include: {
      hotel: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
});
export type IHotelRoom = NonNullable<AwaitedReturn<typeof getHotelRooms>['data']>[number];
