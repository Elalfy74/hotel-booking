'use client';

import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useSwiperNavigation } from '@/hooks/use-swiper-navigation';

import { SectionHeadingWithController } from '../../section-heading-with-controller';
import { type IHotelWCity } from './explore-the-world-section';
import { HotelItem } from './hotel-item';

const options = {
  640: {
    slidesPerView: 2,
  },
  768: {
    slidesPerView: 3,
    spaceBetween: 30,
  },
  1536: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
};

export const HotelsList = ({ hotels }: { hotels: IHotelWCity[] }) => {
  const { setSwiperRef, handleCurrentStatus, handleSwiperChange, status } = useSwiperNavigation();

  return (
    <>
      <SectionHeadingWithController
        title="Explore The World"
        desc="1000 beautiful places to go"
        handleSwiperChange={handleSwiperChange}
        status={status}
      />
      <Swiper
        className="swiper-padding"
        slidesPerView={1.5}
        freeMode={true}
        modules={[FreeMode]}
        spaceBetween={20}
        breakpoints={options}
        onBeforeInit={(swiper) => {
          setSwiperRef(swiper);
        }}
        onSlideChange={({ isBeginning, isEnd }) => handleCurrentStatus({ isBeginning, isEnd })}
      >
        {hotels.map((hotel, i) => (
          <SwiperSlide key={hotel.id}>
            <HotelItem hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
