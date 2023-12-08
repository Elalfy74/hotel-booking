'use server';

import { type Country, type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getCountries = asyncAdminHandler(
  async (args: Prisma.CountryFindManyArgs): Promise<Country[]> => {
    return prisma.country.findMany({
      skip: args.skip || 0,
      take: args.take || 10,
      where: args.where,
      orderBy: {
        createdAt: 'desc',
      },
    });
  },
);
export type GeCountriesReturnType = AwaitedReturn<typeof getCountries>;
