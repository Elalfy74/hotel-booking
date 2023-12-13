'use client';

import { notFound } from 'next/navigation';

import { useCity } from '../_hooks/use-city';
import { EditCityForm } from './edit-city-form';
import { EditCitySkeleton } from './edit-city-skeleton';

export const EditCity = ({ cityId }: { cityId: string }) => {
  const { data, isLoading } = useCity(cityId);

  if (isLoading) {
    return <EditCitySkeleton />;
  }

  // If there's an error, throw it to the error boundary
  if (data?.error) {
    throw new Error(data.error);
  }

  // If the City doesn't exist, return a 404 page
  if (!data || !data.data) return notFound();

  return <EditCityForm city={data.data} />;
};
