import Image from 'next/image';
import Link from 'next/link';

import { Stars } from '@/components/stars';
import { Button } from '@/components/ui/button';

import { PricePerNight } from '../../[hotelId]/_components/price-per-night';
import { IHotel } from '../_hooks/get-hotels';

export const SingleHotel = ({ hotel }: { hotel: IHotel }) => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border shadow-sm md:h-[400px] md:flex-row">
      <div className="w-full lg:w-2/5">
        <Link href={`/hotels/${hotel.id}`}>
          <Image
            width={800}
            height={800}
            alt="hotel"
            src={hotel.images[0].url}
            className="h-full w-full object-cover"
          />
        </Link>
      </div>

      <div className="flex w-full flex-col justify-between p-6 lg:w-3/5">
        <div>
          <h2 className="mb-3 text-2xl font-semibold capitalize">
            <Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
          </h2>

          <Stars stars={hotel.stars} />

          <div className="text-thirdBlack my-6 flex flex-col flex-wrap gap-x-6 gap-y-4 font-medium">
            <p className="italic text-gray-600">{hotel.address}</p>
            <p className="text-gray-800 dark:text-gray-300">
              {hotel.distanceToDTInKm}km to DownTown
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between md:flex-row md:items-end">
          <div className="text-gray-500">
            {hotel.features.map((feature) => (
              <p key={feature.id}>{feature.feature.name}</p>
            ))}
          </div>
          <div className="flex flex-col md:items-center">
            <PricePerNight price={hotel.cheapestPrice} />
            <Button className="mt-2 h-fit w-fit rounded-full px-9 py-3 text-base" asChild>
              <Link href={`/hotels/${hotel.id}`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
