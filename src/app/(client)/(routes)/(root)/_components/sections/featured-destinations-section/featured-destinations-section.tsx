import prisma from '@/lib/prisma';

import { LazyFeaturedDestinations } from './lazy-feature-destinations';

const getFeaturedDestinations = async () => {
  return prisma.city.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      images: true,
    },
    take: 6,
  });
};
export type IFeaturedDestination = AwaitedReturn<typeof getFeaturedDestinations>[number];

export const FeaturedDestinationsSection = async () => {
  const featuredDestinations = await getFeaturedDestinations();

  return <LazyFeaturedDestinations destinations={featuredDestinations} />;
};
