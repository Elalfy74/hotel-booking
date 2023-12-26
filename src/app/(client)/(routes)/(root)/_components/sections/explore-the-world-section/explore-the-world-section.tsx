import prisma from '@/lib/prisma';

import { HotelsList } from './hotels-list';

const getHotels = async () => {
  const hotels = await prisma.hotel.findMany({
    include: {
      city: true,
      images: true,
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

  return (
    <section className="section-swiper">
      <HotelsList hotels={hotels} />
    </section>
  );
};
