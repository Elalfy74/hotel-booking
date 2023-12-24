import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { CreateCountryForm } from './_components/create-country-form';

export default function CreateNewCountry() {
  return (
    <>
      <SingleItemHeading title="countries" singleTile="Country" action="create" />
      <CreateCountryForm />
    </>
  );
}
