'use server';

import prisma from '@/lib/prisma';

export async function getHotels() {
  const hotels = await prisma.hotel.findMany({
    include: {
      images: {
        select: {
          url: true,
        },
        take: 1,
      },
      features: {
        take: 5,
        include: {
          feature: true,
        },
      },
      rooms: true,
    },
    take: 10,
  });

  return hotels.map((hotel) => ({
    ...hotel,
    cheapestPrice: Math.min(...hotel.rooms.map((room) => room.price)),
  }));
}
export type IHotel = AwaitedReturn<typeof getHotels>[number];
