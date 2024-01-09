'use server';

import { type HotelCategory, type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelCategories = asyncAdminHandler(
  async (args: Prisma.HotelCategoryFindManyArgs): Promise<HotelCategory[]> => {
    return prisma.hotelCategory.findMany({
      skip: args.skip || 0,
      take: args.take || 10,
      where: args.where,
    });
  },
);
export type GetHotelCategoriesReturnType = AwaitedReturn<typeof getHotelCategories>;
