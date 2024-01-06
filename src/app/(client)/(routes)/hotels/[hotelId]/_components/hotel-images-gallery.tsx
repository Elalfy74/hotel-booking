'use client';

import { type HotelImage } from '@prisma/client';
import Image from 'next/image';
import { Grid, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useMobileDetector } from '@/hooks/use-mobile-detector';

export const HotelImagesGallery = ({ images }: { images: HotelImage[] }) => {
  const isMobile = useMobileDetector();

  let data = images.slice(0, 4);

  if (isMobile) {
    data = images.slice(0, 4);
  }

  return (
    <div className="h-[400px] md:h-[600px]">
      <Swiper
        className="gallery-swiper"
        slidesPerView={1}
        spaceBetween={10}
        grid={{
          rows: 1,
        }}
        pagination={true}
        breakpoints={{
          768: {
            slidesPerView: 2,
            grid: {
              rows: 3,
              fill: 'column',
            },
          },
        }}
        modules={[Grid, Pagination]}
      >
        {data.map((img) => (
          <SwiperSlide className="gallery-slide" key={img.id}>
            <Image width={1200} height={1000} alt="hotel-details" src={img.url} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
