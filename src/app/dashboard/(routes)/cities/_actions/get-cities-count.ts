'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getCitiesCount = asyncAdminHandler(
  async (args: Prisma.CityFindManyArgs): Promise<number> => {
    return prisma.city.count({
      where: args.where,
    });
  },
);
export type GetCitiesCountReturnType = AwaitedReturn<typeof getCitiesCount>;
