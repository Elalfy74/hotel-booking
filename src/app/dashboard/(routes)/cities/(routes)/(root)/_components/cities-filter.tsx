import { ShieldCheckIcon, ShieldXIcon } from 'lucide-react';
import { useCallback } from 'react';

import { FacetedOption } from '@/components/ui/data-table-faceted-filter';
import { DataTableResetFilter } from '@/components/ui/data-table-reset-filter';
import { DataTableSearchFilter } from '@/components/ui/data-table-search-filter';
import { DataTableSelectFilter } from '@/components/ui/data-table-select-filter';
import { useDebounce } from '@/hooks/use-debounce';

import { useCitiesFilter } from '../_hooks/use-cities-filter';
import { CountryFilter } from './country-filter';

interface CitiesFilterProps extends ReturnType<typeof useCitiesFilter> {
  resetPage: () => void;
}

export const CitiesFilter = (props: CitiesFilterProps) => {
  const {
    setSearchValue,
    isFeatured,
    setIsFeatured,
    resetFilter,
    selectedCountries,
    setSelectedCountries,
    resetPage,
  } = props;

  const onSearchValueChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      resetPage();
    },
    [setSearchValue, resetPage],
  );

  const [value, setValue] = useDebounce({ onValueChange: onSearchValueChange });
  const isFiltering = value.length > 0 || isFeatured !== undefined || selectedCountries.length > 0;

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
      <DataTableSearchFilter value={value} setValue={setValue} placeholder="Filter Cities..." />

      <CountryFilter
        selectedCountries={selectedCountries}
        setSelectedCountries={setSelectedCountries}
      />

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
