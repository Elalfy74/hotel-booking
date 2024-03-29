import Image from 'next/image';
import Link from 'next/link';

import { Stars } from '@/components/stars';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { type ITrendingHotel } from './trending-hotels-section';

export const TrendingHotelsItem = ({ hotel }: { hotel: ITrendingHotel }) => {
  return (
    <Card className="flex max-w-full gap-4 p-4 shadow-sm md:gap-10 md:p-6">
      <Link href={`/hotels/${hotel.id}`}>
        <Image
          src={hotel.images[0].url}
          alt="hotel"
          className="h-full w-auto max-w-[160px] rounded-xl object-cover md:max-w-full"
          width={512}
          height={410}
        />
      </Link>
      <div className="flex-grow-1 flex w-full flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-2 sm:gap-4 md:mt-6 lg:mt-0 lg:gap-2">
          <Link href={`/hotels/${hotel.id}`}>
            <h4 className="overflow-hidden truncate text-sm font-semibold capitalize sm:text-base ">
              {hotel.name}
            </h4>
          </Link>
          <Stars stars={hotel.stars} />
          <div>
            <span className="font-semibold md:text-xl">${hotel.cheapestPrice.toFixed(2)}</span>
            <span>/night</span>
          </div>
        </div>
        <Button size="sm" className="w-full text-center sm:w-3/5" asChild>
          <Link href={`/hotels/${hotel.id}`} className="mt-2 w-full ">
            Book now
          </Link>
        </Button>
      </div>
    </Card>
  );
};
