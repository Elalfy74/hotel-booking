import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { EditCountry } from './_components/edit-country';

interface SingleCountryPageProps {
  params: { countryId: string };
}

export const dynamic = 'force-static';

export default function SingleCountryPage({ params: { countryId } }: SingleCountryPageProps) {
  return (
    <>
      <SingleItemHeading title="countries" singleTile="Country" />
      <EditCountry countryId={countryId} />
    </>
  );
}
