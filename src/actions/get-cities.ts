'use server';

import prisma from '@/lib/prisma';

export const getCities = async (query?: string) => {
  return prisma.city.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    include: {
      country: true,
    },
    take: 6,
  });
};
export type ICityWithCountry = AwaitedReturn<typeof getCities>[number];
