import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { CreateCityForm } from './_components/create-city-form';

export default function CreateNewCity() {
  return (
    <>
      <SingleItemHeading title="cities" singleTile="City" action="create" />
      <CreateCityForm />
    </>
  );
}
