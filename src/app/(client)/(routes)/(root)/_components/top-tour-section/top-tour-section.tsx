import prisma from '@/lib/prisma';

import { TopTour } from './top-tour';

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

export const TopTourSection = async () => {
  const topTours = await getTopTours();

  return (
    <section className="section">
      <TopTour tours={topTours} />
    </section>
  );
};
