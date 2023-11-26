'use client';

import 'swiper/css';
import 'swiper/css/grid';

import Image from 'next/image';
import Link from 'next/link';
import { FreeMode, Grid } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

const cities = [
  {
    id: '1',
    name: 'New York',
    slug: 'new-york',
    country: {
      name: 'United States',
      slug: 'united-states',
    },
    photos: [
      'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '2',
    name: 'London',
    slug: 'london',
    country: {
      name: 'United Kingdom',
      slug: 'united-kingdom',
    },
    photos: [
      'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '3',
    name: 'Paris',
    slug: 'paris',
    country: {
      name: 'France',
      slug: 'france',
    },
    photos: [
      'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '4',
    name: 'Berlin',
    slug: 'berlin',
    country: {
      name: 'Germany',
      slug: 'germany',
    },
    photos: [
      'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '5',
    name: 'Berlin',
    slug: 'berlin',
    country: {
      name: 'Germany',
      slug: 'germany',
    },
    photos: [
      'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
  {
    id: '6',
    name: 'Berlin',
    slug: 'berlin',
    country: {
      name: 'Germany',
      slug: 'germany',
    },
    photos: [
      'https://images.unsplash.com/photo-1538991383142-36c4edeaffde?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
  },
];

type City = (typeof cities)[number];

export const FeaturedCities = () => {
  return (
    <>
      <div className="container text-center">
        <h2 className="mb-5 text-3xl font-semibold md:text-4xl">
          Search a best place in the world
        </h2>
        <p className="text-sm text-gray-400">
          Where you&apos;re looking for places for a vacation. we are here to Guide you
          <br />
          about the details you need to check in and ease your tripe in advance
        </p>
      </div>
      <div className="md:container">
        <Swiper
          className="mt-10 !px-4 md:h-[400px] md:!px-0"
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
              <SingleFeaturedCity city={city} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

const SingleFeaturedCity = ({ city }: { city: City }) => {
  return (
    <Link
      className="w-full"
      href={`/hotels?country=${city.country.slug}&city=${city.slug}&cityid=${city.id}`}
    >
      <Card className="bg-transparent shadow-none transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
        <CardHeader>
          <Image
            width={120}
            height={120}
            src={city.photos[0]}
            alt="city img"
            placeholder="blur"
            blurDataURL="https://via.placeholder.com/80?text"
            className="h-20 w-20 rounded-xl object-cover"
          />
          <CardTitle className="text-sm">
            {city.name}, {city.country.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
