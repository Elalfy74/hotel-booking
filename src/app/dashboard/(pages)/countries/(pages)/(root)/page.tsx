import { PageHeading } from '@/app/dashboard/_components/page-heading';

import { CountriesTable } from './_components/countries-table';

export default function CountriesPage() {
  return (
    <>
      <PageHeading title="countries" singleTile="country" />
      <CountriesTable />
    </>
  );
}
