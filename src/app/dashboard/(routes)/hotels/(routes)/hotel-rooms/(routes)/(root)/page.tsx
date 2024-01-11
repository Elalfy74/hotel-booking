import { PageHeading } from '@/app/dashboard/_components/page-heading';

import { HotelRoomsTable } from './_components/hotel-rooms-table';

export default function HotelRoomsPage() {
  return (
    <>
      <PageHeading title="hotel rooms" singleTile="hotel room" />
      <HotelRoomsTable />
    </>
  );
}
