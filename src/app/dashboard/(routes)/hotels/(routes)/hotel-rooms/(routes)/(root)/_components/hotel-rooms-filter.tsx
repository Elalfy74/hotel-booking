import { useCallback, useState } from 'react';

import { type ComboboxItemType } from '@/components/combobox';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';
import { useDebounce } from '@/hooks/use-debounce';

import { useHotelRoomsFilter } from '../_hooks/use-hotel-rooms-filter';
import { HotelFilter } from './hotel-filter';

interface HotelRoomsFilterProps extends ReturnType<typeof useHotelRoomsFilter> {
  resetPage: () => void;
}

export const HotelRoomsFilter = (props: HotelRoomsFilterProps) => {
  const { filter, setQ, setHotelId, resetFilter, resetPage } = props;

  const onSearchValueChange = useCallback(
    (value: string) => {
      if (value === filter?.query) {
        return;
      }
      resetPage();
      setQ(value);
    },
    [setQ, resetPage, filter?.query],
  );

  const [value, setValue] = useDebounce({ onValueChange: onSearchValueChange });
  const [selectedHotel, setSelectedHotel] = useState<ComboboxItemType | undefined>();

  const isFiltering = value.length > 0 || selectedHotel;

  const handleHotelSelect = (item: ComboboxItemType | undefined) => {
    resetPage();
    setSelectedHotel(item);
    setHotelId(item?.value);
  };

  const reset = () => {
    setValue('');
    setSelectedHotel(undefined);
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter
        value={value}
        setValue={setValue}
        placeholder="Filter Hotel Rooms..."
      />

      <HotelFilter selected={selectedHotel} onSelect={handleHotelSelect} />

      {isFiltering && <DataTableResetFilter reset={reset} />}
    </>
  );
};
