import type { City, Country } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from '@/components/ui/card';

type ICountry = Country & {
  _count: {
    cities: number;
  };
};

type ICity = City & {
  images: {
    url: string;
  }[];
  country: string;
};

type IEntity = ICountry | ICity;

export const EntityCard = ({ entity }: { entity: IEntity }) => {
  const isCountry = '_count' in entity;

  const image = isCountry ? entity.image : entity.images[0].url;

  const badge = isCountry ? entity.name : entity.country;

  return (
    <Link href={`/countries/${entity.id}`} className="w-full">
      <Card className="overlay group relative h-full w-full overflow-hidden text-white before:z-[2]">
        <Image
          width={400}
          height={400}
          src={image}
          alt="entity img"
          className="relative aspect-square h-auto w-full object-cover duration-500 group-hover:scale-110"
        />
        <p className="absolute left-4 top-4 rounded-full bg-black bg-opacity-30 px-3 py-2 font-semibold capitalize md:left-6 md:top-6 md:px-4 md:py-3">
          {badge}
        </p>
        <div className="absolute bottom-6 left-6 z-[3]">
          <h3 className="capitalize">{entity.name}</h3>
          {isCountry && <p>{entity._count.cities} Popular Cities</p>}
        </div>
      </Card>
    </Link>
  );
};
