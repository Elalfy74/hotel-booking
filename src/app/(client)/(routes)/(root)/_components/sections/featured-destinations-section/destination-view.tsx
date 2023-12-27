'use client';

import { m } from 'framer-motion';

import { useMobileDetector } from '@/hooks/use-mobile-detector';
import { cn } from '@/lib/utils';

import { DestinationSwiper } from './destination-swiper';
import { type IFeaturedDestination } from './featured-destinations-section';
import { useSelectDestination } from './use-select-destination';

export const DestinationView = ({ destination }: { destination: IFeaturedDestination }) => {
  const isMobile = useMobileDetector();
  const { selectedDestination, setSelectedDestination } = useSelectDestination();

  let destinationSwiperProps =
    selectedDestination === destination.id
      ? destination
      : { ...destination, images: [destination.images[0]] };

  let handleSelect = setSelectedDestination;

  // Switch to normal Swiper on mobile
  if (isMobile) {
    destinationSwiperProps = destination;
    handleSelect = () => {};
  }

  return (
    <m.div
      layout
      className={cn(selectedDestination === destination.id ? 'opened-card' : 'layout-card')}
      onClick={() => handleSelect(destination.id)}
    >
      <DestinationSwiper destination={destinationSwiperProps} />
    </m.div>
  );
};
