import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { EditCity } from './_components/edit-city';

interface SingleCityPageProps {
  params: { cityId: string };
}

export const dynamic = 'force-static';

export default function SingleCountryPage({ params: { cityId } }: SingleCityPageProps) {
  return (
    <>
      <SingleItemHeading title="cities" singleTile="City" action="edit" />
      <EditCity cityId={cityId} />
    </>
  );
}
