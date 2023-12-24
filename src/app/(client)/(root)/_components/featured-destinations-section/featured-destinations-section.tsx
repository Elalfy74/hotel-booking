import prisma from '@/lib/prisma';

import { SectionHeading } from '../../section-heading';
import { Backdrop } from './backdrop';
import { DestinationView } from './destination-view';

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

  return (
    <section className="section">
      <SectionHeading title="Featured Destinations" desc="Popular destinations open to visitors" />
      <div className="relative grid h-auto grid-cols-1 gap-6 md:h-[600px] md:grid-cols-3 md:grid-rows-9">
        {featuredDestinations.map((destination) => (
          <DestinationView key={destination.id} destination={destination} />
        ))}
      </div>
      <Backdrop />
    </section>
  );
};
