'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const toggleCountryIsFeatured = asyncAdminHandler(async (id: string) => {
  // Check if the country exists
  const country = await prisma.country.findUnique({ where: { id } });
  if (!country) throw new Error('Country not found');

  // Update the country
  return prisma.country.update({
    where: { id },
    data: { isFeatured: !country.isFeatured },
  });
});
