import { type City } from '@prisma/client';

import { EntityCard } from '@/app/(client)/_components/entity-card';

type ICity = City & {
  images: {
    url: string;
  }[];
  country: string;
};

export const CitiesList = ({ cities }: { cities: ICity[] }) => {
  return (
    <ul className="section grid grid-cols-3-auto gap-20">
      {cities.map((city) => (
        <EntityCard key={city.id} entity={city} />
      ))}
    </ul>
  );
};
