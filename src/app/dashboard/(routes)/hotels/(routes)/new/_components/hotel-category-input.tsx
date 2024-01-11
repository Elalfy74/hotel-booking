import { useState } from 'react';

import { useHotelCategories } from '@/app/dashboard/(routes)/hotels/(routes)/hotel-categories/(routes)/(root)/_hooks/use-hotel-categories';
import { Combobox, type ComboboxItemType } from '@/components/combobox';
import { Button } from '@/components/ui/button';

interface HotelCategoryInputProps {
  defaultSelected?: ComboboxItemType;
  onSelect: (value: string) => void;
}
export function HotelCategoryInput({ onSelect, defaultSelected }: HotelCategoryInputProps) {
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState<ComboboxItemType | undefined>(defaultSelected);

  const { data, isLoading, isFetching } = useHotelCategories({
    currentPage: 1,
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
        Select Category...
      </Button>
    );
  }

  const items = data.data.map((hotelCategory) => ({
    label: hotelCategory.name,
    value: hotelCategory.id,
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
      entityName="Category"
      setSearchChange={setSearchValue}
      selected={selected}
      setSelected={handleSelect}
      isFetching={isFetching}
    />
  );
}
