import { useState } from 'react';

import { useCountries } from '@/app/dashboard/(routes)/countries/(routes)/(root)/_hooks/use-countries';
import { Combobox, type ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';

interface CountryInputProps {
  defaultSelected?: ComboboxItemType;
  onSelect: (value: string) => void;
}
export function CountryInput({ onSelect, defaultSelected }: CountryInputProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState<ComboboxItemType | undefined>(defaultSelected);

  const { data, isLoading, isFetching } = useCountries({
    currentPage: 0,
    pageSize: 10,
    filter: {
      query: searchValue,
    },
  });

  const handleSelect = (item: ComboboxItemType | undefined) => {
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

  if (selected) {
    const isSelectedInItems = items.find((item) => item.value === selected.value);

    if (!isSelectedInItems) {
      items.unshift(selected);
    }
  }

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
