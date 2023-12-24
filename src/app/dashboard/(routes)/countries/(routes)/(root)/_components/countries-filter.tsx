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
  const { setSearchValue, isFeatured, setIsFeatured, resetFilter, resetPage } = props;

  const onSearchValueChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      resetPage();
    },
    [setSearchValue, resetPage],
  );

  const [value, setValue] = useDebounce({ onValueChange: onSearchValueChange });

  const isFiltering = value.length > 0 || isFeatured !== undefined;

  const handleIsFeatured = (value: boolean) => {
    if (value === isFeatured) {
      setIsFeatured(undefined);
    } else {
      setIsFeatured(value);
    }
    resetPage();
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
        selectedValue={isFeatured}
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
