'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelCategories = asyncAdminHandler(
  async (args: Prisma.HotelCategoryFindManyArgs & { withHotelsCount?: boolean }) => {
    const withHotelsCount = args.withHotelsCount ?? false;

    return prisma.hotelCategory.findMany({
      skip: args.skip || 0,
      take: args.take || 10,
      where: args.where,
      include: {
        _count: withHotelsCount ? { select: { hotels: true } } : undefined,
      },
    });
  },
);
export type IHotelCategory = NonNullable<AwaitedReturn<typeof getHotelCategories>['data']>[number];
