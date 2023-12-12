'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getCountriesCount = asyncAdminHandler(
  async (args: Prisma.CountryFindManyArgs): Promise<number> => {
    return prisma.country.count({
      where: args.where,
    });
  },
);
export type GetCountriesCountReturnType = AwaitedReturn<typeof getCountriesCount>;
