'use server';

import { type Prisma } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { serialize } from '@/lib/utils';

import { CityDto } from './city.dto';

export const getCities = asyncAdminHandler(
  async (args: Prisma.CityFindManyArgs): Promise<CityDto[]> => {
    const cities = await prisma.city.findMany({
      skip: args.skip || 0,
      take: args.take || 10,
      where: args.where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        country: true,
      },
    });

    console.log(cities);
    const res = serialize(CityDto, cities);

    return res;
  },
);
export type GetCitiesReturnType = AwaitedReturn<typeof getCities>;
