import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

import { type ITopTour } from './top-tours-section';

export const TopTourItem = ({ tour }: { tour: ITopTour }) => {
  return (
    <Link href={`/countries/${tour.id}`} className="w-full">
      <Card className="overlay group relative h-full w-full overflow-hidden text-white before:z-[2]">
        <Image
          width={400}
          height={400}
          src={tour.image}
          alt="entity img"
          className="relative aspect-square h-auto w-full object-cover duration-500 group-hover:scale-110"
        />
        <p className="absolute left-4 top-4 rounded-full bg-black bg-opacity-30 px-3 py-2 font-semibold capitalize md:left-6 md:top-6 md:px-4 md:py-3">
          {tour.name}
        </p>
        <div className="absolute bottom-6 left-6 z-[3]">
          <h3 className="capitalize">{tour.name}</h3>
          <p>{tour._count.cities} Popular Cities</p>
        </div>
      </Card>
    </Link>
  );
};
