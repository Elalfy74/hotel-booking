'use client';

import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { EntityCard } from '@/app/(client)/_components/entity-card';
import { useSwiperNavigation } from '@/hooks/use-swiper-navigation';

import { SectionHeadingWithController } from '../../section-heading-with-controller';
import { type ITopTour } from './top-tours-section';

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

export const TopToursList = ({ tours }: { tours: ITopTour[] }) => {
  const { setSwiperRef, handleSwiperChange, handleCurrentStatus, status } = useSwiperNavigation();

  return (
    <>
      <SectionHeadingWithController
        title="Top Tours"
        desc="keep calm & travel on"
        handleSwiperChange={handleSwiperChange}
        status={status}
      />

      <Swiper
        className="swiper-padding"
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
            <EntityCard
              image={tour.image}
              title={tour.name}
              subTitle={`${tour._count.cities} Popular Cities`}
              badge={tour.name}
              url={`/countries/${tour.id}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
