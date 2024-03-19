'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotels = asyncAdminHandler(
  async (args: Prisma.HotelFindManyArgs & { slim?: boolean }) => {
    const slim = args.slim ?? false;

    return prisma.hotel.findMany({
      skip: args.skip || 0,
      take: args.take || 10,
      where: args.where,
      include: {
        category: true,
        images: {
          select: {
            url: true,
          },
          take: 1,
        },
        city: true,
        _count: {
          select: {
            rooms: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
);
export type IHotel = NonNullable<AwaitedReturn<typeof getHotels>['data']>[number];
