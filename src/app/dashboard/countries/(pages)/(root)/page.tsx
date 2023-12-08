import { Heading } from '@/app/dashboard/_components/heading';

import { CountriesTable } from './_components/countries-table';

export default function CountriesPage() {
  return (
    <>
      <Heading title="countries" singleTile="country" />
      <CountriesTable />
    </>
  );
}
