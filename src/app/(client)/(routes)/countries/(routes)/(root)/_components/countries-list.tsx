import { EntityCard } from '@/app/(client)/_components/entity-card';

import { type ICountry } from '../page';

export const CountriesList = ({ countries }: { countries: ICountry[] }) => {
  return (
    <ul className="section grid grid-cols-3-auto gap-20">
      {countries.map((country) => (
        <EntityCard key={country.id} entity={country} />
      ))}
    </ul>
  );
};
