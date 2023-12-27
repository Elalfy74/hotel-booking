import prisma from '@/lib/prisma';

import { LazyExploreTheWorld } from './lazy-explore-the-world';

const getHotels = async () => {
  const hotels = await prisma.hotel.findMany({
    include: {
      city: true,
      images: {
        take: 1,
      },
      rooms: {
        select: {
          price: true,
        },
      },
    },
    orderBy: {
      id: 'desc',
    },
    take: 6,
  });

  return hotels.map((hotel) => ({
    ...hotel,
    cheapestPrice: Math.min(...hotel.rooms.map((room) => room.price)),
  }));
};
export type IHotelWCity = AwaitedReturn<typeof getHotels>[number];

export const ExploreTheWorldSection = async () => {
  const hotels = await getHotels();

  return <LazyExploreTheWorld hotels={hotels} />;
};
