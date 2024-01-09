import { PageHeading } from '@/app/dashboard/_components/page-heading';

import { HotelsTable } from './_components/hotels-table';

export default function HotelsPage() {
  return (
    <>
      <PageHeading title="hotels" singleTile="hotel" />
      <HotelsTable />
    </>
  );
}
