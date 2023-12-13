'use client';

import { Country } from '@prisma/client';
import { notFound } from 'next/navigation';

import { useCountry } from '../_hooks/use-country';
import { EditCountryForm } from './edit-country-form';
import { EditCountrySkeleton } from './edit-country-skeleton';

export const EditCountry = ({
  countryId,
  initialData,
}: {
  countryId: string;
  initialData?: Country;
}) => {
  const { data, isLoading } = useCountry(countryId, initialData);

  if (isLoading) {
    return <EditCountrySkeleton />;
  }

  // If there's an error, throw it to the error boundary
  if (data?.error) {
    throw new Error(data.error);
  }

  // If the country doesn't exist, return a 404 page
  if (!data || !data.data) return notFound();

  return <EditCountryForm country={data.data} />;
};
