import { BuildingIcon, MapPinIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

import { type IHotelWCity } from './explore-the-world-section';

export const HotelItem = ({ hotel }: { hotel: IHotelWCity }) => {
  return (
    <Card className="h-[350px] max-h-full w-full border p-3 shadow-sm ">
      <Link href={`/hotels/${hotel.id}`}>
        <Image
          width={300}
          height={190}
          src={hotel.images[0].url}
          alt="hotel photo"
          className="h-1/2 w-full rounded-xl object-cover"
        />
      </Link>
      <div className="mt-4">
        <div className="mb-2 flex gap-2">
          <StarIcon className="h-5 w-5 fill-current text-orange-400" />
          <span>{hotel.stars}</span>
        </div>
        <div className="mb-2 flex items-center justify-between overflow-hidden">
          <h4 className="mt-0 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold capitalize sm:text-base lg:text-lg">
            <Link href={`/hotels/${hotel.id}`}>{hotel.name}</Link>
          </h4>
          <span className="ml-3 rounded-md bg-primary/25 px-2 py-1 text-sm font-semibold text-primary">
            ${hotel.cheapestPrice}
          </span>
        </div>
        <div className="text-sm text-gray-600 dark:text-slate-600">
          <p className="ml-1">{hotel.distanceToDTInKm} km to Town Center</p>
          <p className="mt-1 flex items-center gap-2 capitalize">
            <MapPinIcon className="h-5 w-5" />
            {hotel.city.name}
          </p>
          <p className="mt-1 flex items-center gap-2">
            <BuildingIcon className="h-5 w-5" /> Rooms Categories: {hotel.rooms.length}
          </p>
        </div>
      </div>
    </Card>
  );
};
