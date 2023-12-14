'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';
import { serialize } from '@/lib/utils';

import { CityDto } from './city.dto';

export const getCityById = asyncAdminHandler(async (id: string): Promise<CityDto | null> => {
  const city = await prisma.city.findUnique({
    where: { id },
    include: {
      country: true,
      images: true,
    },
  });

  if (!city) return city; //null

  return serialize(CityDto, city);
});
