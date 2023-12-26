import prisma from '@/lib/prisma';

import { TrendingHotelsList } from './trending-hotels-list';

const getTrendingHotels = async () => {
  const hotels = await prisma.hotel.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: {
        take: 1,
      },
      rooms: {
        select: {
          price: true,
        },
      },
    },
    take: 6,
  });

  return hotels.map((hotel) => ({
    ...hotel,
    cheapestPrice: Math.min(...hotel.rooms.map((room) => room.price)),
  }));
};
export type ITrendingHotel = AwaitedReturn<typeof getTrendingHotels>[number];

export const TrendingHotelsSection = async () => {
  const hotels = await getTrendingHotels();

  return (
    <section className="section">
      <TrendingHotelsList hotels={hotels} />
    </section>
  );
};
