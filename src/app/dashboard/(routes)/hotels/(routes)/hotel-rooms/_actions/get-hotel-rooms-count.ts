'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelRoomsCount = asyncAdminHandler(
  async (args: Prisma.HotelRoomFindManyArgs): Promise<number> => {
    return prisma.hotelRoom.count({
      where: args.where,
    });
  },
);
