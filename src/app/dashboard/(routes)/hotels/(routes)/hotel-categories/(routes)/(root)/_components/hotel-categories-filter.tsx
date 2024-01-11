import { useCallback } from 'react';

import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';
import { useDebounce } from '@/hooks/use-debounce';

import { useHotelCategoriesFilter } from '../_hooks/use-hotel-categories-filter';

interface HotelCategoriesFilterProps extends ReturnType<typeof useHotelCategoriesFilter> {
  resetPage: () => void;
}

export const HotelCategoriesFilter = (props: HotelCategoriesFilterProps) => {
  const { filter, setQ, resetFilter, resetPage } = props;

  const onSearchValueChange = useCallback(
    (value: string) => {
      if (value === filter.query) {
        return;
      }
      resetPage();
      setQ(value);
    },
    [setQ, resetPage, filter.query],
  );

  const [value, setValue] = useDebounce({ onValueChange: onSearchValueChange });

  const isFiltering = value.length > 0;

  const reset = () => {
    setValue('');
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter
        value={value}
        setValue={setValue}
        placeholder="Filter Hotel Categories..."
      />

      {isFiltering && <DataTableResetFilter reset={reset} />}
    </>
  );
};
