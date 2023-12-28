import { EntityCard } from '@/app/(client)/_components/entity-card';

import { type ICityOfCountry } from '../page';

interface CitiesListProps {
  cities: ICityOfCountry[];
  countryName: string;
}

export const CitiesList = ({ cities, countryName }: CitiesListProps) => {
  return (
    <ul className="section grid grid-cols-3-auto gap-20">
      {cities.map((city) => (
        <EntityCard
          key={city.id}
          title={city.name}
          badge={countryName}
          image={city.images[0].url}
          url={`/countries/${city.countryId}/cities/${city.id}`}
        />
      ))}
    </ul>
  );
};
