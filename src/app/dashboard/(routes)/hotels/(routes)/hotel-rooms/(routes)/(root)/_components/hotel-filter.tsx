import { useState } from 'react';

import { Combobox, type ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';

import { useHotels } from '../../../../(root)/_hooks/use-hotels';

interface HotelFilterProps {
  selected: ComboboxItemType | undefined;
  onSelect: (item: ComboboxItemType | undefined) => void;
}
export function HotelFilter({ onSelect, selected }: HotelFilterProps) {
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading, isFetching } = useHotels({
    currentPage: 1,
    pageSize: 10,
    filter: {
      query: searchValue,
    },
  });

  if (isLoading || !data?.data) {
    return (
      <Button variant="secondary" className="h-8 w-[150px] justify-start lg:w-[250px]" disabled>
        Select Hotel...
      </Button>
    );
  }

  const items = data.data.map((hotel) => ({
    label: hotel.name,
    value: hotel.id,
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
      entityName="Hotel"
      setSearchChange={setSearchValue}
      selected={selected}
      setSelected={onSelect}
      isFetching={isFetching}
      btnClassName="h-8 w-[150px] lg:w-[250px]"
    />
  );
}
