'use client';

import dynamic from 'next/dynamic';

import { LazyComponent } from '@/components/lazy-component';
import { LazyLoading } from '@/components/lazy-loading';

import { type IHotelWCity } from '..';

const ExploreTheWorld = dynamic(
  () => import('./explore-the-world').then((mod) => mod.ExploreTheWorld),
  {
    loading: LazyLoading,
  },
);

export const LazyExploreTheWorld = ({ hotels }: { hotels: IHotelWCity[] }) => {
  return (
    <LazyComponent>
      <ExploreTheWorld hotels={hotels} />
    </LazyComponent>
  );
};
