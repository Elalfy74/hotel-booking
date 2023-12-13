'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const toggleCityIsFeatured = asyncAdminHandler(async (id: string) => {
  // Check if the City exists
  const city = await prisma.city.findUnique({ where: { id } });
  if (!city) throw new Error('City not found');

  // Update the City
  return prisma.city.update({
    where: { id },
    data: { isFeatured: !city.isFeatured },
  });
});
