import { useState } from 'react';

import { useCountries } from '@/app/dashboard/(pages)/countries/(pages)/(root)/_hooks/use-countries';
import { Combobox, ComboboxItem } from '@/components/combobox';
import { Button } from '@/components/ui/button';

interface CountryInputProps {
  onSelect: (value: string) => void;
}
export function CountryInput({ onSelect }: CountryInputProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState<ComboboxItem | null>(null);

  const { data, isLoading, isFetching } = useCountries({
    currentPage: 0,
    pageSize: 10,
    filter: {
      query: searchValue,
    },
  });

  const handleSelect = (item: ComboboxItem | null) => {
    setSelected(item);
    onSelect(item?.value ?? '');
  };

  if (isLoading || !data?.data) {
    return (
      <Button variant="secondary" className="w-[300px]" disabled>
        Select Country...
      </Button>
    );
  }

  const items = data.data.map((country) => ({
    label: country.name,
    value: country.id,
  }));

  return (
    <Combobox
      items={items}
      entityName="Country"
      setSearchChange={setSearchValue}
      selected={selected}
      setSelected={handleSelect}
      isFetching={isFetching}
    />
  );
}
