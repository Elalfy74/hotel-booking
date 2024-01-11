import { useState } from 'react';

import { useCities } from '@/app/dashboard/(routes)/cities/(routes)/(root)/_hooks/use-cities';
import { Combobox, type ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';

interface CityInputProps {
  defaultSelected?: ComboboxItemType;
  onSelect: (value: string) => void;
}
export function CityInput({ onSelect, defaultSelected }: CityInputProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState<ComboboxItemType | undefined>(defaultSelected);

  const { data, isLoading, isFetching } = useCities({
    currentPage: 1,
    pageSize: 10,
    filter: {
      query: searchValue,
      isFeatured: undefined,
    },
  });

  const handleSelect = (item: ComboboxItemType | undefined) => {
    setSelected(item);
    onSelect(item?.value ?? '');
  };

  if (isLoading || !data?.data) {
    return (
      <Button variant="secondary" className="w-[300px]" disabled>
        Select City...
      </Button>
    );
  }

  const items = data.data.map((city) => ({
    label: city.name,
    value: city.id,
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
      entityName="City"
      setSearchChange={setSearchValue}
      selected={selected}
      setSelected={handleSelect}
      isFetching={isFetching}
    />
  );
}
