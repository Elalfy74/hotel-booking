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

interface Props {
  params: {
    id: string;
  };
}
export default async function SingleCountryPage({ params: { id } }: Props) {
  const countryWithCities = await getCountryCities(id);

  if (!countryWithCities) {
    return notFound();
  }

  const cities = countryWithCities.cities.map((city) => ({
    ...city,
    country: countryWithCities.name,
  }));

  return (
    <div>
      <Banner
        text={`All our destinations in \n${countryWithCities.name}`}
        image={countryWithCities.image}
      />

      <CitiesList cities={cities} />
    </div>
  );
}
