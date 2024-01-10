'use server';

import { type HotelFeature, type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getHotelFeatures = asyncAdminHandler(
  async (args: Prisma.HotelFeatureFindManyArgs): Promise<HotelFeature[]> => {
    return prisma.hotelFeature.findMany({
      skip: args.skip || 0,
      take: args.take || 10,
      where: args.where,
    });
  },
);
