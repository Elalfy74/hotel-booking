import { PageHeading } from '@/app/dashboard/_components/page-heading';

import { CitiesTable } from './_components/cities-table';

export default function CitiesPage() {
  return (
    <>
      <PageHeading title="cities" singleTile="city" />
      <CitiesTable />
    </>
  );
}
