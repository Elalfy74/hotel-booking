'use client';

import { useMemo } from 'react';

import { Combobox } from '@/components/ui/combobox';
import { useSelectCity } from '@/store/use-select-city';

const data = [
  {
    id: '1',
    name: 'New York',
    country: {
      id: '1',
      name: 'United States',
    },
  },
  {
    id: '2',
    name: 'London',
    country: {
      id: '2',
      name: 'United Kingdom',
    },
  },
  {
    id: '3',
    name: 'Paris',
    country: {
      id: '3',
      name: 'France',
    },
  },
  {
    id: '4',
    name: 'Berlin',
    country: {
      id: '4',
      name: 'Germany',
    },
  },
  {
    id: '5',
    name: 'Madrid',
    country: {
      id: '5',
      name: 'Spain',
    },
  },
  {
    id: '6',
    name: 'Rome',
    country: {
      id: '6',
      name: 'Italy',
    },
  },
  {
    id: '7',
    name: 'Tokyo',
    country: {
      id: '7',
      name: 'Japan',
    },
  },
  {
    id: '8',
    name: 'Beijing',
    country: {
      id: '8',
      name: 'China',
    },
  },
  {
    id: '9',
    name: 'Moscow',
    country: {
      id: '9',
      name: 'Russia',
    },
  },
  {
    id: '10',
    name: 'Istanbul',
    country: {
      id: '10',
      name: 'Turkey',
    },
  },
];

export const CityInput = () => {
  const { selectedCity, setCity } = useSelectCity();

  const displayValue = useMemo(
    () => (selectedCity ? `${selectedCity?.name} ${selectedCity?.country.name}` : null),
    [selectedCity],
  );

  const handleSelectCity = (id: string | null) => {
    if (!id) return setCity(null);

    const newCity = data.find((city) => city.id === id);
    if (!newCity) return;

    setCity(newCity);
  };

  return (
    <Combobox
      displayValue={displayValue}
      value={selectedCity?.id}
      setValue={handleSelectCity}
      data={data.map((city) => ({ value: city.id, label: city.name }))}
      placeholder="Where are you from?"
      emptyMsg="No results found"
    />
  );
};
