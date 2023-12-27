'use client';

import dynamic from 'next/dynamic';

import { LazyComponent } from '@/components/lazy-component';
import { LazyLoading } from '@/components/lazy-loading';

import { type IFeaturedDestination } from '..';

const FeaturedDestinations = dynamic(
  () => import('./featured-destinations').then((mod) => mod.FeaturedDestinations),
  {
    loading: LazyLoading,
  },
);
export const LazyFeaturedDestinations = ({
  destinations,
}: {
  destinations: IFeaturedDestination[];
}) => {
  return (
    <LazyComponent>
      <FeaturedDestinations destinations={destinations} />
    </LazyComponent>
  );
};
