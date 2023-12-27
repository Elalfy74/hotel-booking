'use client';

import { useState } from 'react';

import { Combobox, type ComboboxItemType } from '@/components/combobox';

import { useCities } from '../use-cities';

export const CityInput = () => {
  const { data, isFetching, setValue } = useCities();

  const [selectedCity, setSelectedCity] = useState<ComboboxItemType>();

  return (
    <Combobox
      entityName="city"
      isFetching={isFetching}
      items={
        data?.map((city) => ({ value: city.id, label: city.name + ', ' + city.country.name })) || []
      }
      selected={selectedCity}
      setSearchChange={setValue}
      setSelected={setSelectedCity}
      className="w-full justify-between bg-gray-50 py-6 font-normal focus-visible:bg-white focus-visible:bg-none dark:bg-background"
    />
  );
};
