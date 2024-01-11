'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelCategoriesCount = asyncAdminHandler(
  async (args: Prisma.HotelCategoryFindManyArgs): Promise<number> => {
    return prisma.hotelCategory.count({
      where: args.where,
    });
  },
);
