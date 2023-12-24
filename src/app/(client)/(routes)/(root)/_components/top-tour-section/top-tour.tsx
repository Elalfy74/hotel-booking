'use client';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import NavigationController from '@/app/(client)/_components/navigation-controller';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/hooks/use-navigation';

import { SectionHeading } from '../../section-heading';
import { SingleTopTour } from './single-top-tour';
import { ITopTour } from './top-tour-section';

const options = {
  640: {
    slidesPerView: 1.75,
  },
  768: {
    slidesPerView: 2,
  },
  1024: {
    slidesPerView: 2.25,
  },
  1280: {
    slidesPerView: 2.5,
  },
  1536: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
};

export const TopTour = ({ tours }: { tours: ITopTour[] }) => {
  const { setSwiperRef, handleSwiperChange, handleCurrentStatus, status } = useNavigation();

  return (
    <>
      <div className="flex items-center justify-between px-4 sm:px-0">
        <SectionHeading title="Top Tours" desc="keep calm & travel on" />
        <div className="flex flex-col">
          <Button asChild variant="link" className="p-0">
            <Link href={'/countries'}>
              See All <ChevronRightIcon width={15} />
            </Link>
          </Button>

          <div className="hidden md:flex">
            <NavigationController handleSwiperChange={handleSwiperChange} status={status} />
          </div>
        </div>
      </div>
      <Swiper
        className="swiper-padding text-white"
        slidesPerView={1.5}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        onBeforeInit={(swiper) => {
          setSwiperRef(swiper);
        }}
        onSlideChange={({ isBeginning, isEnd }) => handleCurrentStatus({ isBeginning, isEnd })}
        breakpoints={options}
      >
        {tours.map((tour) => (
          <SwiperSlide key={tour.id}>
            <SingleTopTour tour={tour} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
