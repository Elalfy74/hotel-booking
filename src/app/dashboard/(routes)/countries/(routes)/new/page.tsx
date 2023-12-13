import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { CreateCountryForm } from './_components/create-country-form';

export default function CreateNewCountry() {
  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold">Create Country</h1>
      <Link className="text-blue-500" href="/dashboard/countries">
        <ArrowLeftIcon className="mr-1 inline-block h-4 w-4" />
        Back to Countries
      </Link>
      <CreateCountryForm />
    </>
  );
}
