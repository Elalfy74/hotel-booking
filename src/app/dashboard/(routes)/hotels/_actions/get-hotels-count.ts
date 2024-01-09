'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelsCount = asyncAdminHandler(
  async (args: Prisma.HotelFindManyArgs): Promise<number> => {
    return prisma.hotel.count({
      where: args.where,
    });
  },
);
