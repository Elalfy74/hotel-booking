import { notFound } from 'next/navigation';

import { Banner } from '@/app/(client)/_components/banner';
import prisma from '@/lib/prisma';

import { CitiesList } from './_components/cities-list';

export async function generateStaticParams() {
  const countriesIds = await prisma.country.findMany({
    select: {
      id: true,
    },
  });

  return countriesIds;
}

const getCountryCities = async (countryId: string) => {
  return prisma.country.findUnique({
    where: {
      id: countryId,
    },
    include: {
      cities: {
        include: {
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
      },
    },
  });
};
export type ICityOfCountry = NonNullable<AwaitedReturn<typeof getCountryCities>>['cities'][number];

interface SingleCountryPageProps {
  params: {
    countryId: string;
  };
}
export default async function SingleCountryPage({ params: { countryId } }: SingleCountryPageProps) {
  const countryWithCities = await getCountryCities(countryId);

  if (!countryWithCities) {
    return notFound();
  }

  return (
    <div>
      <Banner
        text={`All our destinations in \n${countryWithCities.name}`}
        image={countryWithCities.image}
      />

      <CitiesList cities={countryWithCities.cities} countryName={countryWithCities.name} />
    </div>
  );
}
