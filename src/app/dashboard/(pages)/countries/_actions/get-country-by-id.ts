'use server';

import { type Country } from '@prisma/client';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const getCountryById = asyncAdminHandler((id: string): Promise<Country | null> => {
  return prisma.country.findUnique({
    where: { id },
  });
});
