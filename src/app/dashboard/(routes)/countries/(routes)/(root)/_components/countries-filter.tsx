import { ShieldCheckIcon, ShieldXIcon } from 'lucide-react';
import { useCallback } from 'react';

import { FacetedOption } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';
import { DataTableSelectFilter } from '@/components/ui/data-table-select-filter';
import { useDebounce } from '@/hooks/use-debounce';

import { useCountriesFilter } from '../_hooks/use-countries-filter';

interface CountriesFilterProps extends ReturnType<typeof useCountriesFilter> {
  resetPage: () => void;
}

export const CountriesFilter = (props: CountriesFilterProps) => {
  const { filter, setFeatured, setQ, resetFilter, resetPage } = props;

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

  const isFiltering = value.length > 0 || filter.isFeatured !== undefined;

  const handleIsFeatured = (value: boolean) => {
    resetPage();
    if (value === filter.isFeatured) {
      setFeatured(undefined);
    } else {
      setFeatured(value);
    }
  };

  const reset = () => {
    setValue('');
    resetFilter();
    resetPage();
  };

  return (
    <>
      <DataTableSearchFilter value={value} setValue={setValue} placeholder="Filter Countries..." />

      <DataTableSelectFilter
        options={options}
        onSelectedValueChange={handleIsFeatured}
        selectedValue={filter.isFeatured}
      />

      {isFiltering && <DataTableResetFilter reset={reset} />}
    </>
  );
};

const options: FacetedOption<boolean>[] = [
  {
    label: 'Featured',
    value: true,
    icon: ShieldCheckIcon,
  },
  {
    label: 'Not Featured',
    value: false,
    icon: ShieldXIcon,
  },
];
