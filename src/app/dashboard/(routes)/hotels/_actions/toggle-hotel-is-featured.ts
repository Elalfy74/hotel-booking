'use server';

import { asyncAdminHandler } from '@/actions/utils';
import prisma from '@/lib/prisma';

export const toggleHotelIsFeatured = asyncAdminHandler(async (id: string) => {
  // Check if the Hotel exists
  const hotel = await prisma.hotel.findUnique({ where: { id } });
  if (!hotel) throw new Error('Hotel not found');

  // Update the Hotel
  return prisma.hotel.update({
    where: { id },
    data: { isFeatured: !hotel.isFeatured },
  });
});
