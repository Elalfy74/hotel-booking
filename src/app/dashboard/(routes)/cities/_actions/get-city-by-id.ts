'use server';

import { type City } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getCityById = asyncAdminHandler((id: string): Promise<City | null> => {
  return prisma.city.findUnique({
    where: { id },
  });
});
