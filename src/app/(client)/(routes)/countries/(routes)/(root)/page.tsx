import { Banner } from '@/app/(client)/_components/banner';
import prisma from '@/lib/prisma';

import { CountriesList } from './_components/countries-list';

const getCountries = async () => {
  return prisma.country.findMany({
    include: {
      _count: true,
    },
  });
};
export type ICountry = AwaitedReturn<typeof getCountries>[number];

export default async function CountriesPage() {
  const countries = await getCountries();

  return (
    <div className="overflow-hidden">
      <Banner text="All our destinations in the world" image={'/world.jpeg'} />

      <CountriesList countries={countries} />
    </div>
  );
}
