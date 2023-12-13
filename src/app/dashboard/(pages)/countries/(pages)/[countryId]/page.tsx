import { type Country } from '@prisma/client';

import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { EditCountry } from './_components/edit-country';

interface SingleCountryPageProps {
  params: { countryId: string };
  searchParams: { country?: string };
}

export const dynamic = 'force-static';

export default function SingleCountryPage({
  params: { countryId },
  searchParams,
}: SingleCountryPageProps) {
  let country;

  if (searchParams.country) {
    country = JSON.parse(searchParams.country) as Country;
  }

  return (
    <>
      <SingleItemHeading title="countries" singleTile="Country" action="edit" />
      <EditCountry countryId={countryId} initialData={country} />
    </>
  );
}
