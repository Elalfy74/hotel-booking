import prisma from '@/lib/prisma';

import { TopToursList } from './top-tours-list';

const getTopTours = async () => {
  return prisma.country.findMany({
    where: {
      isFeatured: true,
    },
    take: 6,

    include: {
      _count: true,
    },
  });
};
export type ITopTour = AwaitedReturn<typeof getTopTours>[number];

export const TopToursSection = async () => {
  const topTours = await getTopTours();

  return (
    <section className="section-swiper">
      <TopToursList tours={topTours} />
    </section>
  );
};
