import Image from 'next/image';
import Link from 'next/link';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { type IFeaturedCity } from './featured-cities-section';

export const FeaturedCitiesSwiperItem = ({ city }: { city: IFeaturedCity }) => {
  return (
    <Link className="w-full" href={`/hotels?city=${city.id}`}>
      <Card className="bg-transparent shadow-none transition-all duration-300 hover:border-gray-300 hover:shadow-sm">
        <CardHeader>
          <Image
            width={120}
            height={120}
            src={city.images[0].url}
            alt="city img"
            placeholder="blur"
            blurDataURL="https://via.placeholder.com/80?text"
            className="h-20 w-20 rounded-xl object-cover"
          />
          <CardTitle className="truncate text-sm capitalize">
            {city.name}, {city.country.name}
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
