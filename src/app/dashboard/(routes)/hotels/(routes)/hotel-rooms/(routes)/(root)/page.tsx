import { PageHeading } from '@/app/dashboard/_components/page-heading';

import { HotelRoomsTable } from './_components/hotel-rooms-table';
import { HotelSelectDialog } from './_components/hotel-select-dialog';

export default function HotelRoomsPage() {
  return (
    <>
      <PageHeading title="hotel rooms" singleTile="hotel room" CreateButton={HotelSelectDialog} />
      <HotelRoomsTable />
    </>
  );
}
