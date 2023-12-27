'use client';

import { FreeMode, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { type IFeaturedCity } from './featured-cities-section';
import { FeaturedCitiesSwiperItem } from './featured-cities-swiper-item';

export const FeaturedCitiesSwiper = ({ cities }: { cities: IFeaturedCity[] }) => {
  return (
    <Swiper
      className="swiper-padding md:h-[400px]"
      slidesPerView={1.5}
      grid={{
        rows: 1,
      }}
      spaceBetween={10}
      freeMode={true}
      breakpoints={{
        768: {
          slidesPerView: 2.5,
          spaceBetween: 30,
          grid: {
            rows: 2,
          },
        },
        1024: {
          slidesPerView: 3,
          grid: {
            rows: 2,
          },
        },
      }}
      modules={[Grid, FreeMode]}
    >
      {cities.map((city) => (
        <SwiperSlide key={city.id}>
          <FeaturedCitiesSwiperItem city={city} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
