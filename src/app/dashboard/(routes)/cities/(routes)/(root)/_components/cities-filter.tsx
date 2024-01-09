import { ShieldCheckIcon, ShieldXIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

import { type ComboboxItemType } from '@/components/combobox';
import { type FacetedOption } from '@/components/ui/data-table-faceted-filter';
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
  const { filter, setQ, setFeatured, setCountriesFilter, resetFilter, resetPage } = props;

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
  const [selectedCountries, setSelectedCountries] = useState<ComboboxItemType[]>([]);

  const isFiltering =
    value.length > 0 || filter.isFeatured !== undefined || selectedCountries.length;

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
    setSelectedCountries([]);
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
