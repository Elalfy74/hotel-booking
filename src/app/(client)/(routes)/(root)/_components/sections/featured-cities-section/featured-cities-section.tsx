import prisma from '@/lib/prisma';

import { SectionHeading } from '../../section-heading';
import { FeaturedCitiesSwiper } from './featured-cities-swiper';

const getCities = async () => {
  return prisma.city.findMany({
    take: 6,
    include: {
      country: true,
      images: {
        take: 1,
      },
    },
  });
};
export type IFeaturedCity = AwaitedReturn<typeof getCities>[number];

export const FeaturedCitiesSection = async () => {
  const cities = await getCities();

  return (
    <div className="section-swiper pt-0">
      <SectionHeading
        center
        container
        title="Search a best place in the world"
        desc={
          <>
            Where you&apos;re looking for places for a vacation. we are here to Guide you
            <br />
            about the details you need to check in and ease your tripe in advance
          </>
        }
      />
      <FeaturedCitiesSwiper cities={cities} />
    </div>
  );
};
