import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { CreateHotelForm } from './_components/create-hotel-form';

export default function CreateNewHotel() {
  return (
    <>
      <SingleItemHeading title="hotels" singleTile="Hotel" action="create" />
      <CreateHotelForm />
    </>
  );
}
